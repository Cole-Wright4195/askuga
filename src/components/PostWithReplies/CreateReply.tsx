"use client"
import React, { useState } from "react";
import styles from "./CreateReply.module.css";
import { useParams, useRouter } from "next/navigation";
import Post from "@/models/post";
import User from "@/models/user";
import { useSession } from "next-auth/react";

type ReplyProps = {
    content: string;
    postId: string;
    createdAt: string;
  };

export default function CreateReply() {
    const router = useRouter();
    const { postId } = useParams();
    //const userID = session?.user?.id;
    const [content, setContent] = useState<string>("");
    const [replies, setReplies] = useState<ReplyProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  

    const handleButtonClick = () => {
        console.log("Button clicked!");
    };

    const refreshPage = () => {
        router.refresh(); // Refresh the current page
    };
    // Handle change for title input

    // Handle change for description input
    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };
    

   
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        if (!content) {
          alert("Please fill in all fields.");
          return;
        }
      
        try {
          const response = await fetch(`/api/users/Posts/${postId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: content,
              postId: postId, 
            }),
          });
          console.log("Response status1:", response.status);
      
          if (!response.ok) {
            const error = await response.text();
            console.error("API Error:", error)
            alert(`Error: ${error}`);
            return;
          }
          console.log("Response status2:", response.status);
      
          const data = await response.json();
          console.log("Reply created:", data);
          console.log("Response status3:", response.status);
      
          // Clear the form or navigate elsewhere
          
          setContent("");
          
          window.location.reload()
           // Redirect to home or another page
        } catch (error) {
          console.error("Error creating reply:", error);
          alert("An error occurred while creating the post.");
        }
      };
    

    return (
        <div>
            <h1 className={styles.startingText}> Reply</h1>
            <div className={styles.generalInputBox}>
                <form id={styles.outerform} onSubmit={handleSubmit}>
                    <div className={styles.text2}>
                        <textarea
                            
                            id={styles.secondTextBox}
                            name="secondbox"
                            placeholder="Description here..."
                            value={content}
                            onChange={handleContentChange}
                        ></textarea>
                    </div> 
                    <button type="submit" id={styles.postButton}> 
                        Reply
                    </button>
                </form>
                
            </div>
        </div>
        
    );
}
