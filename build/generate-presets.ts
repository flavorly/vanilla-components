import { existsSync, rmSync, writeFileSync } from 'fs'
import { defaultConfiguration } from './packages/vanilla-components/src'

function generate() {
  const path = './presets/all.json'
  const exists = existsSync(path)
  if (exists) {
    rmSync(path)
  }

  writeFileSync(path, JSON.stringify(defaultConfiguration, null, 4))

  Object.entries(defaultConfiguration).forEach((entry) => {
    const [key, value] = entry
    const path = `./presets/${key}.json`
    const exists = existsSync(path)
    if (exists) {
      rmSync(path)
    }
    writeFileSync(path, JSON.stringify(value, null, 4))
    console.warn(`Generated presets for : ${key}`)
  })
}

generate()
