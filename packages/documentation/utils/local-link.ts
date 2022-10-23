import type { Plugin } from 'vite'

const packageName = /@indigit\/vanilla-components/

export default (): Plugin => ({
  name: 'vite:local-package-replacement',
  transform: (code: string) => {
    if (!packageName.test(code)) {
      return
    }
    return code.replace(packageName, _ => '@vanilla/src')
  },
})
