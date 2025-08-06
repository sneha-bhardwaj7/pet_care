"use client"

import { useState } from "react"
import { Plus, Bell, Clock, Calendar, Settings, Trash2, Edit, Check } from "lucide-react"
import Button from "../components/Button"
import Card from "../components/Card"
import Badge from "../components/Badge"
import Input from "../components/Input"
import Select from "../components/Select"
import { reminderTypes, remindersData } from "../data/reminders"
import { petsData } from "../data/pets"

export default function SmartRemindersPage() {
  const [reminders, setReminders] = useState(remindersData)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newReminder, setNewReminder] = useState({
    type: "",
    title: "",
    petId: "",
    time: "",
    frequency: "daily",
    priority: "medium",
    notes: "",
  })

  const handleCreateReminder = () => {
    if (newReminder.type && newReminder.title && newReminder.petId) {
      const pet = petsData.find((p) => p.id === Number.parseInt(newReminder.petId))
      const reminderType = reminderTypes.find((t) => t.type === newReminder.type)

      const reminder = {
        id: Date.now(),
        ...newReminder,
        petName: pet?.name,
        completed: false,
        recurring: true,
      }

      setReminders([...reminders, reminder])
      setNewReminder({
        type: "",
        title: "",
        petId: "",
        time: "",
        frequency: "daily",
        priority: "medium",
        notes: "",
      })
      setShowCreateForm(false)
    }
  }

  const handleCompleteReminder = (id) => {
    setReminders(reminders.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)))
  }

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter((r) => r.id !== id))
  }

  const getReminderIcon = (type) => {
    const reminderType = reminderTypes.find((t) => t.type === type)
    return reminderType?.icon || "📋"
  }

  const getReminderColor = (type) => {
    const reminderType = reminderTypes.find((t) => t.type === type)
    return reminderType?.color || "bg-gray-500"
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const upcomingReminders = reminders.filter((r) => !r.completed)
  const completedReminders = reminders.filter((r) => r.completed)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Reminders
              </h1>
              <p className="text-gray-600 mt-1">Never miss important pet care tasks</p>
            </div>
            <Button onClick={() => setShowCreateForm(true)} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Reminder
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Overdue</p>
                  <p className="text-3xl font-bold">2</p>
                </div>
                <Bell className="w-8 h-8 text-red-200" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Today</p>
                  <p className="text-3xl font-bold">
                    {upcomingReminders.filter((r) => r.time.includes("PM") || r.time.includes("AM")).length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-200" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">This Week</p>
                  <p className="text-3xl font-bold">{upcomingReminders.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-200" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Completed</p>
                  <p className="text-3xl font-bold">{completedReminders.length}</p>
                </div>
                <Check className="w-8 h-8 text-green-200" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Reminder Form */}
          {showCreateForm && (
            <div className="lg:col-span-3 mb-8">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Create New Reminder</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Reminder Type</label>
                      <Select
                        value={newReminder.type}
                        onChange={(value) => setNewReminder({ ...newReminder, type: value })}
                      >
                        <option value="">Select type...</option>
                        {reminderTypes.map((type) => (
                          <option key={type.id} value={type.type}>
                            {type.icon} {type.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Pet</label>
                      <Select
                        value={newReminder.petId}
                        onChange={(value) => setNewReminder({ ...newReminder, petId: value })}
                      >
                        <option value="">Select pet...</option>
                        {petsData.map((pet) => (
                          <option key={pet.id} value={pet.id}>
                            {pet.name} ({pet.species})
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        placeholder="e.g., Morning medication"
                        value={newReminder.title}
                        onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Time</label>
                      <Input
                        placeholder="e.g., 8:00 AM"
                        value={newReminder.time}
                        onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Frequency</label>
                      <Select
                        value={newReminder.frequency}
                        onChange={(value) => setNewReminder({ ...newReminder, frequency: value })}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Priority</label>
                      <Select
                        value={newReminder.priority}
                        onChange={(value) => setNewReminder({ ...newReminder, priority: value })}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Notes</label>
                      <Input
                        placeholder="Additional notes or instructions..."
                        value={newReminder.notes}
                        onChange={(e) => setNewReminder({ ...newReminder, notes: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-4 mt-6">
                    <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateReminder}>Create Reminder</Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Upcoming Reminders */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-blue-600" />
                  Upcoming Reminders
                </h3>
                <div className="space-y-4">
                  {upcomingReminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${getReminderColor(reminder.type)}`}
                        >
                          <span className="text-xl">{getReminderIcon(reminder.type)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{reminder.title}</h4>
                            <Badge className={getPriorityColor(reminder.priority)}>{reminder.priority}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {reminder.petName} • {reminder.time}
                          </p>
                          {reminder.notes && <p className="text-xs text-gray-500 mt-1">{reminder.notes}</p>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleCompleteReminder(reminder.id)}>
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteReminder(reminder.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Reminder Types */}
          <div>
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-purple-600" />
                  Reminder Types
                </h3>
                <div className="space-y-3">
                  {reminderTypes.map((type) => (
                    <div key={type.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${type.color}`}
                        >
                          <span className="text-sm">{type.icon}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{type.name}</p>
                          <p className="text-xs text-gray-500">{type.defaultFrequency}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {reminders.filter((r) => r.type === type.type).length}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Completed Reminders */}
            <Card className="mt-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-600" />
                  Recently Completed
                </h3>
                <div className="space-y-3">
                  {completedReminders.slice(0, 5).map((reminder) => (
                    <div
                      key={reminder.id}
                      className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg opacity-75"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                        <Check className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm line-through">{reminder.title}</p>
                        <p className="text-xs text-gray-600">{reminder.petName}</p>
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
