import React,{useEffect, useState} from 'react';
import styles from './Post.module.css'; 
import { relative } from 'path';
import { ObjectId } from 'mongodb';
import { useSession } from 'next-auth/react';

interface PostProps {
    _id? : string|ObjectId;
    name : string;
    title: string;
    content: string;
    authorId: string| ObjectId;
    createdAt: Date | string;
}
type userDetails={
    user:{
        firstName:string;
        lastName:string;
    }
};

const Post: React.FC<PostProps> = ({ title, content, name }) => {
    const {data:session,status}=useSession();
    const userID=session?.user?.id;
    const [userData,setUserData]=useState<userDetails>({
        user:{
            firstName:"",
            lastName:"",
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
        const fetchUser=async()=>{
            try{
                console.log("fetching user data for userId:",userID);
                const response=await fetch (`http://localhost:3000/api/users/${userID}`)
                if(!response.ok){
                    throw new Error("network response was not ok");
                }
                const data = await response.json();
                console.log("fetched data:",data);
                setUserData(data);
                setLoading(false);
            }catch(error){
                console.error("error fetching user data", error);
                setError("error fetching user details");
                setLoading(false)
            }
        }
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
     

    return (
        
        <div className={styles.container}>
            <div className={styles.postHeader}>{title}</div>
            <div className={styles.postBody}>{content}</div>
            <div className={styles.postFooter}>
               <div className={styles.iconContainer}>
                <span className={styles.userIcon}>
                    {firstName[0]}
                    
                    {lastName[0]}
            
                </span>
                <div className={styles.editMenu}>
                   <button className={styles.editButton}>Edit</button> 
                   <button className={styles.editButton}>Delete</button>
                </div>
                </div>
                
            </div>
        </div>
        
        
    );
};

export default Post;