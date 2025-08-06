"use client"

import { useState, useEffect } from "react"
import { Search, ShoppingCart, Heart, Star, Filter, Grid, List, Truck, Zap } from "lucide-react"
import Button from "../components/Button"
import Card from "../components/Card"
import Badge from "../components/Badge"
import Input from "../components/Input"
import Select from "../components/Select"
import Slider from "../components/Slider"
import Checkbox from "../components/Checkbox"

export default function MarketplacePage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState("grid")
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])

  // Mock product data
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: "Premium Dog Food - Salmon & Rice Formula",
        price: 49.99,
        originalPrice: 59.99,
        rating: 4.8,
        reviews: 1247,
        category: "Food",
        brand: "NutriPet",
        image: "/placeholder.svg?height=300&width=300",
        description: "High-quality protein-rich formula with real salmon and brown rice for adult dogs.",
        inStock: true,
        fastShipping: true,
        bestseller: true,
        discount: 17,
        tags: ["Natural", "Grain-Free", "High Protein"],
      },
      {
        id: 2,
        name: "Interactive Cat Puzzle Feeder",
        price: 24.99,
        rating: 4.6,
        reviews: 892,
        category: "Toys",
        brand: "PlayPaws",
        image: "/placeholder.svg?height=300&width=300",
        description: "Stimulating puzzle feeder that encourages natural hunting instincts and slow eating.",
        inStock: true,
        fastShipping: false,
        bestseller: false,
        tags: ["Interactive", "Mental Stimulation", "Slow Feeding"],
      },
      {
        id: 3,
        name: "Professional Pet Grooming Kit",
        price: 89.99,
        rating: 4.9,
        reviews: 456,
        category: "Grooming",
        brand: "GroomMaster",
        image: "/placeholder.svg?height=300&width=300",
        description: "Complete grooming set with clippers, brushes, nail trimmers, and accessories.",
        inStock: true,
        fastShipping: true,
        bestseller: true,
        tags: ["Professional", "Complete Set", "All Breeds"],
      },
      {
        id: 4,
        name: "Orthopedic Memory Foam Dog Bed",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.7,
        reviews: 623,
        category: "Bedding",
        brand: "ComfortPaws",
        image: "/placeholder.svg?height=300&width=300",
        description: "Therapeutic memory foam bed designed for senior dogs and joint support.",
        inStock: true,
        fastShipping: true,
        bestseller: false,
        discount: 20,
        tags: ["Orthopedic", "Memory Foam", "Senior Dogs"],
      },
      {
        id: 5,
        name: "Bird Cage Deluxe Flight Aviary",
        price: 159.99,
        rating: 4.5,
        reviews: 234,
        category: "Housing",
        brand: "AvianHome",
        image: "/placeholder.svg?height=300&width=300",
        description: "Spacious flight cage perfect for medium to large birds with multiple perches.",
        inStock: false,
        fastShipping: false,
        bestseller: false,
        tags: ["Large", "Flight Cage", "Multiple Perches"],
      },
      {
        id: 6,
        name: "Aquarium LED Lighting System",
        price: 129.99,
        rating: 4.8,
        reviews: 345,
        category: "Aquarium",
        brand: "AquaGlow",
        image: "/placeholder.svg?height=300&width=300",
        description: "Full spectrum LED lighting system with programmable day/night cycles.",
        inStock: true,
        fastShipping: true,
        bestseller: true,
        tags: ["LED", "Programmable", "Full Spectrum"],
      },
    ]

    setTimeout(() => {
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  // Filter and sort products
  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        filtered.sort((a, b) => b.reviews - a.reviews)
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, priceRange, sortBy, products])

  const addToCart = (productId) => {
    setCart((prev) => [...prev, productId])
  }

  const toggleWishlist = (productId) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const categories = ["Food", "Toys", "Grooming", "Bedding", "Housing", "Aquarium", "Health"]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Pet Care Marketplace
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover premium products for your beloved pets. From nutritious food to engaging toys, we have everything
              you need to keep your pets healthy and happy.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for products, brands, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h3>
                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Category</h4>
                    <Select value={selectedCategory} onChange={setSelectedCategory}>
                      <option value="all">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="px-2">
                      <Slider min={0} max={200} step={5} value={priceRange} onChange={setPriceRange} className="mb-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div>
                    <h4 className="font-medium mb-3">Quick Filters</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="bestseller" />
                        <label htmlFor="bestseller" className="text-sm">
                          Bestsellers
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="fast-shipping" />
                        <label htmlFor="fast-shipping" className="text-sm">
                          Fast Shipping
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="on-sale" />
                        <label htmlFor="on-sale" className="text-sm">
                          On Sale
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="in-stock" />
                        <label htmlFor="in-stock" className="text-sm">
                          In Stock
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onChange={setSortBy}>
                  <option value="popularity">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    viewMode === "list" ? "flex flex-row" : "hover:-translate-y-1"
                  }`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className={`object-cover ${viewMode === "list" ? "w-full h-full" : "w-full h-48"}`}
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.bestseller && (
                        <Badge className="bg-orange-500">
                          <Zap className="w-3 h-3 mr-1" />
                          Bestseller
                        </Badge>
                      )}
                      {product.discount && <Badge className="bg-red-500">-{product.discount}%</Badge>}
                      {product.fastShipping && (
                        <Badge className="bg-green-500">
                          <Truck className="w-3 h-3 mr-1" />
                          Fast Ship
                        </Badge>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart
                        className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>

                    {/* Stock Status */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                  </div>

                  <div className={`${viewMode === "list" ? "flex-1" : ""} p-6`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2">
                          {product.category}
                        </Badge>
                        <h3
                          className={`${viewMode === "list" ? "text-lg" : "text-base"} font-semibold line-clamp-2 mb-1`}
                        >
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                    </div>

                    {viewMode === "list" && <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>}

                    <div className="space-y-3">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {product.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <Button className="w-full" disabled={!product.inStock} onClick={() => addToCart(product.id)}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setPriceRange([0, 200])
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
