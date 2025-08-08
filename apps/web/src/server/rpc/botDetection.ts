// Comprehensive type for request headers used in bot detection
export type BotDetectionHeaders = {
  // Standard headers
  'user-agent': string | null
  'x-forwarded-for': string | null
  'x-forwarded-proto': string | null
  'x-real-ip': string | null
  'x-client-ip': string | null
  'x-cluster-client-ip': string | null
  'x-forwarded': string | null
  'forwarded-for': string | null
  forwarded: string | null
  'cf-connecting-ip': string | null
  'cf-ipcountry': string | null
  'cf-ray': string | null
  'cf-visitor': string | null
  'x-forwarded-host': string | null
  'x-original-forwarded-for': string | null
  'x-requested-with': string | null

  // Referrer and origin
  referer: string | null
  origin: string | null

  // Accept headers
  accept: string | null
  'accept-language': string | null
  'accept-encoding': string | null
  'accept-charset': string | null

  // Connection and proxy headers
  connection: string | null
  via: string | null
  'x-forwarded-server': string | null
  'x-forwarded-port': string | null

  // Security and authentication headers
  authorization: string | null
  cookie: string | null
  'x-csrf-token': string | null
  'x-xsrf-token': string | null

  // Content headers
  'content-type': string | null
  'content-length': string | null

  // Host and server headers
  host: string | null
  server: string | null

  // Cache and performance headers
  'cache-control': string | null
  pragma: string | null
  'if-none-match': string | null
  'if-modified-since': string | null

  // Custom headers that might indicate bots
  'x-request-id': string | null
  'x-correlation-id': string | null
  'x-amz-cf-id': string | null
  'x-amz-id-2': string | null
  'x-amz-request-id': string | null

  // Additional headers for comprehensive tracking
  'sec-ch-ua': string | null
  'sec-ch-ua-mobile': string | null
  'sec-ch-ua-platform': string | null
  'sec-fetch-dest': string | null
  'sec-fetch-mode': string | null
  'sec-fetch-site': string | null
  'sec-fetch-user': string | null
  'upgrade-insecure-requests': string | null
  dnt: string | null
  'save-data': string | null
  'viewport-width': string | null
  'device-memory': string | null
  ect: string | null
  rtt: string | null
  downlink: string | null
}

// Helper function to extract all relevant headers for bot detection
export function extractBotDetectionHeaders(req: Request): BotDetectionHeaders {
  const headers = req.headers

  return {
    // Standard headers
    'user-agent': headers.get('user-agent'),
    'x-forwarded-for': headers.get('x-forwarded-for'),
    'x-forwarded-proto': headers.get('x-forwarded-proto'),
    'x-real-ip': headers.get('x-real-ip'),
    'x-client-ip': headers.get('x-client-ip'),
    'x-cluster-client-ip': headers.get('x-cluster-client-ip'),
    'x-forwarded': headers.get('x-forwarded'),
    'forwarded-for': headers.get('forwarded-for'),
    forwarded: headers.get('forwarded'),
    'cf-connecting-ip': headers.get('cf-connecting-ip'),
    'cf-ipcountry': headers.get('cf-ipcountry'),
    'cf-ray': headers.get('cf-ray'),
    'cf-visitor': headers.get('cf-visitor'),
    'x-forwarded-host': headers.get('x-forwarded-host'),
    'x-original-forwarded-for': headers.get('x-original-forwarded-for'),
    'x-requested-with': headers.get('x-requested-with'),

    // Referrer and origin
    referer: headers.get('referer'),
    origin: headers.get('origin'),

    // Accept headers
    accept: headers.get('accept'),
    'accept-language': headers.get('accept-language'),
    'accept-encoding': headers.get('accept-encoding'),
    'accept-charset': headers.get('accept-charset'),

    // Connection and proxy headers
    connection: headers.get('connection'),
    via: headers.get('via'),
    'x-forwarded-server': headers.get('x-forwarded-server'),
    'x-forwarded-port': headers.get('x-forwarded-port'),

    // Security and authentication headers
    authorization: headers.get('authorization'),
    cookie: headers.get('cookie'),
    'x-csrf-token': headers.get('x-csrf-token'),
    'x-xsrf-token': headers.get('x-xsrf-token'),

    // Content headers
    'content-type': headers.get('content-type'),
    'content-length': headers.get('content-length'),

    // Host and server headers
    host: headers.get('host'),
    server: headers.get('server'),

    // Cache and performance headers
    'cache-control': headers.get('cache-control'),
    pragma: headers.get('pragma'),
    'if-none-match': headers.get('if-none-match'),
    'if-modified-since': headers.get('if-modified-since'),

    // Custom headers that might indicate bots
    'x-request-id': headers.get('x-request-id'),
    'x-correlation-id': headers.get('x-correlation-id'),
    'x-amz-cf-id': headers.get('x-amz-cf-id'),
    'x-amz-id-2': headers.get('x-amz-id-2'),
    'x-amz-request-id': headers.get('x-amz-request-id'),

    // Additional headers for comprehensive tracking
    'sec-ch-ua': headers.get('sec-ch-ua'),
    'sec-ch-ua-mobile': headers.get('sec-ch-ua-mobile'),
    'sec-ch-ua-platform': headers.get('sec-ch-ua-platform'),
    'sec-fetch-dest': headers.get('sec-fetch-dest'),
    'sec-fetch-mode': headers.get('sec-fetch-mode'),
    'sec-fetch-site': headers.get('sec-fetch-site'),
    'sec-fetch-user': headers.get('sec-fetch-user'),
    'upgrade-insecure-requests': headers.get('upgrade-insecure-requests'),
    dnt: headers.get('dnt'),
    'save-data': headers.get('save-data'),
    'viewport-width': headers.get('viewport-width'),
    'device-memory': headers.get('device-memory'),
    ect: headers.get('ect'),
    rtt: headers.get('rtt'),
    downlink: headers.get('downlink'),
  }
}
