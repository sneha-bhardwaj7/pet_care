"use client"
import { Check } from "lucide-react"

const Checkbox = ({ checked = false, onChange, className = "", ...props }) => {
  return (
    <div className="relative">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" {...props} />
      <div
        className={`h-4 w-4 shrink-0 rounded-sm border border-gray-300 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
          checked ? "bg-blue-600 text-white" : "bg-white"
        } ${className}`}
        onClick={() => onChange && onChange(!checked)}
      >
        {checked && <Check className="h-4 w-4 text-white" />}
      </div>
    </div>
  )
}

export default Checkbox
