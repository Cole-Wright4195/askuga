"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./PostWithReplies.module.css";
import CommentCard from "./CommentCard";
import Post from '@/components/HomeScreen/Post';

type PostProps = {
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
};

type ReplyProps = {
  content: string;
  postId: string;
  createdAt: string;
};

const PostWithReplies = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [replies, setReplies] = useState<ReplyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!postId) {
      setError("Post ID is missing");
      setLoading(false);
      return;
    }

    const fetchPostWithReplies = async () => {
      try {
        const response = await fetch(`/api/users/Posts/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post and replies");
        }
        const data = await response.json();
        setPost(data.post);
        setReplies(data.replies);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post and replies:", err);
        setError("Error fetching post and replies");
        setLoading(false);
      }
    };

    fetchPostWithReplies();
  }, [postId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

 
  return (
    <div>
      {/* Post Header */}
      {post && (
        <div className={styles.container}>
          <div className={styles.postHeader}>{post.title}</div>
          <div className={styles.postBody}>{post.content}</div>
          <div className={styles.postFooter}>
            <button className={styles.replyButton}>Reply</button>
          </div>
        </div>
      )}

      {/* Replies Section */}
      <div>
        {replies.map((reply) => (
          <div key={reply._id} className={styles.container}>
            <div className={styles.postHeader}>Anonymous</div>
            <div className={styles.postBody}>{reply.content}</div>
            <div className={styles.postFooter}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostWithReplies;
