import React, { useState, useEffect } from 'react';
import querys from "utils/querys";
import styles from './post.module.scss'
import { blockMockup, usid } from 'utils';
import { BlocksWithEdit } from 'components/Blocks';


const PostEdit = (props) => {

  const [post, setPost] = useState(props.post);
  const [blocks, setBlocks] = useState(props.post.data);

  const onAddBtn = async () => {
    const newId = usid.uuid()

    const count = await querys.countPostBlocks(post.id)

    const res = await querys.updatePostDataBlock(post.id, {
      ...blockMockup,
      id: newId,
      position: count
    })
    
    setBlocks({
      ...blocks,
      [newId]: res
    })
  }



  return (
    <div className={styles.wrap}>

      <div className={styles.onAddBtn} onClick={() => onAddBtn()}>add block</div>

      <div className={styles.title}>{post.title}</div>
      <div className={styles.editor}>
        <BlocksWithEdit post={{
          ...post,
          data: blocks
        }} />
      </div>

      <div className={styles.onAddBtn} onClick={() => onAddBtn()}>add block</div>

    </div>
  )
}

export default PostEdit


export async function getServerSideProps(context) {

  const { params } = context;
  const { id } = params;

  const post = await querys.fetchPost(id)

  return {
    props: { post },
  }
}