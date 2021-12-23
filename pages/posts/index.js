import Head from 'next/head'
import { getPageTypeAndData } from 'utils'
import Folder from 'components/Folder'
import styles from './posts.module.scss'

export default function AllPost(props) {

    const { data } = props;
    const { path, payload } = data;

    const title = path.title

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={title} />
            </Head>
            <div className={styles.wrap}>
                <Folder children={payload} />
            </div>
        </>
    )
}


export async function getStaticProps() {

    const pathStr = '/'

    const pageData = await getPageTypeAndData(pathStr);

    if(!pageData){
        return {
            notFound: true,
        }
    }
  
    return pageData
}