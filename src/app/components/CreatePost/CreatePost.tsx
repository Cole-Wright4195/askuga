"use client"
import React from "react";
import styles from "./CreatePost.module.css";
import {useState} from 'react';
import { useRouter } from "next/navigation";
import { document } from "postcss";


function CreateNewPost() {

type postProp  = {
    username: string;
    title: string;
    description: string;
};

const handleClearInput = () => {
    setDescription("");
}


const router = useRouter();

//State varaibles for form inputs
const [title, setTitle] = useState<string>("");
const [description, setDescription] = useState<string>("");

//Handle change for title input
const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
};

//Handle change ofr description input
const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
};

// Handle form submission
const handleSubmit = () => {
    //event.preventDefault(); // Prevent the default form submission behavior
    console.log("Title:", title);
    console.log("Description:", description);
};




    return (
        <div>
            <h1 className={styles.startingText}> Create a new post</h1>
            <div className={styles.generalInputBox}>
                <form id={styles.outerform}>
                    
                    <input type="text" id={styles.firstTextBox}name="firstbox" placeholder=" Title here..." value={title} onChange={handleTitleChange}/>
                    <div className={styles.text2}>
                    <input type="text" id={styles.secondTextBox} name="secondbox" placeholder="Description here..." value={description} onChange={handleDescriptionChange}/> 
                    </div> 
                   
                </form>

            </div>
            <button id={styles.userButton}>
                DK
            </button>
            <button  id={styles.postButton} onClick={handleSubmit}> 
                Post
            </button>
        </div>

    );

}

export default CreateNewPost;