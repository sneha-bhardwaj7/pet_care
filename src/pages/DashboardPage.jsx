"use client"

import { useState } from "react"
import {
  Plus,
  Heart,
  CalendarIcon,
  Bell,
  Activity,
  Stethoscope,
  ShoppingCart,
  Camera,
  Edit,
  Trash2,
  AlertCircle,
} from "lucide-react"
import Button from "../components/Button"
import Card from "../components/Card"
import Badge from "../components/Badge"
import Tabs from "../components/Tabs"
import Progress from "../components/Progress"
import Avatar from "../components/Avatar"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const [pets] = useState([
    {
      id: 1,
      name: "Max",
      species: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      weight: "65 lbs",
      image: "/placeholder.svg?height=100&width=100",
      healthStatus: "excellent",
      nextVetVisit: "2024-02-15",
      lastFed: "2 hours ago",
      medications: ["Heartworm Prevention"],
    },
    {
      id: 2,
      name: "Luna",
      species: "Cat",
      breed: "Persian",
      age: "5 years",
      weight: "8 lbs",
      image: "/placeholder.svg?height=100&width=100",
      healthStatus: "good",
      nextVetVisit: "2024-01-28",
      lastFed: "4 hours ago",
      medications: ["Flea Prevention", "Joint Supplement"],
    },
    {
      id: 3,
      name: "Charlie",
      species: "Bird",
      breed: "Budgerigar",
      age: "2 years",
      weight: "1.2 oz",
      image: "/placeholder.svg?height=100&width=100",
      healthStatus: "needs-attention",
      nextVetVisit: "2024-01-25",
      lastFed: "6 hours ago",
      medications: [],
    },
  ])

  const [reminders] = useState([
    {
      id: 1,
      type: "feeding",
      title: "Evening meal",
      time: "6:00 PM",
      petName: "Max",
      completed: false,
    },
    {
      id: 2,
      type: "medication",
      title: "Joint supplement",
      time: "8:00 PM",
      petName: "Luna",
      completed: false,
    },
    {
      id: 3,
      type: "vet",
      title: "Annual checkup",
      time: "Tomorrow 10:00 AM",
      petName: "Charlie",
      completed: false,
    },
    {
      id: 4,
      type: "grooming",
      title: "Nail trimming",
      time: "This weekend",
      petName: "Max",
      completed: true,
    },
  ])

  const [healthRecords] = useState([
    {
      id: 1,
      petId: 1,
      date: "2024-01-15",
      type: "vaccination",
      description: "Annual vaccinations",
      notes: "All vaccines up to date",
    },
    {
      id: 2,
      petId: 2,
      date: "2024-01-10",
      type: "weight",
      description: "Weight check",
      notes: "Maintaining healthy weight",
    },
    {
      id: 3,
      petId: 3,
      date: "2024-01-08",
      type: "checkup",
      description: "Routine health check",
      notes: "Minor respiratory concern noted",
    },
  ])

  const getHealthStatusColor = (status) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-100"
      case "good":
        return "text-blue-600 bg-blue-100"
      case "needs-attention":
        return "text-orange-600 bg-orange-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getReminderIcon = (type) => {
    switch (type) {
      case "feeding":
        return "🍽️"
      case "medication":
        return "💊"
      case "vet":
        return "🏥"
      case "grooming":
        return "✂️"
      default:
        return "📋"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Pet Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your pets' health, care, and activities</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Add New Pet
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
          <div className="grid grid-cols-5 gap-2 mb-6">
            <button
              className={`px-4 py-2 rounded-lg ${activeTab === "overview" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${activeTab === "pets" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setActiveTab("pets")}
            >
              My Pets
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${activeTab === "health" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setActiveTab("health")}
            >
              Health Records
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${activeTab === "reminders" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setActiveTab("reminders")}
            >
              Reminders
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${activeTab === "shopping" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setActiveTab("shopping")}
            >
              Shopping
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Total Pets</h3>
                      <Heart className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold">{pets.length}</div>
                    <p className="text-xs text-gray-500">Across {new Set(pets.map((p) => p.species)).size} species</p>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Upcoming Reminders</h3>
                      <Bell className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold">{reminders.filter((r) => !r.completed).length}</div>
                    <p className="text-xs text-gray-500">Tasks pending today</p>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Health Status</h3>
                      <Stethoscope className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {pets.filter((p) => p.healthStatus === "excellent").length}
                    </div>
                    <p className="text-xs text-gray-500">Pets in excellent health</p>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Recent Activity</h3>
                      <Activity className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold">{healthRecords.length}</div>
                    <p className="text-xs text-gray-500">Health records this month</p>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Today's Reminders */}
                <Card className="lg:col-span-2">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold flex items-center mb-4">
                      <Bell className="w-5 h-5 mr-2" />
                      Today's Reminders
                    </h3>
                    <div className="space-y-4">
                      {reminders
                        .filter((r) => !r.completed)
                        .slice(0, 4)
                        .map((reminder) => (
                          <div
                            key={reminder.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{getReminderIcon(reminder.type)}</span>
                              <div>
                                <p className="font-medium">{reminder.title}</p>
                                <p className="text-sm text-gray-600">
                                  {reminder.petName} • {reminder.time}
                                </p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Mark Done
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                </Card>

                {/* Calendar */}
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold flex items-center mb-4">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Calendar
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Calendar component would go here</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Pet Health Overview */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Pet Health Overview</h3>
                  <p className="text-gray-600 mb-4">Quick health status for all your pets</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {pets.map((pet) => (
                      <div key={pet.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Avatar src={pet.image} alt={pet.name} />
                        <div className="flex-1">
                          <h4 className="font-medium">{pet.name}</h4>
                          <p className="text-sm text-gray-600">{pet.breed}</p>
                          <Badge className={`text-xs ${getHealthStatusColor(pet.healthStatus)}`}>
                            {pet.healthStatus.replace("-", " ")}
                          </Badge>
                        </div>
                        {pet.healthStatus === "needs-attention" && <AlertCircle className="w-5 h-5 text-orange-500" />}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* My Pets Tab */}
          {activeTab === "pets" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <Card key={pet.id} className="overflow-hidden">
                  <div className="relative">
                    <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-48 object-cover" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button size="icon" variant="secondary" className="bg-white/80">
                        <Camera className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="bg-white/80">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <Badge className={`absolute top-4 left-4 ${getHealthStatusColor(pet.healthStatus)}`}>
                      {pet.healthStatus.replace("-", " ")}
                    </Badge>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{pet.name}</h3>
                      <span className="text-sm text-gray-500">{pet.age}</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {pet.breed} • {pet.species}
                    </p>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Weight</p>
                          <p className="font-medium">{pet.weight}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Last Fed</p>
                          <p className="font-medium">{pet.lastFed}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-600 text-sm mb-2">Next Vet Visit</p>
                        <p className="font-medium">{new Date(pet.nextVetVisit).toLocaleDateString()}</p>
                      </div>

                      {pet.medications.length > 0 && (
                        <div>
                          <p className="text-gray-600 text-sm mb-2">Current Medications</p>
                          <div className="flex flex-wrap gap-1">
                            {pet.medications.map((med, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {med}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button className="flex-1" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Stethoscope className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Health Records Tab */}
          {activeTab === "health" && (
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Health Records</h3>
                <p className="text-gray-600 mb-4">Track your pets' medical history and health milestones</p>
                <div className="space-y-4">
                  {healthRecords.map((record) => {
                    const pet = pets.find((p) => p.id === record.petId)
                    return (
                      <div key={record.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <Avatar src={pet?.image} alt={pet?.name} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{record.description}</h4>
                            <span className="text-sm text-gray-500">{new Date(record.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {pet?.name} • {record.type}
                          </p>
                          {record.notes && <p className="text-sm text-gray-700">{record.notes}</p>}
                        </div>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>
          )}

          {/* Reminders Tab */}
          {activeTab === "reminders" && (
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Smart Reminders</h3>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Reminder
                  </Button>
                </div>
                <p className="text-gray-600 mb-4">Never miss important pet care tasks</p>
                <div className="space-y-4">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`flex items-center justify-between p-4 border rounded-lg ${
                        reminder.completed ? "bg-gray-50 opacity-60" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{getReminderIcon(reminder.type)}</span>
                        <div>
                          <h4 className={`font-medium ${reminder.completed ? "line-through" : ""}`}>
                            {reminder.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {reminder.petName} • {reminder.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!reminder.completed && (
                          <Button size="sm" variant="outline">
                            Mark Complete
                          </Button>
                        )}
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Shopping Tab */}
          {activeTab === "shopping" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold flex items-center mb-4">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Reorder Reminders
                  </h3>
                  <p className="text-gray-600 mb-4">Based on your purchase history</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img src="/placeholder.svg?height=50&width=50" alt="Dog Food" className="w-12 h-12 rounded" />
                        <div>
                          <p className="font-medium">Premium Dog Food</p>
                          <p className="text-sm text-gray-600">Last ordered 3 weeks ago</p>
                          <Progress value={75} className="w-24 mt-1" />
                        </div>
                      </div>
                      <Button size="sm">Reorder</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img src="/placeholder.svg?height=50&width=50" alt="Cat Litter" className="w-12 h-12 rounded" />
                        <div>
                          <p className="font-medium">Cat Litter</p>
                          <p className="text-sm text-gray-600">Running low</p>
                          <Progress value={25} className="w-24 mt-1" />
                        </div>
                      </div>
                      <Button size="sm">Reorder</Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Personalized Recommendations</h3>
                  <p className="text-gray-600 mb-4">Products perfect for your pets</p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <img
                        src="/placeholder.svg?height=50&width=50"
                        alt="Interactive Toy"
                        className="w-12 h-12 rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">Interactive Puzzle Toy</p>
                        <p className="text-sm text-gray-600">Perfect for Max's intelligence level</p>
                        <p className="text-sm font-medium text-green-600">$24.99</p>
                      </div>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>

                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <img
                        src="/placeholder.svg?height=50&width=50"
                        alt="Grooming Brush"
                        className="w-12 h-12 rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">Persian Cat Grooming Brush</p>
                        <p className="text-sm text-gray-600">Ideal for Luna's long coat</p>
                        <p className="text-sm font-medium text-green-600">$19.99</p>
                      </div>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </Tabs>
      </div>
    </div>
  )
}
