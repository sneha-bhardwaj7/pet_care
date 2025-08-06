"use client"

import { useState } from "react"
import { Camera, Trophy, Heart, MessageCircle, Upload, Calendar, Users, Award } from "lucide-react"
import Button from "../components/Button"
import Card from "../components/Card"
import Badge from "../components/Badge"
import Input from "../components/Input"
import { photoContests, featuredPets } from "../data/community"

export default function PhotoContestsPage() {
  const [selectedContest, setSelectedContest] = useState(photoContests[0])
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadData, setUploadData] = useState({
    petName: "",
    caption: "",
    image: null,
  })

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setUploadData({ ...uploadData, image: file })
    }
  }

  const handleSubmitEntry = () => {
    if (uploadData.petName && uploadData.caption && uploadData.image) {
      // Handle submission
      console.log("Submitting entry:", uploadData)
      setShowUploadForm(false)
      setUploadData({ petName: "", caption: "", image: null })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Pet Photo Contests
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Show off your pet's personality and win amazing prizes! Join our monthly contests and get featured on our
              homepage.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Contest Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  Active Contests
                </h3>
                <div className="space-y-4">
                  {photoContests.map((contest) => (
                    <div
                      key={contest.id}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedContest.id === contest.id
                          ? "bg-yellow-100 border-2 border-yellow-300"
                          : "border hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedContest(contest)}
                    >
                      <img
                        src={contest.image || "/placeholder.svg"}
                        alt={contest.title}
                        className="w-full h-24 object-cover rounded mb-3"
                      />
                      <h4 className="font-semibold text-sm mb-1">{contest.title}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(contest.endDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {contest.entries}
                        </span>
                      </div>
                      <Badge className={`text-xs ${contest.status === "active" ? "bg-green-500" : "bg-gray-500"}`}>
                        {contest.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500"
                  onClick={() => setShowUploadForm(true)}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Enter Contest
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Contest Details */}
            <Card className="mb-8 overflow-hidden">
              <div className="relative">
                <img
                  src={selectedContest.image || "/placeholder.svg"}
                  alt={selectedContest.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{selectedContest.title}</h2>
                  <p className="text-lg opacity-90">{selectedContest.description}</p>
                </div>
                <div className="absolute top-6 right-6">
                  <Badge className="bg-yellow-500 text-black font-semibold">
                    <Trophy className="w-4 h-4 mr-1" />
                    {selectedContest.prize}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{selectedContest.entries}</div>
                    <div className="text-sm text-gray-600">Total Entries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.ceil((new Date(selectedContest.endDate) - new Date()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div className="text-sm text-gray-600">Days Left</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">1st</div>
                    <div className="text-sm text-gray-600">Prize Place</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Contest Rules:</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Photo must be original and taken by you</li>
                    <li>• Pet must be clearly visible in the photo</li>
                    <li>• One entry per pet per contest</li>
                    <li>• Photo should match the contest theme</li>
                    <li>• Winner will be announced 3 days after contest ends</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Upload Form Modal */}
            {showUploadForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <Card className="max-w-md w-full">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Enter Contest</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Pet Name</label>
                        <Input
                          placeholder="Enter your pet's name"
                          value={uploadData.petName}
                          onChange={(e) => setUploadData({ ...uploadData, petName: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Caption</label>
                        <Input
                          placeholder="Write a fun caption for your photo"
                          value={uploadData.caption}
                          onChange={(e) => setUploadData({ ...uploadData, caption: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Upload Photo</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <label htmlFor="photo-upload" className="cursor-pointer">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload photo</p>
                          </label>
                          {uploadData.image && <p className="text-sm text-green-600 mt-2">✓ {uploadData.image.name}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-4 mt-6">
                      <Button variant="outline" onClick={() => setShowUploadForm(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitEntry}>Submit Entry</Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Featured Pet of the Week */}
            <Card className="mb-8">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Award className="w-6 h-6 mr-2 text-purple-600" />
                  Featured Pet of the Week
                </h3>
                {featuredPets.map((pet) => (
                  <div key={pet.id} className="flex items-start space-x-6">
                    <img
                      src={pet.image || "/placeholder.svg"}
                      alt={pet.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-2xl font-bold">{pet.name}</h4>
                        <Badge className="bg-purple-100 text-purple-800">
                          {pet.breed} • {pet.age}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">Owned by {pet.owner}</p>
                      <p className="text-gray-800 mb-4">{pet.story}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {pet.achievements.map((achievement, index) => (
                          <Badge key={index} className="bg-yellow-100 text-yellow-800 text-xs">
                            <Trophy className="w-3 h-3 mr-1" />
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">Featured: {pet.weekOf}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Contest Entries */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Recent Entries</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((entry) => (
                    <div key={entry} className="relative group">
                      <img
                        src={`/placeholder.svg?height=200&width=200&query=cute-pet-${entry}`}
                        alt={`Contest entry ${entry}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all rounded-lg flex items-end">
                        <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="font-semibold">Fluffy's Nap Time</p>
                          <p className="text-sm">by Sarah Johnson</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="flex items-center text-sm">
                              <Heart className="w-4 h-4 mr-1" />
                              24
                            </span>
                            <span className="flex items-center text-sm">
                              <MessageCircle className="w-4 h-4 mr-1" />8
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
