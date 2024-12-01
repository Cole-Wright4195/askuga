"use client"
import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import { useRouter } from "next/navigation";
import Post from "@/models/post";
import User from "@/models/user";
import { useSession } from "next-auth/react";

export default function CreateNewPost() {
    const router = useRouter();

    // State variables for form inputs
    const { data: session, status } = useSession();
    const userID = session?.user?.id;
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleButtonClick = () => {
        console.log("Button clicked!");
    };

    const refreshPage = () => {
        router.refresh(); // Refresh the current page
    };
    // Handle change for title input
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    // Handle change for description input
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

   
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
      
        if (!title || !description) {
          alert("Please fill in all fields.");
          return;
        }
      
        try {
          const response = await fetch("/api/users/Posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              content: description,
              authorId: session?.user?.id, // Get authorId from session
            }),
          });
      
          if (!response.ok) {
            const error = await response.json();
            alert(`Error: ${error.message}`);
            return;
          }
      
          const data = await response.json();
          console.log("Post created:", data);
      
          // Clear the form or navigate elsewhere
          setTitle("");
          setDescription("");
          router.push("/home");
          window.location.reload()
           // Redirect to home or another page
        } catch (error) {
          console.error("Error creating post:", error);
          alert("An error occurred while creating the post.");
        }
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
                    <button type="submit" id={styles.postButton}> 
                        Post
                    </button>
                </form>
                
            </div>
        </div>
        
    );
}
