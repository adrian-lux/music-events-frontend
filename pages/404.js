import {FaExclamationTriangle} from 'react-icons/fa'
import Layout from "@/components/layout"
import Link from 'next/link'
import styles from '@/styles/404.module.css'

export default function NotFoundPage(){
    return <Layout title="Page not found">
        <div className={styles.error}>
            <h1>
                <FaExclamationTriangle />
                404 </h1>
            <h2>Page Not found</h2>
            <Link href="/"><a>Take me home</a></Link>
            </div>
        </Layout>
}