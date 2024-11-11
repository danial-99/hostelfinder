'use client'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MapPin, Home, CookingPot, LandPlot, Shield, Wifi, Car } from 'lucide-react'
import { useEffect, useState } from "react"
import Image from "next/image"
import { approveHostel, getHostels, rejectHostel } from "../../../actions/dashboard/getHostels"
import { sendApprovalEmail, sendRejectionEmail } from "../../../actions/nodemailer/emailTemplates"

// Types
type Hostel = {
  id: string
  name: string
  type: string
  location: string
  rooms: number
  kitchen: number
  area: string
  security: boolean
  wifi: boolean
  parking: boolean
  image: string
}

// HostelRequestCard Component
const HostelRequestCard: React.FC<{ hostel: Hostel; onAccept: () => void; onReject: () => void }> = ({ hostel, onAccept, onReject }) => {
  return (
    <Card className="w-full mb-6 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Image unoptimized width={0} height={0} src={hostel.image} alt={hostel.name} className="w-full h-48 md:h-full object-cover" />
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4 p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">{hostel.name}</h2>
                <p className="text-gray-500">{hostel.type}</p>
              <div className="flex items-center mt-2 md:mt-0">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                <span className="text-sm text-gray-500">{hostel.location}</span>
              </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      <span>{hostel.rooms} Rooms</span>
                    </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
                      <LandPlot className="w-4 h-4" />
                      <span>{hostel.area}</span>
                    </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
                      <CookingPot className="w-4 h-4" />
                      <span>{hostel.kitchen} Kitchen</span>
                    </Badge>
              {hostel.security && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Security</span>
                </Badge>
              )}
              {hostel.wifi && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Wifi className="w-4 h-4" />
                  <span>Wifi</span>
                </Badge>
              )}
              {hostel.parking && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Car className="w-4 h-4" />
                  <span>Parking</span>
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 p-4 bg-white">
        <Button variant="destructive" onClick={onReject}>Reject</Button>
        <Button onClick={onAccept}>Accept</Button>
      </CardFooter>
    </Card>
  )
}

// NewRequests Component
const NewRequests: React.FC = () => {
  const [requests, setRequests] = useState<Hostel[]>([
    {
      id: '1',
      name: 'Akasia Hostel',
      type: 'Boys Hostel',
      location: 'Figueroa, Los Angeles',
      rooms: 12,
      kitchen: 2,
      area: '66x78 m²',
      security: true,
      wifi: true,
      parking: true,
      image: '/room1.png'
    },
    {
      id: '2',
      name: 'Sunflower Hostel',
      type: 'Girls Hostel',
      location: 'Downtown, New York',
      rooms: 15,
      kitchen: 3,
      area: '70x80 m²',
      security: true,
      wifi: true,
      parking: false,
      image: '/room1.png'
    },
    {
      id: '3',
      name: 'Pine Tree Lodge',
      type: 'Mixed Hostel',
      location: 'Westwood, Los Angeles',
      rooms: 20,
      kitchen: 4,
      area: '80x90 m²',
      security: true,
      wifi: true,
      parking: true,
      image: '/room1.png'
    }
  ])
  const [requestsHostels, setRequestsHostels] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHostels('pending');
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch hostels:", error);
      }
    };
    fetchData();
  }, []);

  const handleAccept = async (id: string) => {
    try {
      const response = await approveHostel(id);
      console.log("Hostel approved:", response.data);
      if (response.success) {
        await sendApprovalEmail(response.ownerEmail);
      } else {
        console.error("Failed to approve hostel:", response.message);
      }
    } catch (error) {
      console.error("Error approving hostel:", error);
    }
  }

  const handleReject = async (id: string) => {
    try {
      const response = await rejectHostel(id);

      if (response.success) {
        console.log(`Successfully rejected booking request ${id}`);
        await sendRejectionEmail(response.ownerEmail);
      } else {
        console.error(`Failed to reject booking request ${id}:`, response.message);
      }
    } catch (error) {
      console.error("Error rejecting booking request:", error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">New Hostel Requests</h1>
      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No new requests at the moment.</p>
      ) : (
        requests.map(request => (
          <HostelRequestCard
            key={request.id}
            hostel={request}
            onAccept={() => handleAccept(request.id)}
            onReject={() => handleReject(request.id)}
          />
        ))
      )}
    </div>
  )
}

export default NewRequests