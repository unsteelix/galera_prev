import OneBlock from "components/OneBlock";
import { renderBlock } from 'utils/renders';
import styles from './Blocks.module.scss';
import Block from "components/Block";


export const BlocksWithEdit = ({post}) => {
    const blocks = post.data;
    const list = Object.values(blocks);
    
    const sortedList = list.sort((a, b) => a.position - b.position)

    return sortedList.map(el => <div key={'block-' + el.id}><OneBlock post={post} block={el} /></div>)
}

export const Blocks = ({ post }) => {
    const blocks = post.data;
    const list = Object.values(blocks);
    
    const sortedList = list.sort((a, b) => a.position - b.position)

    return sortedList.map(block => <div className={styles.wrap} key={block.id}><Block block={block} /></div>)
}