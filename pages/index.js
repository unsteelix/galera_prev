import { getPageTypeAndData } from 'utils'
import Folder from 'components/Folder'
import Page from 'components/Page'

export default function Home(props) {

    const { data } = props;
    const { path, payload } = data;

    const title = path.title

    return (
        <Page headtitle={title} headDescription={""} >
            <Folder childrenPaths={payload} />
        </Page>
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