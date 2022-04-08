import {useData} from "vitepress";

/** Dynamic Import Tailwind CSS on Hot Reload */
export function importTailwindOnDev(): void {
    if(import.meta.env.DEV){
        import('../styles/tailwind.css').then((module) => {
            let nodes = document.getElementsByTagName('style'), index;
            for (index = nodes.length - 1; index >= 0; index--) {
                if (nodes[index].innerText !== '' && nodes[index].innerText !== null && !nodes[index].innerText.includes('tailwind')) {
                    nodes[index].parentNode.removeChild(nodes[index]);
                }
            }
        });
    }
}

/** Remove Vitepress Styles on Production */
export function removeVitePressStylesOnDemo(): void {
    if(import.meta.env.PROD){
        document.querySelectorAll('style,link[rel="stylesheet"],link[rel="modulepreload"]').forEach((element) => {
            if(element?.href !== undefined && !element?.href.includes('tailwind') && element?.href.includes('.css')){
                element.remove()
            }
        })
    }
}

/** Remove Tailwind from the page if its in production & not present */
export function removeTailwindIfNotPresentOnProduction(): void {
    const { frontmatter } = useData();
    if(frontmatter?.value?.tailwind === undefined && import.meta.env.PROD) {
        document.querySelectorAll('style,link[rel="stylesheet"],link[rel="modulepreload"]').forEach((element) => {
            if(frontmatter?.value?.tailwind === undefined){
                if (element?.href !== undefined && element?.href.includes('tailwind') && element?.href.includes('.css')) {
                    element.remove()
                }
            }
        });
    }
}
