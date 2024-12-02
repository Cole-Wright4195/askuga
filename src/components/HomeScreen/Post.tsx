import React, { useEffect, useState } from 'react';
import styles from './Post.module.css'; 
import { ObjectId } from 'mongodb';
import { useRouter } from 'next/navigation';

interface PostProps {
    _id? : string|ObjectId;
    name : string;
    title: string;
    content: string;
    authorId: string| ObjectId;
    createdAt: Date | string;
}



const Post: React.FC<PostProps> = ({ _id, title, content, name, authorId}) => {
    const [authorDetails, setAuthorDetails] = useState<{ firstName: string; lastName: string } | null>(null);
    const router = useRouter();
    useEffect(() => {
        const fetchAuthorDetails = async () => {
            const response = await fetch(`http://localhost:3000/api/users/${authorId}`);
            const data = await response.json();
            setAuthorDetails(data.user);
            console.log("Fetched author details:", data); 
        };
        fetchAuthorDetails();
    }, [authorId]);

    
    const handleReplyClick = () => {
        if (_id) {
            router.push(`/reply/${_id}`); // Redirect to the reply page with the post ID
        } else {
            console.error('Post ID is missing');
        }
    };

    const firstname = authorDetails?.firstName;
    const lastname = authorDetails?.lastName;
    return (
        
        <div className={styles.container}>
            <div className={styles.postHeader}>{title}</div>
            <div className={styles.postBody}>{content}</div>
            <div className={styles.postFooter}>
            <span className={styles.userIcon}>
                    {firstname ? firstname[0] : '?'}
                    
                    {lastname ? lastname[0] : '?'}
            
                </span>
                <button className={styles.replyButton} onClick={handleReplyClick}>Reply
                    
                </button>
            </div>
        </div>
        
        
    );
};

export default Post;




