"use client"
import React from "react";
import styles from "./Description.module.css";
import questionpic from "../Assets/questioncartoon.png";
import bulldog from "../Assets/bulldog.png";
import { useRouter } from 'next/navigation';
function DescriptionComponent() {

    const router = useRouter();

    const handleSignup = ()=>{
        router.push('/signup');
    };

    const handleLoggin = () => {
        router.push('/login');

    };
    return(
        <div>
            <p className={styles.header}> askUGA</p>
            <ul className={styles.bulletedList}>
                <li> Interactive application that simulates an educational forum at the University of Georgia</li>
                <br/>
                <li> Users are allowed to pose any University related questions such as school event times, professor for courses, schdeuling concerns, etc.</li>
                <br/>
                <li> Experienced students, teachers, alumni and other users with credible knowledge in such questions, will be allowed to reply to such questions as a way to stimulate information exchange</li>
                <br/>
                <li> Logged in users will have the options to view their current posts, interact with other users posts, pose questions, and reply to said questions</li>
                <br/>
                <li> The main purpose of this app is to provide a platform/resource for students at UGA to easily have their school related questions answered by other knowledgable students or professors. </li>
                <br/>
            </ul>
            <div className={styles.forPics}>
            <img className={styles.questionPicStyle} src={questionpic.src} width={300} alt="questionpic"/>
            <p className={styles.formatRouteLabels} onClick={handleSignup}> Signup Page</p>
            <p className={styles.formatRouteLabels} onClick={handleLoggin}> Login Page</p>
            <img className={styles.bulldogPicStyle} src={bulldog.src} width={300} alt="bulldog"/>
            </div>
        </div>

    );
}

export default DescriptionComponent;