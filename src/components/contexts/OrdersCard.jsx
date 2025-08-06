"use client"

import { Package, Truck, CheckCircle, Clock, MapPin, Calendar, Eye, RotateCcw, ShoppingCart, X } from "lucide-react"

const OrdersCard = ({ order, onTrackOrder, onCancelOrder, onReturnOrder, onBuyAgain }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-orange-500" />
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />
      case "cancelled":
        return <X className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50 border-green-200"
      case "shipped":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "processing":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Order Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Order #{order.orderNumber}</p>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(
                    order.orderDate?.seconds ? order.orderDate.seconds * 1000 : order.orderDate,
                  ).toLocaleDateString()}
                </div>
                {order.shippingAddress?.city && (
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {order.shippingAddress.city}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}
            >
              {getStatusIcon(order.status)}
              <span className="ml-2 capitalize">{order.status}</span>
            </span>
            <span className="text-lg font-semibold text-gray-900">₹{order.totalAmount}</span>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="px-6 py-4">
        <div className="space-y-4">
          {order.items?.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={item.image || "/placeholder.svg?height=80&width=80"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {item.size && `Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                </p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Actions */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {order.status === "delivered" && order.deliveryDate && (
              <span className="text-green-600">
                Delivered on{" "}
                {new Date(
                  order.deliveryDate?.seconds ? order.deliveryDate.seconds * 1000 : order.deliveryDate,
                ).toLocaleDateString()}
              </span>
            )}
            {order.status === "shipped" && order.expectedDelivery && (
              <span className="text-orange-600">
                Expected delivery:{" "}
                {new Date(
                  order.expectedDelivery?.seconds ? order.expectedDelivery.seconds * 1000 : order.expectedDelivery,
                ).toLocaleDateString()}
              </span>
            )}
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
            <button
              onClick={() => onTrackOrder(order.id)}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
            >
              <Eye className="w-4 h-4" />
              Track Order
            </button>
            {order.status === "delivered" && (
              <>
                <button
                  onClick={() => onReturnOrder(order.id)}
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Return
                </button>
                <button
                  onClick={() => onBuyAgain(order.items)}
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy Again
                </button>
              </>
            )}
            {order.status === "processing" && (
              <button
                onClick={() => onCancelOrder(order.id)}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersCard
