import React from 'react';
import styles from './Post.module.css'; 
import { relative } from 'path';

interface PostProps {
    title: string;
    body: string;
    user: string;
}

const Post: React.FC<PostProps> = ({ title, body, user }) => {
    return (
        
        <div className={styles.container}>
            <div className={styles.postHeader}>{title}</div>
            <div className={styles.postBody}>{body}</div>
            <div className={styles.postFooter}>
               <div className={styles.iconContainer}>
                <span className={styles.userIcon}>{user}</span>
                <div className={styles.editMenu}>
                   <button className={styles.editButton}>Edit</button> 
                   <button className={styles.editButton}>Delete</button>
                </div>
                </div>
                <button className={styles.replyButton}>Reply</button>
            </div>
        </div>
        
        
    );
};

export default Post;
