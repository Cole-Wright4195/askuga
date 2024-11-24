import React from 'react';
import styles from './Post.module.css'; 
import { relative } from 'path';
import { ObjectId } from 'mongodb';

interface PostProps {
    _id? : string|ObjectId;
    name : string;
    title: string;
    content: string;
    authorId: string| ObjectId;
    createdAt: Date | string;
}

const Post: React.FC<PostProps> = ({ title, content, name }) => {
    return (
        
        <div className={styles.container}>
            <div className={styles.postHeader}>{title}</div>
            <div className={styles.postBody}>{content}</div>
            <div className={styles.postFooter}>
               <div className={styles.iconContainer}>
                <span className={styles.userIcon}>{name}</span>
                <div className={styles.editMenu}>
                   <button className={styles.editButton}>Edit</button> 
                   <button className={styles.editButton}>Delete</button>
                </div>
                </div>
                
            </div>
        </div>
        
        
    );
};

export default Post;