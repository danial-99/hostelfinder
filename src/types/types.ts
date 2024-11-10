export type HostelType = "BOYS" | "GIRLS";
export type HostelStatus = "PENDING" | "APPROVED" | "DISAPPROVED";

export interface Hostel {
  id: string;
  ownerId: string;
  ownerName: string | null;
  name: string;
  location: string | null;
  type: HostelType; // Ensure you're using the same HostelType from Prisma
  description: string;
  avatar: string;
  image: string[];
  termsConditions: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: HostelStatus; // Assuming HostelStatus is defined correctly
}
