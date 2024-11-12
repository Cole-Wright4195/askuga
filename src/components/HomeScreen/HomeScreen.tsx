import styles from './HomeScreen.module.css';
import magnifyglass from '../Assets/magnifyglass.png';
import gear from '../Assets/gear.png';
import Post from '../../components/HomeScreen/Post';

const HomeScreenComponent = () => {
    const dummyPosts = [
        { title: 'UGA Transfer Program?', body: 'Hey guys, I was wondering what were the best ways to get involved in the school after transferring from out of state? Thanks.', user: 'AB' },
        { title: 'Sports Waiver?', body: 'I am trying to sign up for club sports here and they say I need a waiver of some sort? How do I get this?', user: 'CD' },
        { title: 'Computer Science?', body: 'How rigorous is the comp sci program here at uga? can anyone speak from experience?', user: 'EF' },
        { title: 'Hobbies around Athens', body: 'I’m a first-year here and I am struggling to find things to do as it’s a very different environment than where I am from initially, any help would be appreciated.', user: 'GH' }
    ];

    return (
        <div>
            <div className={styles.fixedSearch}>
                <div className={styles.input}>
                    <span className={styles.iconMenuContainer}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </span>
                    <input type="text" placeholder='search' />
                    <img src={magnifyglass.src} width={20} alt="" />
                </div>
            </div>
            <div className={styles.scrollContainer}>
                {dummyPosts.map((post, index) => (
                    <Post key={index} title={post.title} body={post.body} user={post.user} />
                ))} 
                <div className={styles.toolContainer} >
                    <button className={styles.makePostButton}>New Post</button>
                    <span className={styles.myIcon}>JH</span>
                    <span className={styles.gearIcon}>
                        <img src={gear.src} width={17} alt="" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HomeScreenComponent;
