module.exports = {
  apiOptions: {
    addScriptHandlers: [
      function (
        documentation,
        componentDefinition,
        astPath,
        opt,
      ) {
        const componentDoc = astPath.tokens.filter(token => token.type === 'CommentBlock' && token.value.includes('@docs')).find(() => true)

        if (componentDoc) {
          const lines = componentDoc.value.split('\n')

          const nameLine = lines.filter(line => line.includes('@displayName'))[0]
          const descriptionLine = lines.filter(line => line.includes('@description'))[0]

          if (nameLine) {
            documentation.set('displayName', nameLine.replaceAll('@displayName', '').replaceAll(/[^a-zA-Z0-9]+/g, ''))
          }

          if (descriptionLine) {
            documentation.set('description', descriptionLine.replaceAll(/\*\s+\@description/g, '').trim())
          }
        }
      },
    ],
  },
}
