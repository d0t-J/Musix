// Environment configuration
const config = {
    development: {
        API_URL: "http://localhost:3001",
        SOCKET_URL: "http://localhost:3001",
    },
    production: {
        API_URL:
            import.meta.env.VITE_API_URL ||
            "https://your-backend-app.azurewebsites.net",
        SOCKET_URL:
            import.meta.env.VITE_SOCKET_URL ||
            "https://your-backend-app.azurewebsites.net",
    },
};

const environment = import.meta.env.MODE || "development";

export default config[environment];
