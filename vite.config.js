import Inspect from "vite-plugin-inspect";
import path from "path";

export default {
  plugins: [Inspect()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
