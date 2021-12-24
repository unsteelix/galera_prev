import { getPageTypeAndData, isLoggedIn } from 'utils'
import Folder from 'components/Folder'
import Page from 'components/Page'
import { useState, useEffect } from 'react'

export default function Home(props) {

    const { data } = props;
    const { path, payload } = data;

    const title = path.title

    const [isLoggined, setIsLoggined] = useState(false)
    useEffect(() => {
        setIsLoggined(isLoggedIn())
        console.log(']]]]', isLoggined)

    });

    return (
        <Page headtitle={title} headDescription={""} >
            <Folder childrenPaths={payload} isLoggined={isLoggined} />
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