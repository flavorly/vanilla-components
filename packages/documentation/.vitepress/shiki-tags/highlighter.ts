import type { IThemeRegistration } from 'shiki'
import { getHighlighter } from 'shiki'
import type { ThemeOptions } from 'vitepress'
import { postProcess, process, processors } from './processor'

export default async function highlighter(
  theme: ThemeOptions = 'material-palenight',
) {
  const hasSingleTheme = typeof theme === 'string' || 'name' in theme
  const getThemeName = (themeValue: IThemeRegistration) =>
    typeof themeValue === 'string' ? themeValue : themeValue.name

  const highlighter = await getHighlighter({
    themes: hasSingleTheme ? [theme] : [theme.dark, theme.light],
  })

  const vueRE = /-vue$/
  return (str: string, lang: string, attrs: string) => {
    lang = lang.replace(vueRE, '').toLowerCase()

    const { code, lineOptions } = process(
      processors,
      str,
      lang = lang.replace(/-vue$/, '').toLowerCase(),
      attrs,
    )

    return postProcess(
      processors,
      highlighter.codeToHtml(code, { lang, lineOptions, theme: getThemeName(theme) }),
      lang,
      attrs,
    )
  }
}
