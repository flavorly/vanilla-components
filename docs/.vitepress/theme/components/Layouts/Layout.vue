<script setup lang="ts">
import {onMounted, onUnmounted, provide, onBeforeMount, Ref, ref, watchEffect} from 'vue'
import { useSidebar, useCloseSidebarOnEscape } from './../../../node_modules/vitepress/dist/client/theme-default/composables/sidebar.js'
import VPSkipLink from './../../../node_modules/vitepress/dist/client/theme-default/components/VPSkipLink.vue'
import VPBackdrop from './../../../node_modules/vitepress/dist/client/theme-default/components/VPBackdrop.vue'
import VPNav from './../../../node_modules/vitepress/dist/client/theme-default/components/VPNav.vue'
import VPLocalNav from './../../../node_modules/vitepress/dist/client/theme-default/components/VPLocalNav.vue'
import VPSidebar from './../../../node_modules/vitepress/dist/client/theme-default/components/VPSidebar.vue'
import VPContent from './../../../node_modules/vitepress/dist/client/theme-default/components/VPContent.vue'
import VPFooter from './../../../node_modules/vitepress/dist/client/theme-default/components/VPFooter.vue'
import { useData } from "vitepress";
import {removeTailwindIfNotPresentOnProduction} from "./../support/stylesHelper";

const {
  isOpen: isSidebarOpen,
  open: openSidebar,
  close: closeSidebar
} = useSidebar()

useCloseSidebarOnEscape(isSidebarOpen, closeSidebar)

// Little tweak to support layouts
const CustomLayout = ref(undefined) as Ref<undefined|string>;
onMounted(() => {
  const { frontmatter } = useData();

  //removeTailwindIfNotPresentOnProduction();

  if(frontmatter?.value?.component  !== undefined){
    CustomLayout.value = frontmatter?.value?.component;
  }
})

provide('close-sidebar', closeSidebar)
</script>

<template>
  <component v-if="CustomLayout !== undefined" :is="CustomLayout"/>
  <div v-else class="Layout">
    <slot name="layout-top" />
    <VPSkipLink />
    <VPBackdrop class="backdrop" :show="isSidebarOpen" @click="closeSidebar" />
    <VPNav />
    <VPLocalNav :open="isSidebarOpen" @open-menu="openSidebar" />
    <VPSidebar :open="isSidebarOpen" />

    <VPContent>
      <template #home-hero-before><slot name="home-hero-before" /></template>
      <template #home-hero-after><slot name="home-hero-after" /></template>
      <template #home-features-before><slot name="home-features-before" /></template>
      <template #home-features-after><slot name="home-features-after" /></template>

      <template #doc-before><slot name="doc-before" /></template>
      <template #doc-after><slot name="doc-after" /></template>

      <template #aside-top><slot name="aside-top" /></template>
      <template #aside-bottom><slot name="aside-bottom" /></template>
      <template #aside-outline-before><slot name="aside-outline-before" /></template>
      <template #aside-outline-after><slot name="aside-outline-after" /></template>
      <template #aside-ads-before><slot name="aside-ads-before" /></template>
      <template #aside-ads-after><slot name="aside-ads-after" /></template>
    </VPContent>

    <VPFooter />
    <slot name="layout-bottom" />
  </div>
</template>

<style scoped>
.Layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
