const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

/**
 * Get all of the documentations under the `docs` folder
 *
 * Nested folders are not supported for simplicity
 *
 * @returns {Object} fileName -> { title, href }
 */
exports.fetchDocs = function fetchDocs() {
  const docsDir = path.join(__dirname, '../docs')

  return fs.readdirSync(docsDir).reduce((acc, file) => {
    const fileName = path.parse(file).name
    const src = fs.readFileSync(path.join(docsDir, file), 'utf-8')
    const { data } = matter(src)

    acc[fileName] = {
      title: data.title,
      href: `/docs/${fileName}.html`,
    }
    return acc
  }, {})
}
