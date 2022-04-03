import './styles/styles.css'
//export { VPTheme as default } from '@vue/theme'
import { VPTheme } from '@vue/theme';
import { VanillaComponents } from "@indigit/vanilla-components";
import VanillaWrapper  from "./components/Wrapper.vue";
import LayoutBlank  from "./components/LayoutBlank.vue";
import {Theme, useData, useRouter} from "vitepress";
import {ref, shallowRef, watch} from 'vue';


const layout = shallowRef(LayoutBlank);


console.log('Layout',LayoutBlank);

const Theme: Theme = {
  ...VPTheme,
  enhanceApp({ app, router, siteData }) {

    app.use(VanillaComponents);
    app.component('VanillaWrapper', VanillaWrapper);


    watch(() => router.route.data.relativePath, (path) => {
      console.log('Path changed', path);
      //const {theme, site, description} = useData();
      console.log('data', app)
    }, { immediate: false });
  },
  Layout: LayoutBlank,
}


export default Theme;
