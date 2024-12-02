"use client"
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import bulldog from '../Assets/bulldog.png';
import styles from './ResetPasswordPage.module.css';
import lock from '../Assets/password.png';
import { useRouter } from 'next/router';

export default function ResetPasswordPage() {

  

  const searchParams = useSearchParams();
  const token = searchParams.get('token');  // Extract the token from the URL query parameter

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //console.log(password);
    //console.log(confirmPassword);
    if(password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/resetPassword", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message);
      }

      alert(data.message);

      
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={styles.bulldog}>
      <img src={bulldog.src} width={200} alt=""/>
      <div className={styles.container}>
        <div className= {styles.header}>
            <div className={styles.text}>askUGA</div>
            <div className={styles.underline}></div>
        </div>
        <form onSubmit={handleSubmit}>
            <div className= {styles.inputs}>
              <div className={styles.input}>
                <img src={lock.src} width={20} alt=""/>
                <input
                  type="password"
                  name="password"
                  placeholder='Password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className= {styles.inputs}>
              <div className={styles.input}>
                <img src={lock.src} width={20} alt=""/>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                />
              </div>
            </div>
            <div className={styles.loginsubmit}>
                <button type="submit" className={styles.submit}>
                    Password Reset
                </button>
            </div>
          </form>
      </div>
    </div>
  );
}