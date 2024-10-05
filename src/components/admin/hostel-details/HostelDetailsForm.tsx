"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileUpload from "./ProfileUpload";
import HostelInfoInputs from "./HostelInfoInputs";
import RoomDetails from "./RoomDetails";
import PhotoUpload from "./PhotoUpload";

export default function HostelDetailsForm() {
  const [formData, setFormData] = useState({
    hostelName: "",
    ownerName: "",
    hostelLocation: "",
    hostelType: "",
    roomDetails: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <Card className='w-full max-w-7xl mx-auto pt-5'>
      <form onSubmit={handleSubmit}>
        <CardContent className='space-y-6'>
          <ProfileUpload />
          <HostelInfoInputs
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <div className='block lg:flex justify-between items-center gap-x-3 w-full'>
            <div className='w-full lg:w-6/12'>
              <RoomDetails
                value={formData.roomDetails}
                onChange={handleInputChange}
              />
            </div>
            <div className='w-full lg:w-6/12'>
              <PhotoUpload />
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-end gap-x-3'>
          <Button className="w-2/12" variant='outline' type='button'>
            Cancel
          </Button>
          <Button className="w-3/12" type='submit'>Save</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
