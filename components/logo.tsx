import { Building2 } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }

  return (
    <div className="flex items-center space-x-3">
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center relative shadow-lg`}
      >
        <Building2 className={`${size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-10 h-10"} text-white`} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>
      </div>
      {showText && (
        <div>
          <h1 className={`${textSizeClasses[size]} font-bold text-gray-900`}>3 Irmãos</h1>
          <p className="text-sm text-blue-600 -mt-1 font-medium">Imobiliária</p>
        </div>
      )}
    </div>
  )
}
