"use client"
import React from 'react'
import styles from './UserCard.module.css';


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
  return (
    <div className={styles.userInfo}>
        <span className={styles.myIcon}>AM</span>
        <div className={styles.container}>
      <h2>{user.name}</h2>
      <h2>{user.email}</h2>
      </div>
      <div className={styles.title}><span>Your Post:</span></div>
    </div>
  )

};