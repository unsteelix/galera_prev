import Head from 'next/head'
import { getPageTypeAndData } from 'utils'
import { renderPageByType } from 'utils/renders'
import styles from './posts/posts.module.scss'

export default function Home(props) {

    const { data } = props;
    const { type, path, paths, payload } = data;

    const title = path.title

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={title} />
            </Head>
            <div className={type === 'post' ? styles.post : styles.folder}>
                {renderPageByType(type, payload)}
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