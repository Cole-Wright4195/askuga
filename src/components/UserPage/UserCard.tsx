"use client"
import React from 'react'
import styles from './UserCard.module.css';
import bulldog from '../Assets/bulldog.png'
import { useRouter } from 'next/navigation';


export type UserCardProp = {
    user:{
        name: string;
        email:string;

        
    }
} 
const exUser={
        name:"Tom Johnson",
        year:"Freshman",
        email:"tom123@uga.edu"
    
}
export default function UserCard({user=exUser}) {
  const router= useRouter();

  const handleHome =()=>{
    router.push('/home');
  };
  return (
    <div className={styles.userInfo}>
      <div className={styles.iconContainer}>
        <div className={styles.profilePic}><span className={styles.myIcon}>AM</span></div>
        <button onClick={handleHome} className={styles.bulldogButton}><span className={styles.bulldogIcon}>
          <img src={bulldog.src} width={85} alt="Bulldog" />
        </span></button>
      </div>
        <div className={styles.container}>
      <h2>{user.name}</h2>
      <h2>{user.email}</h2>
      </div>
      <div className={styles.title}><span>Your Post:</span></div>
    </div>
  )

};

