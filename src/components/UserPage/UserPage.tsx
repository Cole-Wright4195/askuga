"use client";
import { useState, useEffect } from 'react';
import styles from './UserPage.module.css';
import gear from '../Assets/gear.png';
import Post from './Post';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { auth } from '@/auth';
import { getSession, signOut } from 'next-auth/react';


export async function doLogout(){
    try{
      "use server"
      await signOut({redirectTo:'/login'});
    }catch(err:any){
      throw err;
    }
  }

export default function UserPage() {
    const router = useRouter();
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { data: session, status } = useSession();

   
    const userId = session?.user?.id;

    const handleLogOut = () => {
        router.push('./login');
    };

    const handleNewPost = () => {
        router.push('./post');
    };

    const handleHomeScreen = () => {
        router.push('./home');
    };

    useEffect(() => {
        if (!userId) {
            
            return;
        }

        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/users/getUserPosts?USER=${encodeURIComponent(userId)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data = await response.json();
                setUserPosts(data.posts); 
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Error fetching posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [userId]);

    const postReload =async (data :string)=>{
      if(data){
        try {
            const response = await fetch(`/api/users/getUserPosts?USER=${encodeURIComponent(userId)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await response.json();
            setUserPosts(data.posts); 
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Error fetching posts');
        } finally {
            setLoading(false);
        }
      }

    }

    if (status === "unauthenticated") {
        return (
            <div>
                Please Log in to view profile!
            </div>
        )
    }
    if (status === "authenticated") {
    return (
        <div>
            <div className={styles.scrollContainer}>
                
                    {userPosts.map((post, index) => (
                        <Post

                            key={index}
                            _id={post._id}
                            title={post.title}
                            content={post.content}
                            name={post.name}
                            createdAt={post.createdAt}
                            authorId={post.authorId}
                            postReload={postReload}
                        />
                    ))}
                
                <div className={styles.toolContainer}>
                    <div className={styles.gearContainer}>
                        <span className={styles.gearIcon}>
                            <img src={gear.src} width={17} alt="Settings" />
                        </span>
                        <div className={styles.logoutMenu}>
                            <button onClick={handleLogOut} className={styles.logoutButton}>
                                Logout
                            </button>
                        </div>
                    </div>

                    <div className={styles.bars}>
                      
                        <button onClick={handleHomeScreen} className={styles.makePostButton2}>
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
}





