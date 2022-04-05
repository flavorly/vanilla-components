import './styles/index.css'
import VPApp from './components/VPApp.vue'
import VPNotFound from './components/VPNotFound.vue'
import { Theme } from 'vitepress'
import { withConfigProvider } from './composables/config'
import {VanillaComponents} from "@indigit/vanilla-components";
import LayoutBlank from "./components/LayoutBlank.vue";
import LayoutDemoWrapper from "./components/LayoutDemoWrapper.vue";
import { makeServer } from "../../mocks/server";

const VPTheme: Theme = {
  Layout: withConfigProvider(VPApp),
  NotFound: VPNotFound,
  enhanceApp({ app, router, siteData }) {

    app.use(VanillaComponents);
    app.component('Wrapper', LayoutDemoWrapper);
    app.component('LayoutBlank', LayoutBlank);

    // Start the fake API server
    makeServer();
  },
}

export default VPTheme;
export type { Config } from './config'
