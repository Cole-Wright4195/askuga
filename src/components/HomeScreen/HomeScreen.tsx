"use client";
import mongoose, { Model } from 'mongoose';
import React, { useEffect, useState } from 'react';
import styles from './HomeScreen.module.css';
import magnifyglass from '../Assets/magnifyglass.png';
import gear from '../Assets/gear.png';
import Post from './Post';
import { useParams, useRouter } from 'next/navigation';
import CreatePost from '../CreatePost/CreatePost';

import { auth } from '@/auth';
import { getSession, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';
import CreateNewPost from '../CreatePost/CreatePost';


export async function doLogout() {
    try {
    "use server"
    await signOut({ redirectTo: "/login"});
    } catch (err: any) {
        throw err;
    }
}



/*export async function UserAvatar() {
    try {
        "use server"
        const session = await auth();
        console.log(session);

        if (!session?.user) return null;

        return (
            <div>
                <span className={styles.myIcon}>AA</span>
            </div>
        )
        
    } catch (err: any) {
        throw err;
    }
}*/

type userDetails = {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        password: string;
    }
};

const HomeScreenComponent = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const params = useParams(); // If you also want to use route params
    const userID = session?.user?.id;
    const [posts, setPosts] = useState([]); // Extract userID from session
    const [shouldFetchPosts, setShouldFetchPosts] = useState(false);
   
  
    // State to store fetched user data and error/loading state


    //const [userData, setUserData] = useState(null);
    const [userData, setUserData] = useState<userDetails>({
        user: {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
        }
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    // Only fetch the user data when the userID is available
    useEffect(() => {
      if (!userID) {
        setError('User ID is missing');
        setLoading(false);
        return;
      }
  
      const fetchUser = async () => {
        try {
          console.log('Fetching user data for userID:', userID);
  
          const response = await fetch(`http://localhost:3000/api/users/${userID}`);
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          console.log('Fetched data:', data);
          setUserData(data); // Set the fetched user data
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Error fetching user details');
          setLoading(false);
        }
      };
      const fetchPosts = async () => {
        try {
            const response = await fetch('/api/users/Posts'); // Adjust the route to your API
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await response.json();
            setPosts(data.Posts); // Assuming the API returns { Posts: [...] }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Error fetching posts');
            setLoading(false);
        }
    };

      fetchPosts();
      fetchUser(); // Call the fetchUser function
    }, [userID, shouldFetchPosts]); // Dependency array to rerun effect when userID changes
    

    
    
    
    const handleNewPostCreated = () => {
        setShouldFetchPosts((prev) => !prev); // Toggle state to re-trigger useEffect
    };
    const [showLogout, setShowLogout] = useState(false);
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    


    
        const firstName = userData.user.firstName;
        const lastName = userData.user.lastName;

        console.log(firstName);
    
    

    const handleGearClick = () => {
        setShowLogout(!showLogout);
    };

    const handleLogout = () => {
    
        console.log('Logging out...');
        //router.push('/login');
        doLogout();
    };

    const handleNewPostClick = () => {
        setShowNewPostModal(true); // Show the modal
    };

    const closeNewPostModal = () => {
        setShowNewPostModal(false); // Hide the modal
    };
    

    const dummyPosts = [
        { title: 'UGA Transfer Program?', content: 'Hey guys, I was wondering what were the best ways to get involved in the school after transferring from out of state? Thanks.', name: 'AB', athorId: 'asoasduoasbf0' , createdAt : 'date' },
        { title: 'Sports Waiver?', content: 'I am trying to sign up for club sports here and they say I need a waiver of some sort? How do I get this?', name: 'CD', authorId: "rouadsfadsf", createdAt : 'date' },
        { title: 'Computer Science?', content: 'How rigorous is the comp sci program here at uga? can anyone speak from experience?', name: 'EF' , athorId: 'asoqwerasduoasbf0' , createdAt : 'date'  },
        { title: 'Hobbies around Athens', content: 'I’m a first-year here and I am struggling to find things to do as it’s a very different environment than where I am from initially, any help would be appreciated.', name: 'GH', athorId: 'asoasduwrqrrrdoasbf0' , createdAt : 'date'  },
        {title: 'Hobbies around Athens', content: 'I’m a first-year here and I am struggling to find things to do as it’s a very different environment than where I am from initially, any help would be appreciated.', name: 'GH', athorId: 'asoasduwrqrrrdoasbf0' , createdAt : 'date' },
        {title: 'Hobbies around Athens', content: 'I’m a first-year here and I am struggling to find things to do as it’s a very different environment than where I am from initially, any help would be appreciated.', name: 'GH', athorId: 'asoasduwrqrrrdoasbf0' , createdAt : 'date' },
        {title: 'Hobbies around Athens', content: 'I’m a first-year here and I am struggling to find things to do as it’s a very different environment than where I am from initially, any help would be appreciated.', name: 'GH', athorId: 'asoasduwrqrrrdoasbf0' , createdAt : 'date' },
        {title: 'Hobbies around Athens', content: 'I’m a first-year here and I am struggling to find things to do as it’s a very different environment than where I am from initially, any help would be appreciated.', name: 'GH', athorId: 'asoasduwrqrrrdoasbf0' , createdAt : 'date' }
        

    ];

    return (
    
        <div>
            <div className={styles.fixedSearch}>
                <div className={styles.input}>
                    <span className={styles.iconMenuContainer}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </span>
                    <input type="text" placeholder='search' />
                    <img src={magnifyglass.src} width={20} alt="" />
                </div>
            </div>
            <div className={styles.scrollContainer}>
                {posts.map((post, index) => (
                    <Post key={index} title={post.title} content={post.content} name={post.name} createdAt={post.createdAt} authorId={'n/a'} />
                ))}
                <div className={styles.toolContainer}>
                    <button className={styles.makePostButton} onClick = {handleNewPostClick}>New Post</button>
            
                    <span className={styles.myIcon}>
                        {firstName} {lastName}
                    </span>
                    <div className={styles.gearContainer}>
                        <span className={styles.gearIcon}>
                            <img src={gear.src} width={17} alt="Settings" />
                        </span>
                        <div className={styles.logoutMenu}>
                            <button onClick={handleLogout} className={styles.logoutButton}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
              {/* Modal for New Post */}
              {showNewPostModal && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modalContent}>
                        <CreatePost/>
                        <button className={styles.closeButton} onClick={closeNewPostModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
       
    );
};

export default HomeScreenComponent;
