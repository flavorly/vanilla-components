function getNameFromPath(relativePath) {
  return relativePath.split('/').pop().split('.')[0]
}

export { getNameFromPath }
