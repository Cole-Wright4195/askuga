import React, { useState } from 'react';
import styles from './Reply.module.css';
import CommentCard from './CommentCard';


interface Comment{
    user: string;
    text:string;
}

interface ReplyCardProps {
    title: string;
    body: string;
    user: string;
    comments: Comment[];
}



const ReplyCard: React.FC<ReplyCardProps> = ({ title, body, user, comments }) => {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comment, setComment] = useState('');
    const [allComments, setAllComments]=useState<Comment[]>(comments);

    const handleCommentClick = () => {
        setShowCommentBox(!showCommentBox); 
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value); 
    };

    const handleSubmit = () => {
        if (comment.trim()) {
            const newComment = {user: 'CurrentUser', text: comment}
            setAllComments([...allComments, newComment]);
            setComment(''); 
            setShowCommentBox(false); 
        }
    };



    return (
        <div className={styles.container}>
            <div className={styles.postHeader}>{title}</div>
            <div className={styles.postBody}>{body}</div>
            <div className={styles.postFooter}>
                <span className={styles.userIcon}>{user}</span>
                <button className={styles.replyButton} onClick={handleCommentClick}>
                    {showCommentBox ? 'Cancel' : 'Comment'}
                </button>
            </div>
            
                <div className ={styles.commentsSection}>
                    {allComments.map((comment, index)=>(
                        <CommentCard key={index} user ={comment.user} text={comment.text}/>
                    ))}
                </div>
                
                {showCommentBox && (
                    <div className={styles.commentBox}>
                        <textarea
                            value={comment}
                            onChange={handleInputChange}
                            placeholder="Write your comment..."
                            rows={4}
                            className={styles.textarea}/>
                        <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
                    </div>
            )}
            
        </div>

    );
};

export default ReplyCard;