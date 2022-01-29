import Link from 'next/link'
import Layout from '@/components/layout'
import { API_URL } from '@/config/server';
import EventItem from '@/components/EventItem';

export default function HomePage({events}){
  console.log(events)
  return <Layout>
  <div>
    <h1>HomePage</h1>

    {events.length === 0 && <h2>No events available</h2>}
    {events.map(evt => (
              <EventItem key={evt.id} evt={evt}></EventItem>
              )
    )}
  </div>
  </Layout>

}

export async function getServerSideProps(){
  const res = await fetch(`${API_URL}/api/events?populate=*&sort=date:ASC&pagination[pageSize]=3`);
 
  const { data } = await res.json();
  const events = await data;

  console.log(events);

  return {
    props: {events}
  }
}