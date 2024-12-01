import UserHeader from '@/components/UserPage/UserCard';
import UserBody from '../../components/UserPage/UserPage'
import { SessionProvider } from 'next-auth/react';


export default function UserProfile() {
 return<SessionProvider> <div><UserHeader/> <div> <UserBody/></div></div></SessionProvider>;
    
       
   
} 