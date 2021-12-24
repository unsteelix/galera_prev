import Page from 'components/Page'
import { removeFirstSlash, getPageTypeAndData, isLoggedIn } from 'utils'
import { renderPageByType } from 'utils/renders'
import querys from 'utils/querys'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Post(props) {

    const { data } = props;
    const { type, path, payload } = data;

    const title = path.title


    const [isLoggined, setIsLoggined] = useState(false)
    useEffect(() => {
        setIsLoggined(isLoggedIn())
        console.log(']]]]', isLoggined)

    }, []);



    return (
        <Page headtitle={title} headDescription={""} >
            {renderPageByType(type, payload, isLoggined)}
        </Page>
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

    const paths = [] 
    listPath.forEach(path => {
        if(path.length > 0) {
            paths.push({
                params: {
                    path: [...path.split('/')]
                }
            })
        }
    })

    return { 
        paths,
        fallback: 'blocking' 
    }
}