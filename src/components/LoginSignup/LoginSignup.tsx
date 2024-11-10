"use client"
import React from 'react'
import styles from './LoginSignup.module.css'
import './LoginSignup.module.css'
import email from '../Assets/email.png'
import password from '../Assets/password.png'
import bulldog from '../Assets/bulldog.png'
import { useRouter } from 'next/navigation'


export default function LoginSignup(){
    const router = useRouter();

    const handleSignup=()=>{
        router.push('/signup');
    };

    const handleForgotPassword =()=>{
        router.push('/forgot');
    };
    return (
        <div className={styles.bulldog}>
            <img src={bulldog.src} width={200} alt=""/>
            
        <div className= {styles.container}>
            <div className= {styles.header}>
                <div className={styles.text}>askUGA</div>
                <div className={styles.underline}></div>

            </div>
            <div className= {styles.inputs}>

                <div className={styles.input}>
                    <img src= {email.src} width={20} alt=""/>
                    <input type ="email" placeholder='email'/>
                </div>

                <div className={styles.input}>
                    <img src= {password.src} width={20} alt=""/>
                    <input type ="password" placeholder='password'/>
                </div>
            </div>
            <div className={styles.loginsubmit}>
            <div className={styles.submit}>Login</div>
            </div>
        </div>
        <div className={styles.submitcontainer}>
            <div className={styles.signup}><button onClick={handleSignup} style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize:'20px'
                            }}>Sign-Up</button></div>

            <div className={styles.forgotpassword}><button onClick={handleForgotPassword} style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize:'20px'
                            }}>Forgot-Password?</button></div>
          
            </div>
       </div>
    )
}
