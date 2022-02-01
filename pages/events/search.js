import Link from 'next/link'
import Layout from '@/components/layout'
import { API_URL } from '@/config/server';
import EventItem from '@/components/EventItem';
import qs from 'qs';
import { useRouter } from 'next/router';

export default function SearchPage({events}){
    const router = useRouter();

  return <Layout title='Search Results'>
  <div>
  <Link href='/'><a> Go Back</a></Link>

    <h1>Search result for {router.query.term}</h1>

    {events.length === 0 && <h2>No events available</h2>}
    {events.map(evt => (
              <EventItem key={evt.id} evt={evt}></EventItem>
              )
    )}
  </div>
  </Layout>

}

export async function getServerSideProps({query:{term}}){

  const query = qs.stringify({
    sort: ['date:asc'],
    filters: {
      $or: [
        {
          name: {
            $eq: term,
          },
        },
        {
          performers: {
            $containsi: term,
          },
        },
        {
          description: {
            $containsi: term,
          },
        },
        {
          venue: {
            $containsi: term,
          },
        },
        {
          address: {
            $containsi: term,
          },
        },
      ],
    },
    populate: '*',   
    pagination: {
      pageSize: 3,
      page: 1,
    },
  });

  const res = await fetch(`${API_URL}/api/events?${query}`);
 
  const { data } = await res.json();
  const events = await data;

  console.log(events);

  return {
    props: {events}
  }
}