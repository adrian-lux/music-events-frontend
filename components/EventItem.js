import Link from "next/link";
import Image from "next/image";
import styles from '@/styles/EventItem.module.css'


export default function EventItem({event}){
    return (<div className={styles.event}>

         <div className={styles.image}>
            <Image width={170} height={100} alt="event image" src={event.image ? event.image : '/images/event-default.png'}/>
        </div>

        <div className={styles.info}>
            <span>{event.date + " " + event.time}</span>
            <h3>{event.name}</h3>
        </div>

        <div className={styles.link}>
            <Link href={`/events/${event.slug}`}>Take me there</Link>
        </div>

    </div>
    )
}