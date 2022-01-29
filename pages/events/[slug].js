import Layout from '@/components/Layout';
import { API_URL } from '@/config/server.js';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt,FaTimes } from 'react-icons/fa';



export default function EventDetailPage({evt}){

    const deleteEvent = function (){

    }
return (<Layout>
    <div className={styles.event}>
    
    <div className={styles.controls}>
        <Link href={`events/edit/${evt.id}`}>
            <a>
                <FaPencilAlt /> Edit Event
            </a>
        </Link>

        <a className={styles.delete} onClick={deleteEvent()}>
            <FaTimes/> Delete Event
        </a>
    </div>

    <span>
        {`${evt.date} ${evt.time}`}
    </span>
    <h1>{evt.name}</h1>
    <div className={styles.image}>
    <Image alt='event image'
          src={evt.image ? evt.image : '/images/event-default.png'}
          width={1020}
          height={600}
        />
        </div>

    <h3>Performers: </h3>
    <p>{evt.performers}</p>

    <h3>Description:</h3>
    <p>
        {evt.description}
    </p>
    <h3>Venue:{evt.venue}</h3>
    <p>{evt.address}</p>
    </div>

    <Link href='/events'>
        <a className={styles.back}>Back</a>
    </Link>

    </Layout>)
}


export async function getStaticPaths(){
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json(); 

    let paths = [];
    events.data.forEach(evt => {
        paths.push({params: {slug: evt.attributes.slug}});
    });
    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps({params:{slug}}){

    const res = await fetch(`${API_URL}/api/events/?populate=*&filters[slug][$eq]=${slug}`);
    const evt = await res.json(); 

    console.log(evt.data[0].attributes)
    return {
      props: {
          evt: evt.data[0].attributes}
    }
  }

// export async function getServerSideProps({query: {slug}}){
//     const res = await fetch(`${API_URL}/api/events/${slug}`);
//     const evt = await res.json(); 
//     return {
//       props: {
//           evt: evt[0]}
//     }
//   }