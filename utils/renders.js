import mdRender from 'components/renders/md';
import imgRender from 'components/renders/img';
import Folder from 'components/Folder';
import Post from 'components/Post';
import ErrorBlock from 'components/ErrorBlock';


const renders = {
    md: mdRender,
    img: imgRender
}

export const renderTypes = [
    {
        type: 'md',
        engine: renders.md
    }, 
    {
        type: 'img',
        engine: renders.img
    }
]

export const renderBlock = (block) => {
    try {
        
        const { type } = block;
        if (!type) throw new Error('render method not found. Try "md", "img"')

        return renders[type](block)
    } catch(e) {
        console.error(`failed rendering ${type} block: ` + e.message)
        return <ErrorBlock text={e.message} />
    }
}


export const renderPageByType = (type, payload, isLoggined) => {
    if(type === 'post') {
        return <Post post={payload} />
    }
    if(type === 'folder') {
        return <Folder children={payload} isLoggined={isLoggined} />
    }
}




export default renders