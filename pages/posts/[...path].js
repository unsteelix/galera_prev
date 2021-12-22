import Head from 'next/head'
import { removeFirstSlash } from 'utils'
import querys from 'utils/querys'
import { Blocks } from 'components/Blocks';
import styles from './posts.module.scss';
import Cover from 'components/Cover';

export default function Post(props) {

    const { data } = props;
    const { type } = data;

    if(type === 'post') {
        const { post } = data;

        return (
            <div className={styles.wrap}>
                <Head>
                    <title>{post.title}</title>
                    <meta name="description" content={post.title} />
                </Head>
                <Blocks post={post} />
            </div>
        )
    }

    if(type === 'folder') {
        const { children } = data;

        const covers = () => children.map(el => <Cover key={el.id} path={el} />)

        return (
            <div className={styles.listCovers}>
                <Head>
                    <title>folder</title>
                    <meta name="description" content="folder" />
                </Head>
                {covers()}
            </div>
        )
    }
}


export async function getStaticProps(context) {

    const { params } = context;

    const fullPath = '/' + params.path.join('/')

    const paths = await querys.fetchPaths();
    const listPath = Object.values(paths);
    
    let type = null;
    let path = null;

    listPath.forEach(el => {

        if(el.path === fullPath){
            type = el.type
            path = el;
        }

    })

    if(!path){
        return {
            notFound: true,
        }
    }

    const postId = path.postId;
    
    const post = await querys.fetchPost(postId);

    if(type === 'post'){

        return {
            props: {
                data: {
                    type: 'post',
                    post
                }
            }
        }
    }

    if(type === 'folder'){

        const children = []
        
        listPath.forEach(el => {
            if(el.path.indexOf(fullPath) === 0 && el.path !== fullPath) {
                if(fullPath.split('/').length === el.path.split('/').length - 1) {
                    children.push(el)
                }            
            }
        })

        const sortedChildren = children.sort((a, b) => a.position - b.position)

        return {
            props: {
                data: {
                    type: 'folder',
                    children: sortedChildren
                }
            }
        }
    }



  
    return {
        props: {
            data: null
        }
    }
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