"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PostDetail: React.FC = () => {
    const router = useRouter();
    const { postId } = router.query; // Get postId from the URL
    const [post, setPost] = useState(null);
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPostAndReplies = async () => {
            if (!postId) return; // Ensure postId is available

            try {
                const response = await fetch(`http://localhost:3000/api/users/Posts/${postId}`);
                const data = await response.json();

                if (response.ok) {
                    setPost(data.post);
                    setReplies(data.replies);
                } else {
                    setError(data.error || "Failed to fetch post");
                }
            } catch (err) {
                console.error("Error fetching post and replies:", err);
                setError("Error fetching post and replies");
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndReplies();
    }, [postId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <h2>Replies:</h2>
            {replies.length > 0 ? (
                replies.map((reply) => (
                    <div key={reply._id}>
                        <p>{reply.content}</p>
                    </div>
                ))
            ) : (
                <p>No replies yet.</p>
            )}
        </div>
    );
};

export default PostDetail;