"use client"
import React, { useState }  from 'react'
import styles from './ForgotPass.module.css'
import './ForgotPass.module.css'
import email from '../Assets/email.png'
import bulldog from '../Assets/bulldog.png'
import { useRouter } from 'next/navigation'

type userDetails = {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        password: string;
    }
};

type resetEmail = {
    email: string;
};

export default function ForgotPassword () {
    const router = useRouter();

    const handleLogin = ()=>{
        router.push('/login');
    };

    const handleSignup=()=>{
        router.push('/signup');
    };

    const [account, setAccount] = useState<userDetails>({
        user: {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: ""
        }
    });

    const [enteredEmail, setEnteredEmail] = useState<resetEmail>({
        email: "",
    });

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEnteredEmail(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('Email entered for reset link: ', enteredEmail);

        try {
            const response = await fetch('http://localhost:3000/api/users/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(enteredEmail),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                //const errorData = await response.json();
                throw new Error(data.message);
            }

            alert(data.message);
            
        } catch (err) {
            alert(err);
        }

        setEnteredEmail({
            email: ""
        });
    }

    return (
        <div className={styles.bulldog}>
            <img src={bulldog.src} width={200} alt=""/>
            
            <div className= {styles.container}>

                <div className= {styles.header}>
                    <div className={styles.text}>askUGA</div>
                    <div className={styles.underline}></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className= {styles.inputs}>
                        <div className={styles.input}>
                            <img src= {email.src} width={20} alt=""/>
                            <input
                            type="email"
                            name="email"
                            placeholder='Email'
                            value={enteredEmail.email}
                            onChange={handleInputChange}
                            required
                            />
                        </div>
                    </div>
                    <div className={styles.loginsubmit}>
                        <button type="submit" className={styles.submit}>
                            Send Reset Link
                        </button>
                    </div>
                </form>
                
            </div>

            <div className={styles.submitcontainer}>
                <div className={styles.signup}>
                    <button onClick={handleSignup} style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize:'20px'
                            }}>Sign Up
                    </button>
                </div>

                <div className={styles.forgotpassword}>
                    <button onClick={handleLogin} style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize:'20px'
                            }}>Login
                    </button>
                </div>
          
            </div>
       </div>
    )
}