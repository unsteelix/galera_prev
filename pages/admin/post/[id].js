import React, { useState } from 'react';
import API from "utils/APIs";
import styles from './post.module.scss'
import { blockMockup } from 'utils/mockups';
import { BlocksWithEdit } from 'components/Blocks';
import Head from 'next/head'
import { uid } from 'uid/secure';
import querys from 'utils/querys';

const PostEdit = (props) => {

  const [post, setPost] = useState(props.post);
  const [blocks, setBlocks] = useState(props.post.data);

  const onAddBtn = async () => {
    const newId = uid(14)

    const count = await API('countPostBlocks', { id: post.id })

    const res = await API('updatePostDataBlock', { 
      postId: post.id, 
      block: {
        ...blockMockup,
        id: newId,
        position: count
      }
    })
    
    setBlocks({
      ...blocks,
      [newId]: res
    })
  }



  return (
    <div className={styles.wrap}>
      <Head>
        <title>Admin post: {post.title}</title>
      </Head>
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

  const post = await querys.fetchPost({ id })

  return {
    props: { post },
  }
}