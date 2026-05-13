export interface Post {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  userId: number;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}