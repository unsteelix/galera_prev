import mdRender from 'components/renders/md';
import imgRender from 'components/renders/img';


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



export default renders