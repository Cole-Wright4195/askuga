"use client"
import React from 'react'
import styles from './Signup.module.css'
import './Signup.module.css'
import user from '../Assets/person.png'
import email from '../Assets/email.png'
import password from '../Assets/password.png'
import bulldog from '../Assets/bulldog.png'
import { useRouter } from 'next/navigation'

export default function SignUp(){
    const router = useRouter();

    const handleLogin =()=>{
        router.push('/login');
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
                    <img src= {user.src} width={20} alt=""/>
                    <input type ="fName" placeholder='First Name'/>
                </div>

                <div className={styles.input}>
                    <img src= {user.src} width={20} alt=""/>
                    <input type ="lName" placeholder='Last Name'/>
                </div>

                <div className={styles.input}>
                    <img src= {email.src} width={20} alt=""/>
                    <input type ="email" placeholder='email'/>
                </div>

                <div className={styles.input}>
                    <img src= {password.src} width={20} alt=""/>
                    <input type ="password" placeholder='password'/>
                </div>

                <div className={styles.input}>
                    <img src= {user.src} width={20} alt=""/>
                    <input type ="userName" placeholder='Username'/>
                </div>

            </div>
            <div className={styles.loginsubmit}>
                <div className={styles.submit}>Sign Up</div>
            </div>
        </div>
        <div className={styles.submitcontainer}>
            <div className={styles.signup}><button onClick={handleLogin} style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize:'20px'
                            }}>Login</button></div>

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