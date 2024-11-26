"use client";
import mongoose, { Model } from 'mongoose';
import React, { useState } from 'react';
import styles from './HomeScreen.module.css';
import magnifyglass from '../Assets/magnifyglass.png';
import gear from '../Assets/gear.png';
import Post from './Post';
import { useRouter } from 'next/navigation';
import CreatePost from '../CreatePost/CreatePost';

const HomeScreenComponent = () => {
    const [showLogout, setShowLogout] = useState(false);
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const router = useRouter();

    const handleGearClick = () => {
        setShowLogout(!showLogout);
    };

    const handleLogout = () => {
    
        console.log('Logging out...');
        router.push('/login'); 
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
                {dummyPosts.map((post, index) => (
                    <Post key={index} title={post.title} content={post.content} name={post.name} createdAt={post.createdAt} authorId={'n/a'} />
                ))}
                <div className={styles.toolContainer}>
                    <button className={styles.makePostButton} onClick = {handleNewPostClick}>New Post</button>
                    <span className={styles.myIcon}>JH</span>
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
                        <CreatePost />
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
