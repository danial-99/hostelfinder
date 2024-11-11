'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { getHostels } from "../../../actions/dashboard/getHostels";

const hostels = [
  { id: 1, name: "Capital Boys Hostel", rating: 4.5, image: "/room.jpg" },
  { id: 2, name: "Capital Boys Hostel", rating: 4.2, image: "/room.jpg" },
  { id: 3, name: "Capital Boys Hostel", rating: 4.8, image: "/room.jpg" },
];

export default function TopRatedHostels() {
  
  const fetchHotels =  async () => {
    try{
      const data = await getHostels();
      console.log(data)
    }catch(error){
      console.error('Error fetching hotels:', error);
    }
  }
  useEffect(()=>{
    fetchHotels();
  },[])
  return (
    <section className='py-12'>
      <div className='container'>
        <h2 className='text-3xl font-bold mb-6'>Top Rated Hostels</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {hostels.map((hostel) => (
            <Card key={hostel.id}>
              <CardHeader className='p-0'>
                <Image
                  unoptimized
                  width={0}
                  height={0}
                  src={hostel.image}
                  alt={hostel.name}
                  className='w-full h-48 object-cover'
                />
              </CardHeader>
              <CardContent className='p-4'>
                <CardTitle>{hostel.name}</CardTitle>
                <div className='flex items-center mt-2'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(hostel.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className='ml-2 text-sm text-gray-600'>
                    {hostel.rating}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
