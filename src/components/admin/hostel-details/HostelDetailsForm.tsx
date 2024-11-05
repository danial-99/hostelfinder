/* eslint-disable @next/next/no-img-element */
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
import axios from "axios";
import { string } from "zod";
import Image from "next/image";

export default function HostelDetailsForm() {
  const [formData, setFormData] = useState({
    hostelName: "",
    ownerName: "",
    hostelLocation: "",
    hostelType: "",
    roomDetails: "",
    image:[],
    avatar:""
  });
  // const [avatar, setAvatar] = useState<string>("");
  // const [files, setFiles] = useState<[] | any>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/cloudinary/upload-image-to-cloudinary",
        formData
      );
  
      const imageUrl = response?.data?.url;
      if (imageUrl) {
        setFormData((prevFiles:any) => ({...prevFiles, image:[...prevFiles.image, imageUrl]}));
        return imageUrl;  // Return URL if needed elsewhere
      } else {
        console.error("Image URL not found in response.");
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  const uploadAvatrTOcloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/cloudinary/upload-image-to-cloudinary",
        formData
      );
  
      const imageUrl = response?.data?.url;
      if (imageUrl) {
        setFormData((prev) => ({...prev, avatar:imageUrl}))
        return imageUrl;  // Return URL if needed elsewhere
      } else {
        console.error("Image URL not found in response.");
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  }

  // console.log(files)

  console.log(formData)
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
  <div className="space-y-3">
      <Card className="w-full max-w-7xl mx-auto pt-5">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <ProfileUpload avatar={formData.avatar} uploadAvatrTOcloudinary={uploadAvatrTOcloudinary}/>
          <HostelInfoInputs
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <div className="block lg:flex justify-between items-center gap-x-3 w-full">
            <div className="w-full lg:w-6/12">
              <RoomDetails
                value={formData.roomDetails}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full lg:w-6/12">
              <PhotoUpload uploadImageTOCloudinary={uploadImageToCloudinary} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-x-3">
          <Button className="w-2/12" variant="outline" type="button">
            Cancel
          </Button>
          <Button className="w-3/12" type="submit">
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>

    {/* uploaded images listing */}
    <div className="space-y-2">
      <h1 className="text-md font-medium">Your Image Uploads</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-3">
        {formData.image.map((image, index) => (
          <div key={index} className="relative w-full h-[200px] rounded-md overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={image}
              alt="Uploaded Image"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
