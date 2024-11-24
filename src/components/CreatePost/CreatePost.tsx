"use client"
import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import { useRouter } from "next/navigation";
import Post from "@/models/post";
import User from "@/models/user";

export default function CreateNewPost() {
    const router = useRouter();

    // State variables for form inputs
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleButtonClick = () => {
        console.log("Button clicked!");
    };


    // Handle change for title input
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    // Handle change for description input
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

   
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("Title:", title);
        console.log("Description:", description);
    };
    

    return (
        <div>
            <h1 className={styles.startingText}> Create a new post</h1>
            <div className={styles.generalInputBox}>
                <form id={styles.outerform} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id={styles.firstTextBox}
                        name="firstbox"
                        placeholder="Title here..."
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <div className={styles.text2}>
                        <textarea
                            
                            id={styles.secondTextBox}
                            name="secondbox"
                            placeholder="Description here..."
                            value={description}
                            onChange={handleDescriptionChange}
                        ></textarea>
                    </div> 
                </form>
                <button type="submit" id={styles.postButton}> 
                        Post
                    </button>
                
            </div>
        </div>
        
    );
}
