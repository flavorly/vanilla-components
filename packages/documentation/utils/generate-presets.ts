import { existsSync, rmSync, writeFileSync } from 'fs'
import { defaultConfiguration } from '@indigit/vanilla-components'

function generate() {
  const path = './src/presets/all.json'
  const exists = existsSync(path)
  if (exists) {
    rmSync(path)
  }

  writeFileSync(path, JSON.stringify(defaultConfiguration, null, 4))

  Object.entries(defaultConfiguration).forEach((entry) => {
    const [key, value] = entry
    const path = `./src/presets/${key}.json`
    const exists = existsSync(path)
    if (exists) {
      rmSync(path)
    }
    writeFileSync(path, JSON.stringify(value, null, 4))
    console.info(`Generated presets for : ${key}`)
  })
}

generate()
