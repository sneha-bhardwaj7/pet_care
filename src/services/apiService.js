import { API_CONFIG, getHeaders, rateLimiters } from './apiConfig'

// Simple in-memory cache
class Cache {
  constructor() {
    this.cache = new Map()
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  set(key, data, ttl = API_CONFIG.CACHE.DEFAULT_TTL) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttl
    })
  }

  clear() {
    this.cache.clear()
  }

  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }
  }
}

const cache = new Cache()

// Utility function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Generic API request function with retry logic
async function makeApiRequest(url, options = {}, rateLimiter, maxRetries = 3) {
  // Check rate limit
  if (!rateLimiter.canMakeRequest()) {
    throw new Error('Rate limit exceeded. Please try again later.')
  }

  let lastError
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      rateLimiter.recordRequest()
      
      // Create AbortController for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      lastError = error
      console.warn(`API request attempt ${attempt} failed:`, error.message)
      
      if (attempt < maxRetries) {
        const delayTime = API_CONFIG.RETRY.INITIAL_DELAY * Math.pow(API_CONFIG.RETRY.BACKOFF_MULTIPLIER, attempt - 1)
        console.log(`Retrying in ${delayTime}ms...`)
        await delay(delayTime)
      }
    }
  }

  throw lastError
}

// API Ninjas Service
export const apiNinjasService = {
  // Get animal information
  async getAnimalInfo(animalName) {
    if (!animalName) {
      throw new Error('Animal name is required')
    }

    const cacheKey = `animal_${animalName.toLowerCase()}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const url = `${API_CONFIG.API_NINJAS.BASE_URL}${API_CONFIG.API_NINJAS.ENDPOINTS.ANIMALS}?name=${encodeURIComponent(animalName)}`
      const headers = getHeaders('API_NINJAS')
      
      const data = await makeApiRequest(url, { headers }, rateLimiters.apiNinjas)
      
      cache.set(cacheKey, data, API_CONFIG.CACHE.ANIMAL_DATA_TTL)
      return data
    } catch (error) {
      console.error('Error fetching animal info:', error)
      throw new Error(`Failed to fetch animal information: ${error.message}`)
    }
  },

  // Get dog breed information
  async getDogBreeds(breedName = '') {
    const cacheKey = `dog_breeds_${breedName.toLowerCase()}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const url = breedName 
        ? `${API_CONFIG.API_NINJAS.BASE_URL}${API_CONFIG.API_NINJAS.ENDPOINTS.DOGS}?name=${encodeURIComponent(breedName)}`
        : `${API_CONFIG.API_NINJAS.BASE_URL}${API_CONFIG.API_NINJAS.ENDPOINTS.DOGS}`
      
      const headers = getHeaders('API_NINJAS')
      const data = await makeApiRequest(url, { headers }, rateLimiters.apiNinjas)
      
      cache.set(cacheKey, data, API_CONFIG.CACHE.ANIMAL_DATA_TTL)
      return data
    } catch (error) {
      console.error('Error fetching dog breeds:', error)
      throw new Error(`Failed to fetch dog breed information: ${error.message}`)
    }
  },

  // Get cat breed information
  async getCatBreeds(breedName = '') {
    const cacheKey = `cat_breeds_${breedName.toLowerCase()}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const url = breedName 
        ? `${API_CONFIG.API_NINJAS.BASE_URL}${API_CONFIG.API_NINJAS.ENDPOINTS.CATS}?name=${encodeURIComponent(breedName)}`
        : `${API_CONFIG.API_NINJAS.BASE_URL}${API_CONFIG.API_NINJAS.ENDPOINTS.CATS}`
      
      const headers = getHeaders('API_NINJAS')
      const data = await makeApiRequest(url, { headers }, rateLimiters.apiNinjas)
      
      cache.set(cacheKey, data, API_CONFIG.CACHE.ANIMAL_DATA_TTL)
      return data
    } catch (error) {
      console.error('Error fetching cat breeds:', error)
      throw new Error(`Failed to fetch cat breed information: ${error.message}`)
    }
  }
}

// RescueGroups Service
export const rescueGroupsService = {
  async getAdoptablePets(filters = {}) {
    const cacheKey = `adoptable_pets_${JSON.stringify(filters)}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const queryParams = new URLSearchParams()
      
      if (filters.species) queryParams.append('species', filters.species)
      if (filters.breed) queryParams.append('breed', filters.breed)
      if (filters.age) queryParams.append('age', filters.age)
      if (filters.size) queryParams.append('size', filters.size)
      if (filters.location) queryParams.append('location', filters.location)
      
      queryParams.append('limit', filters.limit || '20')
      queryParams.append('sort', filters.sort || 'created')

      const url = `${API_CONFIG.RESCUE_GROUPS.BASE_URL}${API_CONFIG.RESCUE_GROUPS.ENDPOINTS.ANIMALS}?${queryParams}`
      const headers = getHeaders('RESCUE_GROUPS')
      
      const data = await makeApiRequest(url, { headers }, rateLimiters.rescueGroups)
      
      cache.set(cacheKey, data, API_CONFIG.CACHE.DEFAULT_TTL)
      return data
    } catch (error) {
      console.error('Error fetching adoptable pets:', error)
      // Return enhanced mock data if API fails
      return {
        data: [
          {
            id: 1,
            name: "Buddy",
            species: "Dog",
            breed: "Golden Retriever Mix",
            age: "3 years",
            size: "Large",
            gender: "Male",
            description: "Buddy is a friendly and energetic dog who loves playing fetch and going on long walks. He's great with kids and other dogs!",
            images: ["/placeholder.svg?height=400&width=400&text=🐕+Buddy"],
            location: "Happy Paws Animal Shelter",
            contact: "555-0123",
            vaccinated: true,
            spayedNeutered: true,
            houseTrained: true,
            goodWithKids: true,
            goodWithPets: true,
            energy: "High",
            adoptionFee: "$150"
          },
          {
            id: 2,
            name: "Luna",
            species: "Cat",
            breed: "Domestic Shorthair",
            age: "2 years",
            size: "Medium",
            gender: "Female",
            description: "Luna is a sweet and gentle cat who loves to cuddle and purr. She's perfect for a quiet home where she can be the center of attention.",
            images: ["/placeholder.svg?height=400&width=400&text=🐱+Luna"],
            location: "City Cat Rescue",
            contact: "555-0456",
            vaccinated: true,
            spayedNeutered: true,
            litterTrained: true,
            goodWithKids: true,
            goodWithPets: false,
            energy: "Low",
            adoptionFee: "$75"
          },
          {
            id: 3,
            name: "Max",
            species: "Dog",
            breed: "German Shepherd Mix",
            age: "5 years",
            size: "Large",
            gender: "Male",
            description: "Max is a loyal and intelligent dog looking for an experienced owner. He knows basic commands and loves outdoor activities.",
            images: ["/placeholder.svg?height=400&width=400&text=🐕+Max"],
            location: "Rescue Dogs United",
            contact: "555-0789",
            vaccinated: true,
            spayedNeutered: true,
            houseTrained: true,
            goodWithKids: false,
            goodWithPets: true,
            energy: "Medium",
            adoptionFee: "$200"
          }
        ]
      }
    }
  }
}

// Shopify Service
export const shopifyService = {
  async getProducts(filters = {}) {
    const cacheKey = `products_${JSON.stringify(filters)}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      // Use Storefront API GraphQL
      const query = `
        query getProducts($first: Int!) {
          products(first: $first) {
            edges {
              node {
                id
                title
                description
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 5) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                productType
                vendor
              }
            }
          }
        }
      `

      const variables = {
        first: filters.limit || 20
      }

      const headers = getHeaders('SHOPIFY')
      
      const data = await makeApiRequest(API_CONFIG.SHOPIFY.STORE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables
        })
      }, rateLimiters.shopify)
      
      cache.set(cacheKey, data, API_CONFIG.CACHE.PRODUCT_DATA_TTL)
      return data
    } catch (error) {
      console.error('Error fetching products:', error)
      // Return enhanced mock data if API fails
      return {
        data: {
          products: {
            edges: [
              {
                node: {
                  id: "1",
                  title: "Premium Dog Food - Salmon & Rice",
                  description: "High-quality protein-rich formula with real salmon and brown rice. Perfect for adult dogs with sensitive stomachs.",
                  priceRange: {
                    minVariantPrice: {
                      amount: "49.99",
                      currencyCode: "USD"
                    }
                  },
                  images: {
                    edges: [
                      {
                        node: {
                          url: "/placeholder.svg?height=400&width=400&text=🥘+Premium+Dog+Food",
                          altText: "Premium Dog Food - Salmon & Rice"
                        }
                      }
                    ]
                  },
                  productType: "Food",
                  vendor: "NutriPet"
                }
              },
              {
                node: {
                  id: "2",
                  title: "Interactive Cat Toy Set",
                  description: "Engaging toys to keep your cat entertained and active. Includes feather wand, laser pointer, and puzzle feeder.",
                  priceRange: {
                    minVariantPrice: {
                      amount: "24.99",
                      currencyCode: "USD"
                    }
                  },
                  images: {
                    edges: [
                      {
                        node: {
                          url: "/placeholder.svg?height=400&width=400&text=🧸+Cat+Toy+Set",
                          altText: "Interactive Cat Toy Set"
                        }
                      }
                    ]
                  },
                  productType: "Toys",
                  vendor: "PlayPaws"
                }
              },
              {
                node: {
                  id: "3",
                  title: "Orthopedic Dog Bed - Large",
                  description: "Memory foam dog bed designed for joint support and comfort. Machine washable cover included.",
                  priceRange: {
                    minVariantPrice: {
                      amount: "89.99",
                      currencyCode: "USD"
                    }
                  },
                  images: {
                    edges: [
                      {
                        node: {
                          url: "/placeholder.svg?height=400&width=400&text=🛏️+Dog+Bed",
                          altText: "Orthopedic Dog Bed"
                        }
                      }
                    ]
                  },
                  productType: "Beds",
                  vendor: "ComfortPaws"
                }
              },
              {
                node: {
                  id: "4",
                  title: "Natural Cat Litter - Clumping",
                  description: "Eco-friendly clumping cat litter made from natural clay. Odor control guaranteed for 7 days.",
                  priceRange: {
                    minVariantPrice: {
                      amount: "19.99",
                      currencyCode: "USD"
                    }
                  },
                  images: {
                    edges: [
                      {
                        node: {
                          url: "/placeholder.svg?height=400&width=400&text=🪣+Cat+Litter",
                          altText: "Natural Cat Litter"
                        }
                      }
                    ]
                  },
                  productType: "Litter",
                  vendor: "EcoClean"
                }
              }
            ]
          }
        }
      }
    }
  }
}

// Google Maps Service
export const googleMapsService = {
  async getNearbyVets(location, radius = 5000) {
    if (!location) {
      throw new Error('Location is required')
    }

    const cacheKey = `nearby_vets_${location}_${radius}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const queryParams = new URLSearchParams({
        location: location,
        radius: radius,
        type: 'veterinary_care',
        key: API_CONFIG.GOOGLE_MAPS.API_KEY
      })

      const url = `${API_CONFIG.GOOGLE_MAPS.BASE_URL}${API_CONFIG.GOOGLE_MAPS.ENDPOINTS.PLACES}?${queryParams}`
      
      const data = await makeApiRequest(url, {}, rateLimiters.googleMaps)
      
      cache.set(cacheKey, data, API_CONFIG.CACHE.DEFAULT_TTL)
      return data
    } catch (error) {
      console.error('Error fetching nearby vets:', error)
      // Return enhanced mock data if API fails
      return {
        results: [
          {
            name: "City Veterinary Clinic",
            vicinity: "123 Main St, Your City",
            rating: 4.5,
            place_id: "mock_place_id_1",
            opening_hours: {
              open_now: true
            },
            price_level: 2,
            types: ["veterinary_care", "health"]
          },
          {
            name: "Pet Care Animal Hospital",
            vicinity: "456 Oak Ave, Your City",
            rating: 4.8,
            place_id: "mock_place_id_2",
            opening_hours: {
              open_now: true
            },
            price_level: 3,
            types: ["veterinary_care", "health"]
          },
          {
            name: "Emergency Pet Clinic",
            vicinity: "789 Pine St, Your City",
            rating: 4.2,
            place_id: "mock_place_id_3",
            opening_hours: {
              open_now: true
            },
            price_level: 4,
            types: ["veterinary_care", "health", "emergency"]
          }
        ]
      }
    }
  }
}

// Export all services
export default {
  apiNinjas: apiNinjasService,
  rescueGroups: rescueGroupsService,
  shopify: shopifyService,
  googleMaps: googleMapsService,
  cache
}
