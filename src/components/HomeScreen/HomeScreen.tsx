"use client"
import styles from './HomeScreen.module.css';
import magnifyglass from '../Assets/magnifyglass.png';
import gear from '../Assets/gear.png';
import { useRouter } from 'next/navigation';

export default function HomeScreen  () {
    const router= useRouter();
    return (
        <div>
            <div className={styles.fixedSearch}>

                <div className={styles.input}>
                        <span className={styles.iconMenuContainer}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </span>
                        <input type ="text" placeholder='search'/>
                        <img src= {magnifyglass.src} width={20} alt=""/>
                </div>
            </div>
            <div className={styles.spacer}>
                &nbsp;
            </div>


            <div className={styles.container}>
                <div className={styles.postHeader}>Title of Post</div>
                <div className={styles.postBody}>Body of the text</div>
                <div className={styles.postFooter}>
                    <span className={styles.userIcon}>JH</span>
                    <button className={styles.replyButton}>Reply</button>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.postHeader}>Title of Post</div>
                <div className={styles.postBody}>Body of the text</div>
                <div className={styles.postFooter}>
                    <span className={styles.userIcon}>JH</span>
                    <button className={styles.replyButton}>Reply</button>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.postHeader}>Title of Post</div>
                <div className={styles.postBody}>Body of the text</div>
                <div className={styles.postFooter}>
                    <span className={styles.userIcon}>JH</span>
                    <button className={styles.replyButton}>Reply</button>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.postHeader}>Title of Post</div>
                <div className={styles.postBody}>Body of the text</div>
                <div className={styles.postFooter}>
                    <span className={styles.userIcon}>JH</span>
                    <button className={styles.replyButton}>Reply</button>
                </div>
            </div>

            <div className={styles.toolContainer}>
                <button className={styles.makePostButton}>New Post</button>
                <span className={styles.myIcon}>JH</span>
                <span className={styles.gearIcon}>
                    <img src={gear.src} width={17} alt=""/>
                </span>
                    
            </div>
        </div>
    );
}
