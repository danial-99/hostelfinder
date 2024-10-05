import React from 'react'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'

export default function PhotoUpload() {
  return (
    <div className="space-y-2">
      <Label htmlFor="photos">Upload Photos</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
        <input type="file" id="photos" className="hidden" multiple accept="image/*" />
        <Plus className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-1 text-sm text-gray-600">Upload Images +</p>
      </div>
    </div>
  )
}