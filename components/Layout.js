import Head from 'next/head';
import Header from './Header';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Showcase from './Showcase';
import styles from '@/styles/Layout.module.css'

export default function Layout({title,keywords,description,children}){

    const router = useRouter();

    return (
        <>
        <Head>
           <title>
               {title}
           </title>
            <meta name="description" content={description} />
            <meta name="keywords" keywords={keywords} />

        </Head>
        <Header>
            
        </Header>

        {router.pathname === "/" && <Showcase></Showcase>}
        


        <div className={styles.container}>
        {children}
        </div>

        <Footer>
        </Footer>

        </>
    );
}

Layout.defaultProps = {
    title : 'DJ Events | find the hottest events',
    description: 'desc',
    keywords: 'music, events'
}