// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import * as path from 'path'
import { defaultConfiguration } from '../packages/vanilla-components/src/configuration'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const presetsPath = './../packages/vanilla-components/dist/presets/tailwind'

const writeFileRecursive = (file, data) => {
  const dirname = path.dirname(file)
  if (!existsSync(dirname)) {
    mkdirSync(dirname, { recursive: true })
  }

  const exists = existsSync(file)
  if (exists) {
    rmSync(file)
  }
  writeFileSync(file, data)
}

function generate() {
  const mergedPath = path.join(__dirname, presetsPath, '/json/all.json')
  writeFileRecursive(mergedPath, JSON.stringify(defaultConfiguration, null, 4))

  Object.entries(defaultConfiguration).forEach((entry) => {
    const [key, value] = entry
    const presetPath = path.join(__dirname, presetsPath, `/json/${key}.json`)
    writeFileRecursive(presetPath, JSON.stringify(value, null, 4))
    console.warn(`✅ Generated presets for : ${key}`)
  })
}

generate()
