import { ObjectId } from 'mongodb';

export interface User {
  _id?: string|ObjectId;
  email: string;
  password: string;
  name: string;
} 