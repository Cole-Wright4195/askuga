import React from 'react';
import styles from './Post.module.css'; 
import { ObjectId } from 'mongodb';

interface PostProps {
    _id? : string|ObjectId;
    name : string;
    title: string;
    content: string;
    authorId: string| ObjectId;
    createdAt: Date | string;
}

const Post: React.FC<PostProps> = ({ title, content, name,}) => {
    return (
        
        <div className={styles.container}>
            <div className={styles.postHeader}>{title}</div>
            <div className={styles.postBody}>{content}</div>
            <div className={styles.postFooter}>
                <span className={styles.userIcon}>{name}</span>
                <button className={styles.replyButton}>Reply</button>
            </div>
        </div>
        
        
    );
};

export default Post;
