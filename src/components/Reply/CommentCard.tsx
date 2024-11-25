import React from 'react';
import styles from './Reply.module.css';

interface CommentCardProps {
    user: string;
    text: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ user, text }) => {
    return (
        <div className={styles.commentCard}>
            <div className={styles.commentHeader}>
                <span className={styles.commentUser}>{user}</span>
            </div>
            <div className={styles.commentBody}>{text}</div>
        </div>
    );
};

export default CommentCard;
