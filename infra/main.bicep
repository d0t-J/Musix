targetScope = 'resourceGroup'

@minLength(1)
@maxLength(64)
@description('Name of the environment that can be used as part of naming resource convention')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

@description('The resource group name where the resources will be deployed')
param resourceGroupName string

// Backend service environment variables
@secure()
@description('Spotify Client ID for the backend service')
param spotifyClientId string = ''

@secure()
@description('Spotify Client Secret for the backend service')
param spotifyClientSecret string = ''

@secure()
@description('OpenAI API Key (optional)')
param openaiApiKey string = ''

@secure()
@description('Replicate API Token (optional)')
param replicateApiToken string = ''

@secure()
@description('Google API Key (optional)')
param googleApiKey string = ''

// Abbreviations for Azure resources
var abbrs = loadJsonContent('./abbreviations.json')
var resourceToken = uniqueString(subscription().id, resourceGroup().id, location, environmentName)

// Tag all resources with azd-env-name
var tags = {
  'azd-env-name': environmentName
}

// User-assigned managed identity
resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: '${abbrs.managedIdentityUserAssignedIdentities}${resourceToken}'
  location: location
  tags: tags
}

// Log Analytics Workspace
resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: '${abbrs.operationalInsightsWorkspaces}${resourceToken}'
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
  }
}

// Application Insights
resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${abbrs.insightsComponents}${resourceToken}'
  location: location
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalytics.id
  }
}

// Container Registry
resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-07-01' = {
  name: replace('${abbrs.containerRegistryRegistries}${resourceToken}', '-', '')
  location: location
  tags: tags
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: false
  }
}

// Container Apps Environment
resource containerAppsEnvironment 'Microsoft.App/managedEnvironments@2024-03-01' = {
  name: '${abbrs.appManagedEnvironments}${resourceToken}'
  location: location
  tags: tags
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalytics.properties.customerId
        sharedKey: logAnalytics.listKeys().primarySharedKey
      }
    }
  }
}

// Role assignment: Managed Identity -> AcrPull on Container Registry
resource acrPullRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(containerRegistry.id, managedIdentity.id, '7f951dda-4ed3-4680-a7ca-43fe172d538d')
  scope: containerRegistry
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d')
    principalId: managedIdentity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

// Backend Container App
resource backendContainerApp 'Microsoft.App/containerApps@2024-03-01' = {
  name: '${abbrs.appContainerApps}backend-${resourceToken}'
  location: location
  tags: union(tags, {
    'azd-service-name': 'backend'
  })
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${managedIdentity.id}': {}
    }
  }
  properties: {
    environmentId: containerAppsEnvironment.id
    configuration: {
      activeRevisionsMode: 'Single'
      ingress: {
        external: true
        targetPort: 3001
        transport: 'http'
        corsPolicy: {
          allowedOrigins: ['*']
          allowedMethods: ['GET', 'POST', 'OPTIONS']
          allowedHeaders: ['*']
          allowCredentials: true
        }
      }
      registries: [
        {
          server: containerRegistry.properties.loginServer
          identity: managedIdentity.id
        }
      ]
      secrets: [
        {
          name: 'spotify-client-id'
          value: spotifyClientId
        }
        {
          name: 'spotify-client-secret'
          value: spotifyClientSecret
        }
        {
          name: 'openai-api-key'
          value: openaiApiKey
        }
        {
          name: 'replicate-api-token'
          value: replicateApiToken
        }
        {
          name: 'google-api-key'
          value: googleApiKey
        }
      ]
    }
    template: {
      containers: [
        {
          name: 'backend'
          image: 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'
          resources: {
            cpu: json('0.5')
            memory: '1Gi'
          }
          env: [
            {
              name: 'SPOTIFY_CLIENT_ID'
              secretRef: 'spotify-client-id'
            }
            {
              name: 'SPOTIFY_CLIENT_SECRET'
              secretRef: 'spotify-client-secret'
            }
            {
              name: 'NODE_ENV'
              value: 'production'
            }
            {
              name: 'PORT'
              value: '3001'
            }
            {
              name: 'FRONTEND_URL'
              value: 'https://${staticWebApp.properties.defaultHostname}'
            }
            {
              name: 'OPENAI_API_KEY'
              secretRef: 'openai-api-key'
            }
            {
              name: 'REPLICATE_API_TOKEN'
              secretRef: 'replicate-api-token'
            }
            {
              name: 'GOOGLE_API_KEY'
              secretRef: 'google-api-key'
            }
          ]
        }
      ]
      scale: {
        minReplicas: 0
        maxReplicas: 10
      }
    }
  }
  dependsOn: [
    acrPullRoleAssignment
  ]
}

// Static Web App for Frontend
resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: '${abbrs.webStaticSites}${resourceToken}'
  location: location
  tags: union(tags, {
    'azd-service-name': 'frontend'
  })
  sku: {
    name: 'Free'
  }
  properties: {
    repositoryUrl: 'https://github.com/d0t-J/musix'
    branch: 'main'
    buildProperties: {
      appLocation: '/TuneTalk'
      apiLocation: ''
      outputLocation: 'dist'
    }
  }
}

// Static Web App Application Settings
resource staticWebAppSettings 'Microsoft.Web/staticSites/config@2023-01-01' = {
  parent: staticWebApp
  name: 'appsettings'
  properties: {
    VITE_API_URL: 'https://${backendContainerApp.properties.configuration.ingress.fqdn}'
    VITE_SOCKET_URL: 'https://${backendContainerApp.properties.configuration.ingress.fqdn}'
  }
}

// Outputs
output AZURE_CONTAINER_REGISTRY_ENDPOINT string = containerRegistry.properties.loginServer
output RESOURCE_GROUP_ID string = resourceGroup().id
output BACKEND_URL string = 'https://${backendContainerApp.properties.configuration.ingress.fqdn}'
output FRONTEND_URL string = 'https://${staticWebApp.properties.defaultHostname}'
output APPLICATION_INSIGHTS_CONNECTION_STRING string = applicationInsights.properties.ConnectionString
