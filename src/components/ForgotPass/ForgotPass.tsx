"use client"
import React from 'react'
import styles from './ForgotPass.module.css'
import './ForgotPass.module.css'
import email from '../Assets/email.png'
import bulldog from '../Assets/bulldog.png'
import { useRouter } from 'next/navigation'

export default function ForgotPassword () {
    const router = useRouter();

    const handleLogin = ()=>{
        router.push('/login');
    };

    const handleSignup=()=>{
        router.push('/signup');
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

            </div>
            <div className={styles.loginsubmit}>
                <div className={styles.submit}>Send Rest Link</div>
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
                            }}>Sign Up</button></div>

            <div className={styles.forgotpassword}><button onClick={handleLogin} style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize:'20px'
                            }}>Login</button></div>
          
            </div>
       </div>
    )
}