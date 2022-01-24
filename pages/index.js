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
              <EventItem key={evt.id} event={evt}></EventItem>
              )
    )}
  </div>
  </Layout>

}

export async function getServerSideProps(){
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: {events}
  }
}