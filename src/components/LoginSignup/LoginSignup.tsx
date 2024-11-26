
//'use server'
"use client"
import React from 'react'
import styles from './LoginSignup.module.css'
import './LoginSignup.module.css'
import person from '../Assets/person.png'
import email from '../Assets/email.png'
import password from '../Assets/password.png'
import bulldog from '../Assets/bulldog.png'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

type UserProp = {
    email: string;
    password: string;
};


/*export async function doLogout() {
    await signOut({ redirectTo: "/"});
}
*/

export async function doCredentialLogin(formData: FormData): Promise<any> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        return response;
    } catch (err: any) {
        throw err;
    }
    
}

const LoginSignup = () => {

    const router = useRouter();

    const handleSignup = () => {
        router.push("/signup");
    };

    const handleForgotPasswordPage = () => {
        router.push("/forgot");
    };

    const [account, setAccount] = useState<UserProp>({
        email: "",
        password: ""
    });

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccount(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("form data being sent: ", account);

        try {
            const response = await doCredentialLogin(new FormData(e.target as HTMLFormElement));
            if (response?.error) {
                alert("Login failed. Please check your credentials.");
            } else {
                console.log("Login successful", response);
                
                router.push("/home");
            }
        } catch (err) {
            console.error("An error occurred during login:", err);
        }

        setAccount({
            email: "",
            password: ""
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

            <form onSubmit={handleSubmit} className= {styles.inputs}>

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
                    <button type="submit" className={styles.submit}>Login</button>
                </div>

            </form>

        </div>
        <div className={styles.submitcontainer}>
            <div onClick={handleSignup} className={styles.signup}><span>Sign-Up</span></div>
            <div onClick={handleForgotPasswordPage} className={styles.forgotpassword}><span>Forgot-Password?</span></div>

            </div>
       </div>
    )
}

export default LoginSignup;