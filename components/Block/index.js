import styles, { wrap } from './Block.module.scss';
import { useState, useEffect } from 'react';
import ErrorBlock from 'components/ErrorBlock';
import { BlockByType } from 'utils/renders'

const Block = ({ block }) => {

    const { type } = block;


    const [data, setData] = useState('')

    useEffect( async () => {

        try {
        
            if (!type) throw new Error('render method not found. Try "md", "img"')
    
            setData(<BlockByType block={block} />)

        } catch(e) {
            console.error(`failed rendering ${type} block: ` + e.message)
            setData(<ErrorBlock text={e.message} />)
        }
        
    }, []);




    // const blocks = post.data;
    // const list = Object.values(blocks);
    
    // const sortedList = list.sort((a, b) => a.position - b.position)

    // return(
    //     sortedList.map(block => <div className={styles.wrap} key={block.id}>
    //         <Block block={block} />
    //     </div>)
    // ) 

    return (
        <div className={ wrap } >
            {data}
        </div>
    )
}

export default Block