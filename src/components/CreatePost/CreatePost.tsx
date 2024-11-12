"use client"
import React from "react";
import styles from "./CreatePost.module.css";
import { useRouter } from "next/navigation";


export default function CreateNewPost() {

    const router = useRouter();
    return (
        <div>
            <h1 className={styles.startingText}> Create a new post</h1>
            <div className={styles.generalInputBox}>
                <form id={styles.outerform}>
                    
                    <input type="text" id={styles.firstTextBox}name="firstbox" placeholder=" Title here..."/>
                    <div className={styles.text2}>
                    <input type="text" id={styles.secondTextBox} name="secondbox" placeholder="Description here..."/> 
                    </div> 
                   
                </form>

            </div>
            <button id={styles.userButton}>
                DK
            </button>
            <button id={styles.postButton}> 
                Post
            </button>
        </div>

    );

}