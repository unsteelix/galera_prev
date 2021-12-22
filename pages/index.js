import Head from 'next/head'
import { removeFirstSlash } from 'utils'
import querys from 'utils/querys'
import { Blocks } from 'components/Blocks';
import styles from './posts/posts.module.scss';
import Cover from 'components/Cover';

export default function Home(props) {

    const { data } = props;

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


export async function getStaticProps() {

    const paths = await querys.fetchPaths();
    const listPath = Object.values(paths);

    const children = []
    
    listPath.forEach(el => {
        if(el.path.split('/').length === 2) {
          children.push(el)
        }
    })

    console.log('\n\n====', children, '\n\n')

    const sortedChildren = children.sort((a, b) => a.position - b.position)

    return {
        props: {
            data: {
                children: sortedChildren
            }
        }
    }
}