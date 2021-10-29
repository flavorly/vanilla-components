import type { ThemeObject } from '@vuepress/core'
import { path } from '@vuepress/utils'

const localTheme: ThemeObject = {
  name: 'vanilla-components',
  extends: '@vuepress/theme-default',
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Default.vue'),
    Blank: path.resolve(__dirname, 'layouts/Blank.vue'),
  },
}

export default localTheme
