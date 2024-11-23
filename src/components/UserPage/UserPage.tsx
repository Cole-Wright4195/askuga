/* import React from 'react'
import './UserPage.module.css';
import Card from './UserCard';

const UserPage = () => {
  return (
    <div>
    hello
    </div>
  )
}

export default UserPage */


"use client"
import styles from './UserPage.module.css';
import gear from '../Assets/gear.png';
import Post from './Post';
import {useRouter} from 'next/navigation';

export default function UserPage() {
    const router =useRouter();
   
    const handleLogOut =()=>{
        router.push('./login');
    }

    const handleNewPost =()=>{
        router.push('./post');
    }

    const handleHomeScreen =()=>{
        router.push('./home');
    }   

    const dummyPosts = [
        { title: 'UGA Transfer Program?', body: 'Hey guys, I was wondering what were the best ways to get involved in the school after transferring from out of state? Thanks.', user: 'AB' },
        { title: 'Sports Waiver?', body: 'I am trying to sign up for club sports here and they say I need a waiver of some sort? How do I get this?', user: 'CD' },
        { title: 'Computer Science?', body: 'How rigorous is the comp sci program here at uga? can anyone speak from experience?', user: 'EF' },
        { title: 'Hobbies around Athens', body: 'I’m a first-year here and I am struggling to find things to do as it’s a very different environment than where I am from initially, any help would be appreciated.', user: 'GH' }
    ];

    return (
        <div>
            
            <div className={styles.scrollContainer}>
                {dummyPosts.map((post, index) => (
                    <Post key={index} title={post.title} body={post.body} user={post.user} />
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
                        <button onClick={handleNewPost} className={styles.makePostButton1}>New Post</button>
                        <button onClick={handleHomeScreen} className={styles.makePostButton2}>Feed</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


