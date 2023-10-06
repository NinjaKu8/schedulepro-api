import { IncomingHttpHeaders } from 'http'

import HttpException from './http-exception'

/**
 * This function is used to get a value from the headers of a request.
 * It will throw an error if the header is missing.
 * @param headers The req.headers object
 * @param headerName The header name to get the value from
 * @returns The value of req.headers[headerName]
 */
export function getValueFromHeaders(headers: IncomingHttpHeaders, headerName: string): string {
  const header = headers[headerName] ?? headers[headerName.toLowerCase()]
  if(!header) throw new HttpException(400, 'Missing required header')
  return header.toString()
}
