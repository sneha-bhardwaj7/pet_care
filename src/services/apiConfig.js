// API Configuration and Constants
export const API_CONFIG = {
  // API Ninjas Configuration
  API_NINJAS: {
    BASE_URL: 'https://api.api-ninjas.com/v1',
    API_KEY: window.REACT_APP_API_NINJA || 'zI/eWn5nXsNhb/45B5UDlA==CAJR3yLg5HNRd02s',
    ENDPOINTS: {
      ANIMALS: '/animals',
      DOGS: '/dogs',
      CATS: '/cats'
    },
    RATE_LIMIT: {
      REQUESTS_PER_MINUTE: 100,
      REQUESTS_PER_HOUR: 1000
    }
  },

  // RescueGroups API Configuration
  RESCUE_GROUPS: {
    BASE_URL: 'https://api.rescuegroups.org/v5',
    API_KEY: window.REACT_APP_RESCUE_GROUPS_KEY || '2f940faa06d74ddba6afae46cd8e8912',
    ENDPOINTS: {
      ANIMALS: '/public/animals/search/available',
      ORGANIZATIONS: '/public/orgs'
    }
  },

  // Shopify Configuration
  SHOPIFY: {
    STORE_URL: `https://${window.REACT_APP_SHOPIFY_STORE_URL || 'ghj011-df.myshopify.com'}/api/2023-10/graphql.json`,
    ACCESS_TOKEN: window.REACT_APP_SHOPIFY_ACCESS_TOKEN || 'f95625a77f7fc43afa916ad3c29241aa',
    ENDPOINTS: {
      PRODUCTS: '/admin/api/2023-10/products.json',
      COLLECTIONS: '/admin/api/2023-10/collections.json'
    }
  },

  // Google Maps Configuration
  GOOGLE_MAPS: {
    API_KEY: window.REACT_APP_GOOGLE_MAPS_KEY || 'AIzaSyBWR1Q4ACP8S-1n3Qnj3gwPXv8ytc2zifA',
    BASE_URL: 'https://maps.googleapis.com/maps/api',
    ENDPOINTS: {
      PLACES: '/place/nearbysearch/json',
      GEOCODING: '/geocode/json'
    }
  },

  // Cache Configuration
  CACHE: {
    DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
    ANIMAL_DATA_TTL: 30 * 60 * 1000, // 30 minutes
    PRODUCT_DATA_TTL: 10 * 60 * 1000 // 10 minutes
  },

  // Retry Configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    INITIAL_DELAY: 1000,
    BACKOFF_MULTIPLIER: 2
  }
}

// Request Headers
export const getHeaders = (apiType) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  switch (apiType) {
    case 'API_NINJAS':
      headers['X-Api-Key'] = API_CONFIG.API_NINJAS.API_KEY
      break
    case 'RESCUE_GROUPS':
      headers['Authorization'] = `Bearer ${API_CONFIG.RESCUE_GROUPS.API_KEY}`
      break
    case 'SHOPIFY':
      headers['X-Shopify-Storefront-Access-Token'] = API_CONFIG.SHOPIFY.ACCESS_TOKEN
      break
    default:
      break
  }

  return headers
}

// Rate Limiting
class RateLimiter {
  constructor(requestsPerMinute = 60) {
    this.requests = []
    this.maxRequests = requestsPerMinute
  }

  canMakeRequest() {
    const now = Date.now()
    const oneMinuteAgo = now - 60000

    // Remove old requests
    this.requests = this.requests.filter(time => time > oneMinuteAgo)

    return this.requests.length < this.maxRequests
  }

  recordRequest() {
    this.requests.push(Date.now())
  }

  getRequestsRemaining() {
    const now = Date.now()
    const oneMinuteAgo = now - 60000
    this.requests = this.requests.filter(time => time > oneMinuteAgo)
    return Math.max(0, this.maxRequests - this.requests.length)
  }
}

export const rateLimiters = {
  apiNinjas: new RateLimiter(API_CONFIG.API_NINJAS.RATE_LIMIT.REQUESTS_PER_MINUTE),
  rescueGroups: new RateLimiter(50),
  shopify: new RateLimiter(40),
  googleMaps: new RateLimiter(100)
}

// Environment setup for React
if (typeof window !== 'undefined') {
  // Set environment variables on window object for browser access
  window.REACT_APP_API_NINJA = 'zI/eWn5nXsNhb/45B5UDlA==CAJR3yLg5HNRd02s'
  window.REACT_APP_RESCUE_GROUPS_KEY = '2f940faa06d74ddba6afae46cd8e8912'
  window.REACT_APP_SHOPIFY_STORE_URL = 'ghj011-df.myshopify.com'
  window.REACT_APP_SHOPIFY_ACCESS_TOKEN = 'f95625a77f7fc43afa916ad3c29241aa'
  window.REACT_APP_GOOGLE_MAPS_KEY = 'AIzaSyBWR1Q4ACP8S-1n3Qnj3gwPXv8ytc2zifA'
}
