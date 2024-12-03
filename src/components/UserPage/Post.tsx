import React, { useEffect, useState } from 'react';
import styles from './Post.module.css';
import { ObjectId } from 'mongodb';
import { useSession } from 'next-auth/react';

interface PostProps {
  _id?: string | ObjectId;
  name: string;
  title: string;
  content: string;
  authorId: string | ObjectId;
  createdAt: Date | string;
  postReload: (value: string) => void;
}

type UserDetails = {
  user: {
    firstName: string;
    lastName: string;
  };
};

const Post: React.FC<PostProps> = ({ _id, title, content, name, postReload }) => {
  const { data: session, status } = useSession();
  const userID = session?.user?.id;

  const [userData, setUserData] = useState<UserDetails>({
    user: {
      firstName: '',
      lastName: '',
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  useEffect(() => {
    if (!userID) return;

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userID}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userID]);

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/users/getUserPosts?POST_ID=${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      if (response.ok) {
        postReload('true');
        setIsEditing(false); // Exit editing mode
      } else {
        console.error('Failed to update post:', await response.json());
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/users/getUserPosts?POST_ID=${_id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          postReload('true');
        } else {
          console.error('Failed to delete post:', await response.json());
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const firstName = userData.user.firstName;
  const lastName = userData.user.lastName;

  return (
    <div className={styles.container}>
      <div className={styles.postHeader}>
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className={styles.editInput}
          />
        ) : (
          title
        )}
      </div>
      <div className={styles.postBody}>
        {isEditing ? (
          <textarea
            value={editContent}
            onChange={(e) => {setEditContent(e.target.value) 
              setEditContent(e.target.value);
              e.target.style.height = "auto"; // Reset height to calculate the new size
              e.target.style.height = `${e.target.scrollHeight}px`; // Set height dynamically 
            }}
            className={styles.editTextarea}
          />
        ) : (
          content
        )}
      </div>
      <div className={styles.postFooter}>
        <div className={styles.iconContainer}>
          <span className={styles.userIcon}>
            {firstName[0]}
            {lastName[0]}
          </span>
          <div className={styles.editMenu}>
            {isEditing ? (
              <>
                <button className={styles.saveButton} onClick={handleEdit}>
                  Save
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.editButton}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
