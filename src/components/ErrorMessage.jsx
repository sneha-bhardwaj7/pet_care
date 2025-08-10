import React from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import Button from './Button'

const ErrorMessage = ({ 
  error, 
  onRetry, 
  showHomeButton = false, 
  className = '',
  title = 'Oops! Something went wrong'
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      {/* Error Icon with Animation */}
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        
        {/* Sad pet face overlay */}
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
          <span className="text-lg">😿</span>
        </div>
      </div>

      {/* Error Content */}
      <div className="max-w-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {error || 'We encountered an issue while fetching your data. Please try again or contact support if the problem persists.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <Button 
              onClick={onRetry}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          
          {showHomeButton && (
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          )}
        </div>

        {/* Helpful Tips */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Helpful Tips:</h4>
          <ul className="text-xs text-blue-700 space-y-1 text-left">
            <li>• Check your internet connection</li>
            <li>• Try refreshing the page</li>
            <li>• Clear your browser cache</li>
            <li>• Contact support if the issue persists</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage
