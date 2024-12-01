import HomeScreenComponent from '../../components/HomeScreen/HomeScreen';
import { SessionProvider } from 'next-auth/react';

export default function HomeScreen() {
  return (
    <SessionProvider>
      <HomeScreenComponent/>
    </SessionProvider>
  );
}

