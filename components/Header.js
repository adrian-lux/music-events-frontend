import Link from 'next/link';
import styles from '@/styles/Header.module.css'
import Search from './Search';

export default function Header(){

    return <header className={styles.header}>
        <div className={styles.logo}>
            <Link href="/">
                <a>DJ Events</a>
            </Link>
        </div>   
        <Search></Search>   
            <nav>
            <Link href="/events">
                <a>Events</a>
            </Link>
            <Link href="/events/add">
                <a>Add Event</a>
            </Link>
            </nav>
    </header>

}