import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    server: {
        host: true, // Allows access from external devices
        allowedHosts: ["0955-176-221-193-106.ngrok-free.app"], // Correct format as an array
    },
    plugins: [react()],
});
