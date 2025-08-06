"use client"

import { useState } from "react"
import { Search, ShoppingCart, Heart, Star, Grid, List, Truck, Zap, ArrowUpDown, Eye } from "lucide-react"
import Button from "../components/Button"
import Card from "../components/Card"
import Badge from "../components/Badge"
import Input from "../components/Input"
import Select from "../components/Select"
import { productsData, vendors } from "../data/products"

export default function AdvancedMarketplacePage() {
  const [products, setProducts] = useState(productsData)
  const [filteredProducts, setFilteredProducts] = useState(productsData)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [showComparison, setShowComparison] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProblem, setSelectedProblem] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState("grid")
  const [wishlist, setWishlist] = useState([])

  const problemCategories = [
    "Anxiety Relief",
    "Digestive Issues",
    "Skin & Coat Health",
    "Joint Support",
    "Dental Care",
    "Weight Management",
    "Energy Support",
    "Senior Pet Care",
    "Puppy/Kitten Care",
    "Behavioral Issues",
  ]

  const handleProductSelect = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleCompareProducts = () => {
    if (selectedProducts.length >= 2) {
      setShowComparison(true)
    }
  }

  const toggleWishlist = (productId) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const getComparisonProducts = () => {
    return products.filter((p) => selectedProducts.includes(p.id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Advanced Pet Marketplace
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover premium products tailored to your pet's specific needs. Compare products, shop by problems, and
              find the perfect solutions.
            </p>
          </div>

          {/* Enhanced Search */}
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by product, brand, ingredient, or pet problem..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg"
              />
            </div>

            {/* Quick Problem Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {problemCategories.slice(0, 6).map((problem) => (
                <Button
                  key={problem}
                  variant={selectedProblem === problem ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedProblem(selectedProblem === problem ? "all" : problem)}
                  className="rounded-full"
                >
                  {problem}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Comparison Bar */}
        {selectedProducts.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <Card className="bg-white shadow-2xl border-2 border-blue-200">
              <div className="px-6 py-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <ArrowUpDown className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{selectedProducts.length} products selected</span>
                </div>
                <Button
                  onClick={handleCompareProducts}
                  disabled={selectedProducts.length < 2}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Compare Products
                </Button>
                <Button variant="outline" onClick={() => setSelectedProducts([])}>
                  Clear
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Comparison Modal */}
        {showComparison && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-6xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Product Comparison</h2>
                  <Button variant="outline" onClick={() => setShowComparison(false)}>
                    Close
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-4 border-b">Feature</th>
                        {getComparisonProducts().map((product) => (
                          <th key={product.id} className="text-center p-4 border-b min-w-[200px]">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded mx-auto mb-2"
                            />
                            <div className="font-medium text-sm">{product.name}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 font-medium border-b">Price</td>
                        {getComparisonProducts().map((product) => (
                          <td key={product.id} className="p-4 text-center border-b">
                            <span className="text-2xl font-bold text-green-600">${product.price}</span>
                            {product.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium border-b">Rating</td>
                        {getComparisonProducts().map((product) => (
                          <td key={product.id} className="p-4 text-center border-b">
                            <div className="flex items-center justify-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{product.rating}</span>
                            </div>
                            <div className="text-sm text-gray-500">({product.reviews} reviews)</div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium border-b">Brand</td>
                        {getComparisonProducts().map((product) => (
                          <td key={product.id} className="p-4 text-center border-b">
                            {product.brand}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium border-b">Problems Solved</td>
                        {getComparisonProducts().map((product) => (
                          <td key={product.id} className="p-4 text-center border-b">
                            <div className="space-y-1">
                              {product.problemsSolved?.map((problem, index) => (
                                <Badge key={index} variant="secondary" className="text-xs block">
                                  {problem}
                                </Badge>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Shop by Problem */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-purple-700">🎯 Shop by Pet Problem</h3>
                <div className="space-y-2">
                  {problemCategories.map((problem) => (
                    <button
                      key={problem}
                      onClick={() => setSelectedProblem(selectedProblem === problem ? "all" : problem)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedProblem === problem
                          ? "bg-purple-200 text-purple-800"
                          : "hover:bg-purple-100 text-gray-700"
                      }`}
                    >
                      {problem}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Vendor Spotlight */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  Featured Vendors
                </h3>
                <div className="space-y-4">
                  {vendors.map((vendor) => (
                    <div key={vendor.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{vendor.name}</h4>
                        {vendor.verified && <Badge className="bg-blue-500 text-xs">✓ Verified</Badge>}
                      </div>
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm">{vendor.rating}</span>
                        <span className="text-xs text-gray-500 ml-2">{vendor.totalProducts} products</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {vendor.specialties.slice(0, 2).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">{vendor.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* AR Try-On */}
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-700">📱 AR Virtual Try-On</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Use your camera to virtually try collars, harnesses, and accessories on your pet!
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Eye className="w-4 h-4 mr-2" />
                  Start AR Experience
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Enhanced Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
                {selectedProblem !== "all" && (
                  <Badge className="bg-purple-100 text-purple-800">For: {selectedProblem}</Badge>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onChange={setSortBy}>
                  <option value="popularity">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="problems">Best for Problems</option>
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

            {/* Enhanced Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${
                    viewMode === "list" ? "flex flex-row" : "hover:-translate-y-1"
                  } ${selectedProducts.includes(product.id) ? "ring-2 ring-blue-500" : ""}`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className={`object-cover ${viewMode === "list" ? "w-full h-full" : "w-full h-48"}`}
                    />

                    {/* Enhanced Badges */}
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

                    {/* Enhanced Action Buttons */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/80 hover:bg-white"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart
                          className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/80 hover:bg-white"
                        onClick={() => handleProductSelect(product.id)}
                      >
                        <ArrowUpDown
                          className={`w-4 h-4 ${selectedProducts.includes(product.id) ? "text-blue-600" : ""}`}
                        />
                      </Button>
                    </div>

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
                      {/* Problems Solved */}
                      {product.problemsSolved && (
                        <div>
                          <p className="text-xs font-medium text-purple-600 mb-1">Helps with:</p>
                          <div className="flex flex-wrap gap-1">
                            {product.problemsSolved.slice(0, 3).map((problem, index) => (
                              <Badge key={index} className="text-xs bg-purple-100 text-purple-800">
                                {problem}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

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

                      {/* Enhanced Buttons */}
                      <div className="flex gap-2">
                        <Button className="flex-1" disabled={!product.inStock}>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                        {product.suitableFor && (
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      {/* Vendor Info */}
                      <div className="text-xs text-gray-500 pt-2 border-t">
                        Sold by {product.vendor} • {product.shippingWeight}
                      </div>
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
                    setSelectedProblem("all")
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

