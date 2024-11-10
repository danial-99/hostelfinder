
// Mark this as a Client Component
"use client";

import BookingRequestCard from '@/components/admin/BookingRequestCard';
import { useEffect, useState } from 'react';
import { getHostels } from '../../../../../actions/dashboard/getHostels';


const bookingRequests = [
  {
    id: 1,
    hostelName: 'Akasia Hosteadasdal',
    hostelType: 'Boys Hostel',
    location: 'Figueroa, Los Angeles',
    rooms: 12,
    kitchens: 2,
    size: '66x78 m²',
    amenities: ['Security', 'Wifi', 'Parking'],
    imageUrl: '/room.jpg',
  },
  {
    id: 2,
    hostelName: 'Akasia Hostel',
    hostelType: 'Boys Hostel',
    location: 'Figueroa, Los Angeles',
    rooms: 12,
    kitchens: 2,
    size: '66x78 m²',
    amenities: ['Security', 'Wifi', 'Parking'],
    imageUrl: '/room1.png',
  },
]

async function fetchHostels() {
  const response = await getHostels(true);
  return response.data;
}

export default function BookingRequestsPage() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHostels();
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch hostels:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {bookingRequests?.map((request) => (
        <BookingRequestCard key={request.id} {...request} />
      ))}
    </div>
  );
}

