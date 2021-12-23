import Head from 'next/head'
import { removeFirstSlash, getPageTypeAndData } from 'utils'
import { renderPageByType } from 'utils/renders'
import querys from 'utils/querys'
import styles from './posts.module.scss'

export default function Post(props) {

    const { data } = props;
    const { type, path, payload } = data;

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


export async function getStaticProps(context) {

    const { params } = context;

    const pathStr = '/' + params.path.join('/')

    const pageData = await getPageTypeAndData(pathStr);

    if(!pageData){
        return {
            notFound: true,
        }
    }
  
    return pageData
}

export async function getStaticPaths() {
    
    const data = await querys.fetchPaths();
    
    const list = Object.values(data)
    const listPath = list.map(el => removeFirstSlash(el.path))

    const paths = listPath.map(path => ({
        params: {
            path: [...path.split('/')]
        }
    }))

    return { 
        paths,
        fallback: 'blocking' }
  }