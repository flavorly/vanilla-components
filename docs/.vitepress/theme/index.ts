import DefaultTheme from 'vitepress/theme'
import { makeServer } from "../../mocks/server";
import LayoutDemoWrapper from "./components/LayoutDemoWrapper.vue";
import LayoutBlank from "./components/LayoutBlank.vue";
import Layout from "./components/Layout.vue";
import {VanillaComponents} from "@indigit/vanilla-components";

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(VanillaComponents);
    app.component('Wrapper', LayoutDemoWrapper);
    app.component('LayoutBlank', LayoutBlank);

    // Start the fake API server
    makeServer();
  }
}
