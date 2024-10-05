import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  MapPin,
  Users,
  AirVent,
  Utensils,
  Wifi,
  Calendar,
  Shirt,
  BedDouble,
  Bath,
} from "lucide-react";
import Image from "next/image";
import ImageViewer from "@/components/user/specificHostel/ImageViewer";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";

const amenities = [
  { icon: AirVent, label: "AC/Heater" },
  { icon: Utensils, label: "Kitchen" },
  { icon: Wifi, label: "Wifi" },
  { icon: Calendar, label: "Flexible Stay" },
  { icon: Shirt, label: "Laundry" },
  { icon: BedDouble, label: "Single Bed" },
  { icon: Bath, label: "Bath" },
];

const reviews = [
  {
    id: 1,
    name: "Antony Lukas",
    avatar: "/Avatar2.png",
    date: "2 days ago",
    rating: 5,
    comment:
      "The hostel is clean, secure, and conveniently located. The staff is friendly and always ready to help. A great place for any girl looking for accommodation!",
    images: ["/room2.png", "/room2.png", "/room2.png"],
  },
  {
    id: 2,
    name: "Antony Lukas",
    avatar: "/Avatar2.png",
    date: "2 days ago",
    rating: 5,
    comment:
      "The hostel is clean, secure, and conveniently located. The staff is friendly and always ready to help. A great place for any girl looking for accommodation!",
    images: ["/room2.png", "/room2.png", "/room2.png"],
  },
];

export default function HostelDetails() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        <Card className='bg-gray-900 text-white overflow-hidden'>
          <CardContent className='p-6'>
            <div className='flex flex-col lg:flex-row gap-6'>
              <ImageViewer />
              <div className='lg:w-2/3'>
                <h1 className='text-3xl font-bold mb-2'>Samel Girls Hostel</h1>
                <div className='flex items-center mb-4'>
                  <MapPin className='w-4 h-4 mr-2' />
                  <span>7th Road Rawalpindi</span>
                </div>
                <p className='mb-4'>
                  A girls hostel is a residential accommodation facility
                  designed specifically for female students or working
                  professionals. It provides a safe, comfortable, and supportive
                  living environment for women who are pursuing their education
                  or careers away from home. Girls' hostels typically offer
                  shared or private rooms, common areas for socializing and
                  studying, and various amenities to ensure a comfortable stay.
                </p>
                <div className='flex items-center mb-4'>
                  <div className='flex'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className='w-4 h-4 text-yellow-400 fill-current'
                      />
                    ))}
                  </div>
                  <span className='ml-2'>5.0 rating | 12 Awesome Question</span>
                </div>
                <div className='flex items-center space-x-4 mb-4'>
                  <div className='flex items-center'>
                    <Users className='w-4 h-4 mr-2' />
                    <span>2 beds</span>
                  </div>
                  <div className='flex items-center'>
                    <Bath className='w-4 h-4 mr-2' />
                    <span>Shared bath</span>
                  </div>
                  <div className='flex items-center'>
                    <MapPin className='w-4 h-4 mr-2' />
                    <span>250 sqft</span>
                  </div>
                </div>
                <div className='mt-6'>
                  <h2 className='text-xl font-semibold mb-4'>Facilities</h2>
                  <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4'>
                    {amenities.map((amenity, index) => (
                      <div key={index} className='flex flex-col items-center'>
                        <amenity.icon className='w-8 h-8 mb-2' />
                        <span className='text-sm text-center'>
                          {amenity.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='mt-6 flex flex-col sm:flex-row gap-4'>
                  <Button className='w-full sm:w-auto flex-grow' size='lg'>
                    Book Now
                  </Button>
                  <Button
                    variant='outline'
                    className='w-full sm:w-auto flex-grow text-secondary'
                    size='lg'
                  >
                    Contact Host
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className='mt-12'>
          <h2 className='text-2xl font-bold mb-6'>Ratings & Reviews</h2>
          <div className='space-y-8'>
            {reviews.map((review) => (
              <div key={review.id} className='border-b pb-8'>
                <div className='flex items-center mb-4'>
                  <Avatar className='w-12 h-12 mr-4'>
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className=''>
                      <div className='flex justify-start items-center gap-x-3'>
                        <h3 className='font-semibold'>{review.name}</h3>
                        <div className='flex'>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              } fill-current`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className='text-muted-foreground'>
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className='mb-4'>{review.comment}</p>
                <div className='flex space-x-2'>
                  {review.images.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`Review image ${index + 1}`}
                      width={100}
                      height={100}
                      className='w-24 h-24 object-cover rounded'
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='my-12'>
          <h2 className='text-2xl font-bold mb-6'>Hostel Details</h2>
          <p>
            A hostel is a budget-oriented shared-room ("dormitory")
            accommodation that accepts individual travelers (typically
            backpackers) or groups for short-term stays, and that provides
            common areas and communal facilities. To be considered a hostel, the
            property must provide short-term, shared (dormitory style)
            accommodation to individual travellers, even if private rooms are
            also provided. The typical hostel format involves guests renting a
            bed, usually a bunk bed, in a dormitory. Other hostel amenities
            might include a common area, kitchen facilities, lockers and washing
            machines. Hostels are generally cheaper for both the operator and
            occupants; many hostels employ their long-term residents as desk
            clerks or housekeeping staff in exchange for free accommodation.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
