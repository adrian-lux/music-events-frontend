import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import styles from '@/styles/Layout.module.css'

export default function Layout({title,keywords,description,children}){
    return (
        <>
        <Head>
           <title>
               {title}
           </title>
            <meta name="description" content={description} />
            <meta name="keywords" keywords={keywords} />

        </Head>
        <Header></Header>

        <div className={styles.container}>
        {children}

        </div>

        <Footer></Footer>

        </>
    );
}

Layout.defaultProps = {
    title : 'DJ Events | find the hottest events',
    description: 'desc',
    keywords: 'music, events'
}