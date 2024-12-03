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
  postReload: (value:string) => void 
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userID) {
      setError('User ID not found');
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        console.log('Fetching user data for userId:', userID);
        const response = await fetch(`/api/users/${userID}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user details');
        setLoading(false);
      }
    };

    fetchUser();
  }, [userID]);

  if (status === 'loading') {
    return <div></div>;
  }

  if (!session) {
    return <div></div>;
  }

  const firstName = userData.user.firstName;
  const lastName = userData.user.lastName;

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/users/getUserPosts?POST_ID=${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });
  
      if (response.ok) {
        const updatedPost = await response.json();
        console.log('Post updated successfully:', updatedPost);
        postReload("true");
        setIsEditing(false); // Close the editing form

       
      } else {
        const errorData = await response.json();
        console.error('Failed to update post:', errorData);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
  

  const handleDelete = async () => {
    console.log('id', _id);
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/users/getUserPosts?POST_ID=${_id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          console.log('Post deleted successfully');
          window.location.reload(); // Reload to reflect changes
        } else {
          const errorData = await response.json();
          console.error('Failed to delete post:', errorData);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className={styles.editInput}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={styles.editTextarea}
          />
          <button className={styles.saveButton} onClick={handleEdit}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className={styles.postHeader}>{title}</div>
          <div className={styles.postBody}>{content}</div>
          <div className={styles.postFooter}>
            <div className={styles.iconContainer}>
              <span className={styles.userIcon}>
                {firstName[0]}
                {firstName.split(' ')[1]?.[0] || ''}
                {lastName[0]}
                {lastName.split(' ')[1]?.[0] || ''}
              </span>
              <div className={styles.editMenu}>
                <button
                  className={styles.editButton}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button className={styles.deleteButton} onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
