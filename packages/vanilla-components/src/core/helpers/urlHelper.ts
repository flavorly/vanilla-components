import { parse, stringify } from 'qs'

const urlBuilder = (url: string, query: object | null): string => {
  const isFullQualifiedUrl = url.startsWith('http://') || url.startsWith('https://')
  if (!isFullQualifiedUrl) {
    console.warn('The URL provided is not a full qualified URL')
  }

  const parsedUrl = new URL(url)
  if (!query) {
    return parsedUrl.toString()
  }
  const parsedUrlParams = parse(parsedUrl.search, { ignoreQueryPrefix: true })
  parsedUrl.search = stringify({ ...parsedUrlParams, ...query }, { arrayFormat: 'brackets' })
  return parsedUrl.toString()
}
export default urlBuilder
