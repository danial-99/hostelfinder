import React from 'react'
import { Camera } from 'lucide-react'

export default function ProfileUpload() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
        <Camera className="w-8 h-8 text-gray-500" />
      </div>
      <span className="mt-2 text-sm text-gray-600">Upload Profile</span>
    </div>
  )
}