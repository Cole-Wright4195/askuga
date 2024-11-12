import React from 'react';
import styles from './Post.module.css'; 

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
                <span className={styles.userIcon}>{user}</span>
                <button className={styles.replyButton}>Reply</button>
            </div>
        </div>
        
        
    );
};

export default Post;
