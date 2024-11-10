import React from 'react'
import './LoginSignup.css'
import person from '../Assets/person.png'
import email from '../Assets/email.png'
import password from '../Assets/password.png'
import bulldog from '../Assets/bulldog.png'


const LoginSignup = () =>{
    return (
        <div className="bulldog">
            <img src={bulldog.src} width={200} alt=""/>
            
        <div className= 'container'>
            <div className= "header">
                <div className="text">askUGA</div>
                <div className="underline"></div>

            </div>
            <div className="inputs">

                <div className="input">
                    <img src= {email.src} width={20} alt=""/>
                    <input type ="email" placeholder='email'/>
                </div>

                <div className="input">
                    <img src= {password.src} width={20} alt=""/>
                    <input type ="password" placeholder='password'/>
                </div>
            </div>
            <div className="login-submit">
            <div className="submit">Login</div>
            </div>
        </div>
        <div className="submit-container">
            <div className="sign-up"><span>Sign-Up</span></div>
            <div className="forgot-password"><span>Forgot-Password?</span></div>
          
            </div>
       </div>
    )
}

export default LoginSignup