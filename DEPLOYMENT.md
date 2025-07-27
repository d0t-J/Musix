# MusixJ Deployment Guide

This guide covers multiple deployment options for your MusixJ application.

## Project Structure

-   `Backend/` - Node.js/Express server with Socket.IO
-   `TuneTalk/` - React/Vite frontend

## Pre-deployment Setup

### 1. Environment Variables

#### Backend (.env)

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
OPENAI_API_KEY=your_openai_key (if using)
REPLICATE_API_TOKEN=your_replicate_token (if using)
GOOGLE_API_KEY=your_google_key (if using)
```

#### Frontend (.env)

```
VITE_API_URL=https://your-backend-url.com
VITE_SOCKET_URL=https://your-backend-url.com
```

## Deployment Options

### Option 1: Azure (Recommended - you have credits)

#### Using Azure Static Web Apps + Container Apps

1. **Prepare for Azure deployment:**

```bash
# Install Azure CLI
# Install Azure Developer CLI (azd)
```

2. **Deploy Backend to Azure Container Apps:**

    - Supports WebSockets/Socket.IO
    - Auto-scaling
    - Built-in load balancing

3. **Deploy Frontend to Azure Static Web Apps:**
    - Free tier available
    - Automatic builds from GitHub
    - Custom domains included

**Benefits:**

-   Integrated Azure ecosystem
-   Built-in authentication
-   Easy custom domains
-   Excellent performance in Azure regions

### Option 2: Split Deployment (Most Popular)

#### Frontend: Vercel/Netlify

-   **Vercel**: Excellent React support, automatic deployments
-   **Netlify**: Great for static sites, form handling

#### Backend: Railway/Render

-   **Railway**: Simple deployment, good WebSocket support
-   **Render**: Reliable, good for Node.js apps

### Option 3: Full-Stack Platforms

#### Railway (Recommended for simplicity)

1. Connect your GitHub repo
2. Railway auto-detects both services
3. Set environment variables
4. Deploy both with one click

#### Render

1. Create two services (Frontend + Backend)
2. Configure build commands
3. Set environment variables

## Step-by-Step: Railway Deployment (Easiest)

### 1. Prepare Repository

```bash
# Ensure your repo is pushed to GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `musix` repository
5. Railway will detect both services automatically

### 3. Configure Backend Service

-   **Service Name**: musix-backend
-   **Root Directory**: Backend
-   **Build Command**: `npm install`
-   **Start Command**: `npm start`

**Environment Variables:**

```
SPOTIFY_CLIENT_ID=your_value
SPOTIFY_CLIENT_SECRET=your_value
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.railway.app
```

### 4. Configure Frontend Service

-   **Service Name**: musix-frontend
-   **Root Directory**: TuneTalk
-   **Build Command**: `npm run build`
-   **Start Command**: `npm run preview`

**Environment Variables:**

```
VITE_API_URL=https://your-backend-domain.railway.app
VITE_SOCKET_URL=https://your-backend-domain.railway.app
```

### 5. Update Frontend URLs

After backend deploys, update frontend environment variables with the actual backend URL.

## Step-by-Step: Vercel + Railway

### Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. **Root Directory**: `TuneTalk`
4. **Build Command**: `npm run build`
5. **Environment Variables**:
    ```
    VITE_API_URL=https://your-backend-url
    VITE_SOCKET_URL=https://your-backend-url
    ```

### Backend (Railway)

1. Create new Railway project
2. **Root Directory**: `Backend`
3. Set environment variables as above

## Step-by-Step: Azure Deployment

### Using Azure Developer CLI (azd)

1. **Install prerequisites:**

```bash
# Install Azure CLI
winget install Microsoft.AzureCLI

# Install Azure Developer CLI
winget install Microsoft.Azd
```

2. **Initialize azd project:**

```bash
# In your project root
azd init --template minimal
```

3. **Configure services:**

    - Frontend: Azure Static Web Apps
    - Backend: Azure Container Apps

4. **Deploy:**

```bash
azd up
```

## Environment Variables Setup

### Get Spotify API Keys

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create new app
3. Get Client ID and Client Secret
4. Add redirect URLs for your domains

### Optional: Other API Keys

-   **OpenAI**: For AI features
-   **Replicate**: For ML models
-   **Google**: For additional services

## Testing Deployment

### Verify Backend

-   Check `https://your-backend-url/search?q=test`
-   Should return Spotify search results

### Verify Frontend

-   Open your frontend URL
-   Test music search functionality
-   Test chat functionality with WebSockets

## Troubleshooting

### Common Issues

1. **CORS Errors**

    - Ensure `FRONTEND_URL` is set correctly in backend
    - Check CORS configuration in server.js

2. **WebSocket Connection Failed**

    - Verify `VITE_SOCKET_URL` matches backend URL
    - Ensure deployment platform supports WebSockets

3. **API Keys Not Working**

    - Double-check environment variable names
    - Ensure values are set correctly (no quotes in Railway/Vercel)

4. **Build Failures**
    - Check Node.js version compatibility
    - Verify all dependencies are in package.json

### Platform-Specific Notes

**Railway:**

-   Supports WebSockets out of the box
-   Auto-generates domain names
-   Easy environment variable management

**Vercel:**

-   Serverless functions for API routes
-   Excellent for static frontends
-   May need special config for WebSockets

**Azure:**

-   Great performance and integration
-   Supports all features natively
-   May require more initial setup

## Security Notes

-   Never commit API keys to git
-   Use environment variables for all secrets
-   Enable HTTPS in production
-   Consider rate limiting for APIs

## Monitoring

After deployment, monitor:

-   Server response times
-   WebSocket connection stability
-   API usage (especially Spotify API limits)
-   Error logs

Choose the deployment option that best fits your needs! Railway is recommended for beginners, while Azure provides enterprise-grade features with your existing credits.
