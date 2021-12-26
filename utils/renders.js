import MDrender from 'components/renders/md';
import IMGrender from 'components/renders/img';
import Folder from 'components/Folder';
import Post from 'components/Post';


export const BlockByType = ({ block }) => {

    const { type } = block;

    if (!type) throw new Error('render method not found. Try "md", "img"')

    if(type === 'md'){
        return <MDrender block={block} />
    }
    if(type === 'img'){
        return <IMGrender block={block} />
    }
}


export const renderTypes = [
    {
        type: 'md',
        engine: MDrender
    }, 
    {
        type: 'img',
        engine: IMGrender
    }
]


export const PageByType = ({ type, payload, path, isLoggined }) => {
    if(type === 'post') {
        return <Post post={payload} path={path} />
    }
    if(type === 'folder') {
        return <Folder childrenPaths={payload} isLoggined={isLoggined} />
    }
}

