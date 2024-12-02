"use client";
import mongoose, { Model, ObjectId } from 'mongoose';
import React, { useEffect, useState } from 'react';
import styles from './HomeScreen.module.css';
import magnifyglass from '../Assets/magnifyglass.png';
import gear from '../Assets/gear.png';
import Post from './Post';
import { useParams, useRouter } from 'next/navigation';
import CreatePost from '../CreatePost/CreatePost';
import bulldog from '../Assets/bulldog.png'

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


type postProps = {
    post: {
        title: string;
        content: string;
        authorId: string | ObjectId;  // reference to the User who created it
        createdAt: Date | string;
    }
}

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
    const [posts, setPosts] = useState<postProps[]>([]); // Extract userID from session
    const [shouldFetchPosts, setShouldFetchPosts] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    //const filteredData = posts.filter(item =>
      //  item.post.title.toLowerCase().includes(searchQuery.toLowerCase())
    //  );

   
  
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
            const response = await fetch(`/api/users/Posts?q=${encodeURIComponent(searchQuery)}`); // Adjust the route to your API
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
    }, [userID, shouldFetchPosts, searchQuery]); // Dependency array to rerun effect when userID changes
    

    
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value); // Update search query state
    };
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
    

    return (

        
    
        <div>
          
             
            <div className={styles.fixedSearch}>
                <div className={styles.input}>
                    <span className={styles.iconMenuContainer}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </span>
                    <input type="text" placeholder='search' value={searchQuery}
                        onChange={handleSearchChange}/>
                    <img src={magnifyglass.src} width={20} alt=""/>
                </div>
                
            </div>

            <div className={styles.scrollContainer}>
            <div>
                <div className = {styles.bulldog}>
                    <img src = {bulldog.src} width = {200} alt = "bulldog"/>
                </div>
                
            </div>
            {posts
        .sort((a, b) => {
            // Convert createdAt to Date objects for comparison
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime(); // Sort in descending order
        })
        .map((post, index) => (
            <Post 
                key={index} 
                _id={post._id}
                title={post.title} 
                content={post.content} 
                name={post.name} 
                createdAt={post.createdAt} 
                authorId={post.authorId} 
            />
        ))}
                <div className={styles.toolContainer}>
                    <button className={styles.makePostButton} onClick = {handleNewPostClick}>New Post</button>
            
                        <span
                className={styles.myIcon}
                onClick={() => router.push(`../../userpage`)} // Route to user page with userID
                style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
            >
                {firstName[0]}{lastName[0]}
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

