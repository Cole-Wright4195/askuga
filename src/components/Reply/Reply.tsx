"use client"
import React, {useState} from 'react';
import styles from './Reply.module.css';
import ReplyCard from './ReplyCard';


const dummyPosts = [
    { title: 'UGA Transfer Program?', body: 'Hey guys, I was wondering what were the best ways to get involved in the school after transferring from out of state? Thanks.', user: 'AB', 
        comments: [
            { user: 'User1', text: 'This is comment from user1 ' },
            { user: 'User2', text: 'this is comment from second user' },
        ],
        
    }
];




export default function Reply (){
    
    
    return(
        
<div className={styles.container}>
{dummyPosts.map((post, index) => (
                <ReplyCard
                    key={index}
                    title={post.title}
                    body={post.body}
                    user={post.user}
                    comments={post.comments}
                />
            ))}
            
            
</div>


    )
} 