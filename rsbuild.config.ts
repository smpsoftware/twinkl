import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "jsonTable",
      filename: "jsonTable.js",
      exposes: {
        "./Table": "./src/components/table/table.component.tsx",
      },
      shared: [
        { react: { eager: true, singleton: true } },
        "react-dom",
        "vite",
      ],
    }),
  ],
  server: {
    port: 3000,
  },
});
