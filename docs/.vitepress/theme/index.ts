import './styles/index.css'
import VPApp from './components/VPApp.vue'
import VPNotFound from './components/VPNotFound.vue'
import { Theme } from 'vitepress'
import { withConfigProvider } from './composables/config'
import {VanillaComponents} from "@indigit/vanilla-components";
import VanillaWrapper from "../__theme/components/Wrapper.vue";
import {watch} from "vue";

const VPTheme: Theme = {
  Layout: withConfigProvider(VPApp),
  NotFound: VPNotFound,
  enhanceApp({ app, router, siteData }) {

    app.use(VanillaComponents);
    app.component('VanillaWrapper', VanillaWrapper);
  },
}

export default VPTheme;

export type { Config } from './config'
