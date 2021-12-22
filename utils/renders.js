import mdRender from 'components/renders/md';
import imgRender from 'components/renders/img';
import { Blocks } from 'components/Blocks';
import Covers from 'components/Covers';

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
    const { type } = block;

    try {
        return renders[type](block)
    } catch(e) {
        throw new Error('render method not found. Try "md", "img"')
    }
}

export const renderPost = (post) => {
    return <Blocks post={post} />
}

export const renderFolder = (children) => {
    return <Covers paths={children} />
}

export const renderPageByType = (type, payload) => {
    if(type === 'post') {
        return renderPost(payload)
    }
    if(type === 'folder') {
        return renderFolder(payload)
    }
}




export default renders