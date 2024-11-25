import React from 'react'
import styles from './LoginSignup.module.css'
import './LoginSignup.module.css'
import person from '../Assets/person.png'
import email from '../Assets/email.png'
import password from '../Assets/password.png'
import bulldog from '../Assets/bulldog.png'
import { useRouter } from 'next/navigation'

const LoginSignup = () =>{



  

    return (
        <div className={styles.bulldog}>
            <img src={bulldog.src} width={200} alt=""/>
            
        <div className= {styles.container}>
            <div className= {styles.header}>
                <div className={styles.text}>askUGA</div>
                <div className={styles.underline}></div>

            </div>
            <form className= {styles.inputs}>

                <div className={styles.input}>
                    <img src= {email.src} width={20} alt=""/>
                    <input type ="email" placeholder='email'/>
                </div>

                <div className={styles.input}>
                    <img src= {password.src} width={20} alt=""/>
                    <input type ="password" placeholder='password'/>
                </div>
            </form>
            <div className={styles.loginsubmit}>
            <div className={styles.submit}>Login</div>
            </div>
        </div>
        <div className={styles.submitcontainer}>
            <div className={styles.signup}><span>Sign-Up</span></div>
            <button className={styles.forgotpassword}><span>Forgot-Password?</span></button>
          
            </div>
       </div>
    )
}

export default LoginSignup;