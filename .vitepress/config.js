const { fetchDocs } = require('./fetchDocs')

module.exports = {
  title: 'Tailwind CSS',
  description: 'Simplified Tailwindcss documentation site clone',
  themeConfig: {
    repo: 'https://github.com/haoranpb/vitepress-tailwind-documentation',
    pages: fetchDocs(),
    collections: {
      'Getting started': [
        'installation',
        'upgrading-to-v2',
        'using-with-preprocessors',
        'optimizing-for-production',
        'browser-support',
        'intellisense',
      ],
      'Core Concepts': [
        'responsive-design',
        'dark-mode',
        'adding-base-styles',
        'extracting-components',
        'adding-new-utilities',
      ],
    },
  },
}
