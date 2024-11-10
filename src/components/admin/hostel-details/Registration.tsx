'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDropzone } from 'react-dropzone'
import { X, Upload, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { createHostel } from '../../../../actions/dashboard/createHostel'

interface HostelFormData {
  hostelName: string;
  ownerName: string;
  email: string;
  country: string;
  province: string;
  city: string;
  zipCode: string;
  hostelType: string;
  cnic: string;
  description: string;
  phoneNumber: string;
  userId: string;
}

interface RoomFormData {
  totalRooms: number;
  totalBeds: number;
  hasOneBedRooms: boolean;
  hasTwoBedRooms: boolean;
  hasThreeBedRooms: boolean;
  hasFourBedRooms: boolean;
  oneBedRoomPrice: number;
  twoBedRoomPrice: number;
  threeBedRoomPrice: number;
  fourBedRoomPrice: number;
  paymentMethods: string[];
}

interface FacilitiesData {
  [key: string]: boolean;
}

interface ImageUploadData {
  logo: File | null;
  hostelImages: File[];
}

export default function HostelRegistrationForm() {
  const local = localStorage.getItem('auth');
  const {user} = local ? JSON.parse(local) : null;
  const [step, setStep] = useState(1);
  const [hostelData, setHostelData] = useState<HostelFormData>({
    hostelName: '',
    ownerName: '',
    email: '',
    country: '',
    province: '',
    city: '',
    zipCode: '',
    hostelType: '',
    cnic: '',
    description: '',
    phoneNumber: '',
    userId: user?.id,
  });

  const [roomData, setRoomData] = useState<RoomFormData>({
    totalRooms: 0,
    totalBeds: 0,
    hasOneBedRooms: false,
    hasTwoBedRooms: false,
    hasThreeBedRooms: false,
    hasFourBedRooms: false,
    oneBedRoomPrice: 0,
    twoBedRoomPrice: 0,
    threeBedRoomPrice: 0,
    fourBedRoomPrice: 0,
    paymentMethods: []
  });

  const [facilitiesData, setFacilitiesData] = useState<FacilitiesData>({
    security: false,
    internet: false,
    electricity24_7: false,
    mattressAvailable: false,
    cleanWater: false,
    geyser: false,
    iron: false,
    library: false,
    balcony: false,
    terrace: false,
    meals3Times: false,
    laundry: false,
    playground: false,
    roomCleaning: false,
    smokingZone: false,
    airConditioning: false,
    freeWiFi: false,
    breakfastIncluded: false,
    linenIncluded: false,
    towelsIncluded: false,
    freeCityMaps: false,
    hotShowers: false,
    security24Hours: false,
    keyCardAccess: false,
    luggageStorage: false,
    lockers: false,
    commonRoom: false,
    swimmingPool: false,
    bar: false,
    poolTable: false,
    kitchen: false,
    cooker: false,
    vendingMachines: false,
    washingMachine: false,
    readingLight: false,
  });

  const [imageUploadData, setImageUploadData] = useState<ImageUploadData>({
    logo: null,
    hostelImages: []
  });

  const handleHostelInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHostelData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleHostelSelectChange = (name: keyof HostelFormData, value: string) => {
    setHostelData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRoomInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRoomData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setRoomData(prevData => ({
      ...prevData,
      paymentMethods: prevData.paymentMethods.includes(method)
        ? prevData.paymentMethods.filter(m => m !== method)
        : [...prevData.paymentMethods, method]
    }));
  };

  const handleFacilityChange = (facility: string, checked: boolean) => {
    setFacilitiesData(prev => ({
      ...prev,
      [facility]: checked
    }));
  };

  const handleImageUpload = (files: File[], type: 'logo' | 'hostelImages') => {
    if (type === 'hostelImages') {
      setImageUploadData(prev => ({
        ...prev,
        [type]: [...prev.hostelImages, ...files]
      }));
    } else {
      setImageUploadData(prev => ({
        ...prev,
        [type]: files[0]
      }));
    }
  };

  const handleRemoveImage = (type: 'logo' | 'hostelImages', index?: number) => {
    if (type === 'hostelImages' && typeof index === 'number') {
      setImageUploadData(prev => ({
        ...prev,
        hostelImages: prev.hostelImages.filter((_, i) => i !== index)
      }));
    } else {
      setImageUploadData(prev => ({
        ...prev,
        [type]: null
      }));
    }
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step < 5) {
      // Move to the next step
      setStep(prev => prev + 1);
    } else {
      // Prepare the selected facilities for submission
      const selectedFacilities = Object.entries(facilitiesData)
        .filter(([_, value]) => value)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      // Prepare form data to send to the backend
      const formData = new FormData();
      formData.append("hostelData", JSON.stringify(hostelData));
      formData.append("roomData", JSON.stringify(roomData));
      formData.append("facilitiesData", JSON.stringify(selectedFacilities));
      formData.append("imageUploadData", JSON.stringify(imageUploadData));

      try {
        // Make the API call to the backend
        const response = await createHostel(formData);
        console.log(response)

        if (response.success) {
          // Handle success
          alert("Hostel registration submitted successfully!");
          console.log("Response data:", response.data);
        } else {
          // Handle error
          alert(`Error: ${response.message}`);
          console.error("Error:", response.error);
        }
      } catch (error) {
        // Handle network errors
        alert("An error occurred. Please try again later.");
        console.error("Error:", error);
      }
    }
  };
  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const logoDropzone = useDropzone({
    accept: {'image/*': []},
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles, 'logo')
  });

  const hostelImagesDropzone = useDropzone({
    accept: {'image/*': []},
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles, 'hostelImages'),
    multiple: true
  });

  const renderHostelRegistrationStep = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="hostelName">Hostel Name</Label>
        <Input
          id="hostelName"
          name="hostelName"
          value={hostelData.hostelName}
          onChange={handleHostelInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="ownerName">Hostel Owner Name</Label>
        <Input
          id="ownerName"
          name="ownerName"
          value={hostelData.ownerName}
          onChange={handleHostelInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={hostelData.email}
          onChange={handleHostelInputChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Select name="country" onValueChange={(value) => handleHostelSelectChange('country', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pakistan">Pakistan</SelectItem>
              <SelectItem value="india">India</SelectItem>
              <SelectItem value="bangladesh">Bangladesh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="province">Province</Label>
          <Select name="province" onValueChange={(value) => handleHostelSelectChange('province', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="punjab">Punjab</SelectItem>
              <SelectItem value="sindh">Sindh</SelectItem>
              <SelectItem value="kpk">Khyber Pakhtunkhwa</SelectItem>
              <SelectItem value="balochistan">Balochistan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={hostelData.city}
            onChange={handleHostelInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="zipCode">Zip/Postal Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={hostelData.zipCode}
            onChange={handleHostelInputChange}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="hostelType">Hostel Type</Label>
        <Select name="hostelType" onValueChange={(value) => handleHostelSelectChange('hostelType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select hostel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="cnic">CNIC Number</Label>
        <Input
          id="cnic"
          name="cnic"
          value={hostelData.cnic}
          onChange={handleHostelInputChange}
          required
          placeholder="XXXXX-XXXXXXX-X"
        />
      </div>

      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={hostelData.phoneNumber}
          onChange={handleHostelInputChange}
          required
          placeholder="+92 XXX XXXXXXX"
        />
      </div>

      <div>
        <Label htmlFor="description">Hostel Description</Label>
        <Textarea
          id="description"
          name="description"
          value={hostelData.description}
          onChange={handleHostelInputChange}
          rows={4}
        />
      </div>
    </div>
  );

  const renderRoomDetailsStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="totalRooms">Total Number of Rooms</Label>
          <Input
            id="totalRooms"
            name="totalRooms"
            type="number"
            value={roomData.totalRooms}
            onChange={handleRoomInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="totalBeds">Total Number of Beds</Label>
          <Input
            id="totalBeds"
            name="totalBeds"
            type="number"
            value={roomData.totalBeds}
            onChange={handleRoomInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Room Types Available</Label>
        <div className="flex space-x-4">
          <Checkbox
            id="hasOneBedRooms"
            name="hasOneBedRooms"
            checked={roomData.hasOneBedRooms}
            onCheckedChange={(checked) => setRoomData(prev => ({ ...prev, hasOneBedRooms: checked as boolean }))}
          />
          <Label htmlFor="hasOneBedRooms">1-Bed Rooms</Label>
        </div>
        <div className="flex space-x-4">
          <Checkbox
            id="hasTwoBedRooms"
            name="hasTwoBedRooms"
            checked={roomData.hasTwoBedRooms}
            onCheckedChange={(checked) => setRoomData(prev => ({ ...prev, hasTwoBedRooms: checked as boolean }))}
          />
          <Label htmlFor="hasTwoBedRooms">2-Bed Rooms</Label>
        </div>
        <div className="flex space-x-4">
          <Checkbox
            id="hasThreeBedRooms"
            name="hasThreeBedRooms"
            checked={roomData.hasThreeBedRooms}
            onCheckedChange={(checked) => setRoomData(prev => ({ ...prev, hasThreeBedRooms: checked as boolean }))}
          />
          <Label htmlFor="hasThreeBedRooms">3-Bed Rooms</Label>
        </div>
        <div className="flex space-x-4">
          <Checkbox
            id="hasFourBedRooms"
            name="hasFourBedRooms"
            checked={roomData.hasFourBedRooms}
            onCheckedChange={(checked) => setRoomData(prev => ({ ...prev, hasFourBedRooms: checked as boolean }))}
          />
          <Label htmlFor="hasFourBedRooms">4-Bed Rooms</Label>
        </div>
      </div>

      {roomData.hasOneBedRooms && <div>
          <Label htmlFor="oneBedRoomPrice">Price for 1-Bed Room</Label>
          <Input
            id="oneBedRoomPrice"
            name="oneBedRoomPrice"
            type="number"
            value={roomData.oneBedRoomPrice}
            onChange={handleRoomInputChange}
            required
          />
        </div>
      }

      {roomData.hasTwoBedRooms &&
        <div>
          <Label htmlFor="twoBedRoomPrice">Price for 2-Bed Room</Label>
          <Input
            id="twoBedRoomPrice"
            name="twoBedRoomPrice"
            type="number"
            value={roomData.twoBedRoomPrice}
            onChange={handleRoomInputChange}
            required
          />
        </div>
      }

      {roomData.hasThreeBedRooms &&
        <div>
          <Label htmlFor="threeBedRoomPrice">Price for 3-Bed Room</Label>
          <Input
            id="threeBedRoomPrice"
            name="threeBedRoomPrice"
            type="number"
            value={roomData.threeBedRoomPrice}
            onChange={handleRoomInputChange}
            required
          />
        </div>
      }

      {roomData.hasFourBedRooms &&
        <div>
          <Label htmlFor="fourBedRoomPrice">Price for 4-Bed Room</Label>
          <Input
            id="fourBedRoomPrice"
            name="fourBedRoomPrice"
            type="number"
            value={roomData.fourBedRoomPrice}
            onChange={handleRoomInputChange}
            required
          />
        </div>
      }

      <div>
        <Label>Payment Methods</Label>
        <div className="space-y-2">
          {['cash', 'easypaisa', 'jazzcash', 'card'].map((method) => (
            <div key={method} className="flex items-center space-x-2">
              <Checkbox
                id={method}
                checked={roomData.paymentMethods.includes(method)}
                onCheckedChange={() => handlePaymentMethodChange(method)}
              />
              <Label htmlFor={method}>{method.charAt(0).toUpperCase() + method.slice(1)}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFacilitiesStep = () => (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Facilities</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Select the facilities available at your hostel.
        </p>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(facilitiesData).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={(checked) => handleFacilityChange(key, checked as boolean)}
                className="peer"
              />
              <Label
                htmlFor={key}
                className="peer-hover:text-primary transition-all duration-200 ease-in-out peer-checked:font-bold"
              >
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderImageUploadStep = () => {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upload Images</h3>
          <div className="space-y-6">
            <div>
              <Label htmlFor="logo">Hostel Logo (Optional)</Label>
              <div {...logoDropzone.getRootProps()} className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-gray-400 transition-colors">
                <input {...logoDropzone.getInputProps()} />
                {imageUploadData.logo ? (
                  <div className="flex items-center justify-center">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={URL.createObjectURL(imageUploadData.logo)} alt="Logo" />
                      <AvatarFallback>Logo</AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage('logo');
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="mb-2">Drag 'n' drop your logo here, or choose an option:</p>
                    <div className="flex justify-center space-x-4">
                      <Button type="button" onClick={() => document.getElementById('logo-upload')?.click()}>
                        Upload from Device
                      </Button>
                      <Button type="button" onClick={() => alert("Open camera functionality to be implemented")}>
                        Take Photo
                      </Button>
                    </div>
                    <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={(e) => {
                      if (e.target.files) handleImageUpload(Array.from(e.target.files), 'logo');
                    }} />
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="hostelImages">Hostel Images</Label>
              <div {...hostelImagesDropzone.getRootProps()} className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-gray-400 transition-colors">
                <input {...hostelImagesDropzone.getInputProps()} />
                <p className="mb-2">Drag 'n' drop hostel images here, or choose an option:</p>
                <div className="flex justify-center space-x-4">
                  <Button type="button" onClick={() => document.getElementById('hostel-images-upload')?.click()}>
                    Upload from Device
                  </Button>
                  <Button type="button" onClick={() => alert("Open camera functionality to be implemented")}>
                    Take Photos
                  </Button>
                </div>
                <input id="hostel-images-upload" type="file" accept="image/*" multiple className="hidden" onChange={(e) => {
                  if (e.target.files) handleImageUpload(Array.from(e.target.files), 'hostelImages');
                }} />
              </div>
              {imageUploadData.hostelImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {imageUploadData.hostelImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Hostel ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1"
                        onClick={() => handleRemoveImage('hostelImages', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSummaryStep = () => (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-6 text-center">Summary</h3>
       
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          {imageUploadData.logo ? (
            <Avatar className="w-32 h-32">
              <AvatarImage src={URL.createObjectURL(imageUploadData.logo)} alt="Hostel Logo" />
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column: Uploaded Images Carousel */}
          <div>
            <h4 className="font-semibold mb-4">Uploaded Images</h4>
            {imageUploadData.hostelImages.length > 0 ? (
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {imageUploadData.hostelImages.map((file, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div className="flex aspect-square items-center justify-center p-6">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Hostel ${index + 1}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <p className="text-muted-foreground">No images uploaded</p>
            )}
          </div>

          {/* Right Column: Submitted Data */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Hostel Information</h4>
              <p><span className="font-medium">Name:</span> {hostelData.hostelName}</p>
              <p><span className="font-medium">Owner:</span> {hostelData.ownerName}</p>
              <p><span className="font-medium">Email:</span> {hostelData.email}</p>
              <p><span className="font-medium">Phone:</span> {hostelData.phoneNumber}</p>
              <p><span className="font-medium">Location:</span> {hostelData.city}, {hostelData.province}, {hostelData.country}</p>
              <p><span className="font-medium">Zip Code:</span> {hostelData.zipCode}</p>
              <p><span className="font-medium">Hostel Type:</span> {hostelData.hostelType}</p>
              <p><span className="font-medium">CNIC:</span> {hostelData.cnic}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Room Information</h4>
              <p><span className="font-medium">Total Rooms:</span> {roomData.totalRooms}</p>
              <p><span className="font-medium">Total Beds:</span> {roomData.totalBeds}</p>
              <p><span className="font-medium">Room Types:</span> {[
                roomData.hasOneBedRooms && '1-Bed',
                roomData.hasTwoBedRooms && '2-Bed',
                roomData.hasThreeBedRooms && '3-Bed',
                roomData.hasFourBedRooms && '4-Bed'
              ].filter(Boolean).join(', ')}</p>
              {roomData.hasOneBedRooms && <p><span className="font-medium">1-Bed Room Price:</span> ${roomData.oneBedRoomPrice}</p>}
              {roomData.hasTwoBedRooms && <p><span className="font-medium">2-Bed Room Price:</span> ${roomData.twoBedRoomPrice}</p>}
              {roomData.hasThreeBedRooms && <p><span className="font-medium">3-Bed Room Price:</span> ${roomData.threeBedRoomPrice}</p>}
              {roomData.hasFourBedRooms && <p><span className="font-medium">4-Bed Room Price:</span> ${roomData.fourBedRoomPrice}</p>}
              <p><span className="font-medium">Payment Methods:</span> {roomData.paymentMethods.join(', ')}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Facilities</h4>
              <ul className="list-disc list-inside">
                {Object.entries(facilitiesData)
                  .filter(([_, value]) => value)
                  .map(([key, _]) => (
                    <li key={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</li>
                  ))
                }
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p>{hostelData.description || 'No description provided.'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">
        {step === 1 ? "Hostel Registration" :
         step === 2 ? "Room Details" :
         step === 3 ? "Facilities" :
         step === 4 ? "Upload Images" :
         "Summary"}
      </h2>

      {step === 1 ? renderHostelRegistrationStep() :
       step === 2 ? renderRoomDetailsStep() :
       step === 3 ? renderFacilitiesStep() :
       step === 4 ? renderImageUploadStep() :
       renderSummaryStep()}

      <div className="flex justify-between gap-4">
        {step > 1 && (
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
        )}
        <Button type="submit" className={step === 1 ? "w-full" : "flex-1"}>
          {step === 5 ? "Request Registration" : "Continue"}
        </Button>
      </div>
    </form>
  )
}