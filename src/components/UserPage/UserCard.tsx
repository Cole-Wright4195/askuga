"use client";
import React, {useEffect, useState } from "react";
import styles from "./UserCard.module.css";
import { useSession } from "next-auth/react";


type userDetails = {
  user: {
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      password: string;
  }
};

export default function UserCard() {
  const { data: session, status } = useSession();
  const userID=session?.user?.id;
  const [userData,setUserData]=useState<userDetails>({
    user:{
      firstName:"",
      lastName:"",
      email:"",
      username:"",
      password:"",
    }
  });
  const [loading,setLoading]=useState(true);
  const[error,setError]=useState("");
  useEffect(()=>{
    if(!userID){
      setError("user id not found");
      setLoading(false);
      return;
    }
    const fetchUser= async()=>{
      try{
        console.log("fetching user data for userId:", userID);
        const response = await fetch (`http://localhost:3000/api/users/${userID}`)
        if(!response.ok){
          throw new Error("network response was not ok");
        }
        const data = await response.json();
        console.log("fetched data:", data);
        setUserData(data);
        setLoading(false);
      }catch(error){
        console.error("error fetching user data", error);
        setError('error fetching user details');
        setLoading(false);
      }
    };
    fetchUser();
  },[userID])

  if (status === "loading") {
    return <div></div>;
  }

  if (!session) {
    return <div></div>;
  }

  const firstName=userData.user.firstName;
  const lastName=userData.user.lastName;
  const email= userData.user.email;

  return (
    <div className={styles.userInfo}>
      <span className={styles.myIcon}>
        {firstName[0]}
        {lastName[0]}
      </span>
      <div className={styles.container}>
        <h2>{firstName}{" "}{lastName}</h2>
        <h2>{email}</h2>
      </div>
      <div className={styles.title}>
        <span>Your Posts:</span>
      </div>
    </div>
  );
}



