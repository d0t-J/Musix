// Environment configuration
const config = {
    development: {
        API_URL: "http://localhost:3001",
        SOCKET_URL: "http://localhost:3001",
    },
    production: {
        API_URL:
            import.meta.env.VITE_API_URL ||
            "tunetalk-backend-e9d9gzf6a9awdadq.eastus-01.azurewebsites.net",
        SOCKET_URL:
            import.meta.env.VITE_SOCKET_URL ||
            "tunetalk-backend-e9d9gzf6a9awdadq.eastus-01.azurewebsites.net",
    },
};

const environment = import.meta.env.MODE || "development";

export default config[environment];
