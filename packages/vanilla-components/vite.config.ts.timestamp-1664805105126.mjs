// vite.config.ts
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import copy from "rollup-plugin-copy";

// package.json
var dependencies = {
  "@headlessui/vue": "^1.7.0",
  "@popperjs/core": "^2.11.6",
  "@vueuse/core": "^9.2.0",
  axios: "^0.27.2",
  flatpickr: "^4.6.9",
  "fuse.js": "^6.4.6",
  "libphonenumber-js": "^1.9.49",
  lodash: "^4.17.21",
  "lodash-es": "^4.17.21",
  vue: "^3.2.39"
};
var peerDependencies = {
  "@headlessui/vue": "^1.7.0",
  "@popperjs/core": "^2.11.6",
  axios: "^0.27.2",
  vue: "^3.2.39"
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/jon/projects/vanilla-components/packages/vanilla-components";
var externals = [
  ...Object.keys(dependencies || {}),
  ...Object.keys(peerDependencies || {})
];
var vite_config_default = defineConfig(() => {
  return {
    plugins: [
      vue(),
      dts({
        cleanVueFileName: false,
        staticImport: false,
        skipDiagnostics: true,
        outputDir: "dist",
        beforeWriteFile(filePath, content) {
          return {
            filePath: filePath.replace("packages/vanilla-components/src", ""),
            content
          };
        }
      }),
      copy({
        targets: [
          { src: "src/components/**/*.vue", dest: "dist" },
          { src: "src/components/**/config.ts", dest: "dist" },
          { src: "src/core/config/*.ts", dest: "dist" }
        ],
        hook: "writeBundle",
        flatten: false
      })
    ],
    resolve: {
      alias: [
        { find: "/^~/", replacement: "" },
        { find: "@", replacement: resolve(__vite_injected_original_dirname, "src") }
      ]
    },
    build: {
      minify: false,
      sourcemap: false,
      lib: {
        entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
        name: "vanilla-components",
        fileName: (format) => `vanilla-components.${format}.js`
      },
      rollupOptions: {
        external: externals,
        output: {
          globals: {
            "vue": "Vue",
            "@vueuse/core": "vue-use",
            "@popperjs/core": "popperjs",
            "@headlessui/vue": "headlessui-vue",
            "axios": "axios",
            "flatpickr": "flatpickr",
            "libphonenumber-js": "libphonenumber-js",
            "fuse.js": "fusejs"
          }
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvam9uL3Byb2plY3RzL3ZhbmlsbGEtY29tcG9uZW50cy9wYWNrYWdlcy92YW5pbGxhLWNvbXBvbmVudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qb24vcHJvamVjdHMvdmFuaWxsYS1jb21wb25lbnRzL3BhY2thZ2VzL3ZhbmlsbGEtY29tcG9uZW50cy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvam9uL3Byb2plY3RzL3ZhbmlsbGEtY29tcG9uZW50cy9wYWNrYWdlcy92YW5pbGxhLWNvbXBvbmVudHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuaW1wb3J0IGNvcHkgZnJvbSAncm9sbHVwLXBsdWdpbi1jb3B5J1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuLy8gQHRzLWV4cGVjdC1lcnJvclxuaW1wb3J0ICogYXMgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJ1xuXG5jb25zdCBleHRlcm5hbHMgPSBbXG4gIC4uLk9iamVjdC5rZXlzKHBrZy5kZXBlbmRlbmNpZXMgfHwge30pLFxuICAuLi5PYmplY3Qua2V5cyhwa2cucGVlckRlcGVuZGVuY2llcyB8fCB7fSksXG5dXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICBkdHMoe1xuICAgICAgICBjbGVhblZ1ZUZpbGVOYW1lOiBmYWxzZSxcbiAgICAgICAgc3RhdGljSW1wb3J0OiBmYWxzZSxcbiAgICAgICAgc2tpcERpYWdub3N0aWNzOiB0cnVlLFxuICAgICAgICBvdXRwdXREaXI6ICdkaXN0JyxcbiAgICAgICAgYmVmb3JlV3JpdGVGaWxlKGZpbGVQYXRoLCBjb250ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpbGVQYXRoOiBmaWxlUGF0aC5yZXBsYWNlKCdwYWNrYWdlcy92YW5pbGxhLWNvbXBvbmVudHMvc3JjJywgJycpLFxuICAgICAgICAgICAgY29udGVudCxcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KSxcblxuICAgICAgLy8gQ29weSB2dWUgZmlsZXMgc28gV2Vic3Rvcm0gY2FuIGJlIGhhcHB5LlxuXG4gICAgICBjb3B5KHtcbiAgICAgICAgdGFyZ2V0czogW1xuICAgICAgICAgIC8vIFZ1ZSBDb21wb25lbnRzXG4gICAgICAgICAgeyBzcmM6ICdzcmMvY29tcG9uZW50cy8qKi8qLnZ1ZScsIGRlc3Q6ICdkaXN0JyB9LFxuXG4gICAgICAgICAgLy8gVmFuaWxsYSBDb21wb25lbnRzIENvbmZpZ3VyYXRpb25cbiAgICAgICAgICB7IHNyYzogJ3NyYy9jb21wb25lbnRzLyoqL2NvbmZpZy50cycsIGRlc3Q6ICdkaXN0JyB9LFxuXG4gICAgICAgICAgLy8gVmFuaWxsYSBCYXNlIENvbmZpZ3VyYXRpb25cbiAgICAgICAgICB7IHNyYzogJ3NyYy9jb3JlL2NvbmZpZy8qLnRzJywgZGVzdDogJ2Rpc3QnIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGhvb2s6ICd3cml0ZUJ1bmRsZScsXG4gICAgICAgIGZsYXR0ZW46IGZhbHNlLCAvLyBLZWVwIGRpcmVjdG9yeSBzdHJ1Y3R1cmVcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IFtcbiAgICAgICAgeyBmaW5kOiAnL15+LycsIHJlcGxhY2VtZW50OiAnJyB9LFxuICAgICAgICB7IGZpbmQ6ICdAJywgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJykgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgbWluaWZ5OiBmYWxzZSxcbiAgICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgICBsaWI6IHtcbiAgICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICAgIG5hbWU6ICd2YW5pbGxhLWNvbXBvbmVudHMnLFxuICAgICAgICBmaWxlTmFtZTogZm9ybWF0ID0+IGB2YW5pbGxhLWNvbXBvbmVudHMuJHtmb3JtYXR9LmpzYCxcbiAgICAgIH0sXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGV4dGVybmFsOiBleHRlcm5hbHMsXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAgICd2dWUnOiAnVnVlJyxcbiAgICAgICAgICAgICdAdnVldXNlL2NvcmUnOiAndnVlLXVzZScsXG4gICAgICAgICAgICAnQHBvcHBlcmpzL2NvcmUnOiAncG9wcGVyanMnLFxuICAgICAgICAgICAgJ0BoZWFkbGVzc3VpL3Z1ZSc6ICdoZWFkbGVzc3VpLXZ1ZScsXG4gICAgICAgICAgICAnYXhpb3MnOiAnYXhpb3MnLFxuICAgICAgICAgICAgJ2ZsYXRwaWNrcic6ICdmbGF0cGlja3InLFxuICAgICAgICAgICAgJ2xpYnBob25lbnVtYmVyLWpzJzogJ2xpYnBob25lbnVtYmVyLWpzJyxcbiAgICAgICAgICAgICdmdXNlLmpzJzogJ2Z1c2VqcycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1gsU0FBUyxlQUFlO0FBQ2haLE9BQU8sU0FBUztBQUNoQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUpqQixJQUFNLG1DQUFtQztBQVN6QyxJQUFNLFlBQVk7QUFBQSxFQUNoQixHQUFHLE9BQU8sS0FBUyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQUEsRUFDckMsR0FBRyxPQUFPLEtBQVMsb0JBQW9CLENBQUMsQ0FBQztBQUMzQztBQUVBLElBQU8sc0JBQVEsYUFBYSxNQUFNO0FBQ2hDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLElBQUk7QUFBQSxRQUNGLGtCQUFrQjtBQUFBLFFBQ2xCLGNBQWM7QUFBQSxRQUNkLGlCQUFpQjtBQUFBLFFBQ2pCLFdBQVc7QUFBQSxRQUNYLGdCQUFnQixVQUFVLFNBQVM7QUFDakMsaUJBQU87QUFBQSxZQUNMLFVBQVUsU0FBUyxRQUFRLG1DQUFtQyxFQUFFO0FBQUEsWUFDaEU7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BSUQsS0FBSztBQUFBLFFBQ0gsU0FBUztBQUFBLFVBRVAsRUFBRSxLQUFLLDJCQUEyQixNQUFNLE9BQU87QUFBQSxVQUcvQyxFQUFFLEtBQUssK0JBQStCLE1BQU0sT0FBTztBQUFBLFVBR25ELEVBQUUsS0FBSyx3QkFBd0IsTUFBTSxPQUFPO0FBQUEsUUFDOUM7QUFBQSxRQUNBLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNYLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxFQUFFLE1BQU0sUUFBUSxhQUFhLEdBQUc7QUFBQSxRQUNoQyxFQUFFLE1BQU0sS0FBSyxhQUFhLFFBQVEsa0NBQVcsS0FBSyxFQUFFO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxLQUFLO0FBQUEsUUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQ3hDLE1BQU07QUFBQSxRQUNOLFVBQVUsWUFBVSxzQkFBc0I7QUFBQSxNQUM1QztBQUFBLE1BQ0EsZUFBZTtBQUFBLFFBQ2IsVUFBVTtBQUFBLFFBQ1YsUUFBUTtBQUFBLFVBQ04sU0FBUztBQUFBLFlBQ1AsT0FBTztBQUFBLFlBQ1AsZ0JBQWdCO0FBQUEsWUFDaEIsa0JBQWtCO0FBQUEsWUFDbEIsbUJBQW1CO0FBQUEsWUFDbkIsU0FBUztBQUFBLFlBQ1QsYUFBYTtBQUFBLFlBQ2IscUJBQXFCO0FBQUEsWUFDckIsV0FBVztBQUFBLFVBQ2I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
