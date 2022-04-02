import './styles/styles.css'
//export { VPTheme as default } from '@vue/theme'
import { VPTheme } from '@vue/theme';
//import VPNavBarSearch from './components/VPNavBarSearch.vue';

export default {
  ...VPTheme,
  enhanceApp({ app }) {
    // register global components
    //app.component('MyGlobalComponent' /* ... */)
  }
}
