<template>
  <div class="p-6 rounded  border border-gray-200 bg-gray-100 dark:bg-[#282c34] dark:border-gray-700 font-inter antialiased">
    <slot>
      <Content/>
    </slot>
  </div>
</template>

<script setup lang="ts">
//import '../styles/tailwind.css';
import { onMounted, onBeforeMount, watch, ref } from 'vue';
import { useData, useRoute } from "vitepress";
import { useStorage } from '@vueuse/core';



const watchThemeMode = (mode: string) => {
  if (mode === 'dark' || mode === 'auto') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
};

onMounted(() => {
  const flag = useStorage('vue-theme-appearance', 'light') // returns Ref<boolean>
  watch(flag, watchThemeMode, {immediate: true});

  import('../styles/tailwind.css').then((module) => {
      console.log('imported Tailwind',module)
      let nodes = document.getElementsByTagName('style'), index;
      for (index = nodes.length - 1; index >= 0; index--) {
        if(nodes[index].innerText !== '' && nodes[index].innerText !== null && !nodes[index].innerText.includes('tailwind')){
          nodes[index].parentNode.removeChild(nodes[index]);
        }
      }

      // document.querySelectorAll('style,link[rel="stylesheet"],link[rel="modulepreload"]').forEach((element) => {
      //   if(element?.href !== undefined && !element?.href.includes('tailwind') && element?.href.includes('.css')){
      //     console.log('element',element)
      //     element.remove()
      //   }
      // })
  });
});

onBeforeMount(() => {
  console.log( useData());
  const { site } = useData();
  //site.value.head.push(['link', {href: '/assets/tailwind.css', rel: 'stylesheet'}])
  //useData().site.value.head.push(['link', {href: useRoute().path, rel: 'canonical'}])
  // if (__VUEPRESS_SSR__) {
  //   useSSRContext().head.push(['link', {href: '/assets/tailwind.css', rel: 'stylesheet'}]);
  //   useSSRContext().head.push(['link', {href: this.$page.path, rel: 'canonical'}]);
  // }
});
</script>
