import { parse, stringify } from 'qs'

const urlBuilder = (url: string, query: object): string => {
  const isFullQualifiedUrl = url.startsWith('http://') || url.startsWith('https://')
  if (!isFullQualifiedUrl) {
    throw new Error('The URL provided is not a full qualified URL')
  }

  const parsedUrl = new URL(url)
  const parsedUrlParams = parse(parsedUrl.search, { ignoreQueryPrefix: true })
  parsedUrl.search = stringify({ ...parsedUrlParams, ...query }, { arrayFormat: 'bracket' })
  return parsedUrl.toString()
}
export default urlBuilder
