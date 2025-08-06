"use client"

const Slider = ({ min = 0, max = 100, step = 1, value = [0, 100], onChange, className = "", ...props }) => {
  const handleChange = (index, newValue) => {
    const newValues = [...value]
    newValues[index] = Number.parseInt(newValue)
    onChange(newValues)
  }

  return (
    <div className={`relative flex w-full touch-none select-none items-center ${className}`} {...props}>
      <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
        <div
          className="absolute h-full bg-blue-600"
          style={{
            left: `${((value[0] - min) / (max - min)) * 100}%`,
            width: `${((value[1] - value[0]) / (max - min)) * 100}%`,
          }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => handleChange(0, e.target.value)}
        className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer"
        style={{ zIndex: 1 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={(e) => handleChange(1, e.target.value)}
        className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer"
        style={{ zIndex: 2 }}
      />
    </div>
  )
}

export default Slider
