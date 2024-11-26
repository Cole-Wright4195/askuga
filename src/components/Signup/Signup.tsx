"use client"
import React from 'react'
import styles from './Signup.module.css'
import './Signup.module.css'
import user from '../Assets/person.png'
import email from '../Assets/email.png'
import password from '../Assets/password.png'
import bulldog from '../Assets/bulldog.png'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type UserProp = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
};

export default function SignUp(){
    const router = useRouter();

    const handleLogin =()=>{
        router.push('/login');
    };

    const handleForgotPassword =()=>{
        router.push('/forgot');
    };

    const [account, setAccount] = useState<UserProp>({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
    });

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccount(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log("form data being sent:", account);

        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(account),
            });

            if (!response.ok) {
                throw new Error("Registration failed!");
            }

            const data = await response.json();
            //console.log("Server response:", data); // Log the server's response

            setAccount(
                {
                    firstName: "",
                    lastName: "",
                    email: "",
                    username: "",
                    password: ""
                });

            router.push('/login');
        } catch (err) {
            //console.error("Error during fetch:", err);
            setError("Something went wrong!");
        } finally {
            setLoading(false);
        }
 
    };

    return (
        <div className={styles.bulldog}>
            <img src={bulldog.src} width={200} alt=""/>
            
            <div className= {styles.container}>
                <div className= {styles.header}>
                    <div className={styles.text}>askUGA</div>
                    <div className={styles.underline}></div>

            </div>
            <form onSubmit={handleSubmit} className= {styles.inputs}>

                <div className={styles.input}>
                    <img src= {user.src} width={20} alt=""/>
                    <input
                        type="text"
                        name="firstName" 
                        placeholder='First Name'
                        value={account.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className={styles.input}>
                    <img src= {user.src} width={20} alt=""/>
                    <input
                        type="text"
                        name="lastName"
                        placeholder='Last Name'
                        value={account.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className={styles.input}>
                    <img src= {email.src} width={20} alt=""/>
                    <input
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={account.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className={styles.input}>
                    <img src= {user.src} width={20} alt=""/>
                    <input
                        type="text"
                        name="username"
                        placeholder='Username'
                        value={account.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className={styles.input}>
                    <img src= {password.src} width={20} alt=""/>
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={account.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className={styles.loginsubmit}>
                    <button type="submit" disabled={loading} className={styles.submit}>Sign Up</button>
                </div>
                
            </form>
            
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