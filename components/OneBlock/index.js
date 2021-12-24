import React, { useState } from 'react';
import EditForm from '../EditBlockForm';
import styles from './OneBlock.module.scss'
import { renderBlock } from 'utils/renders';
import API from 'utils/APIs'


const LoadingState = () => <div className={styles.loadingState} >...Loading</div>


const OneBlock = (params) => {

    const { post, block: initBlock } = params;
    const { id: postId } = post

    const [state, setState] = useState('view')
    const [block, setBlock] = useState(initBlock)

    const refresh = async () => {
        changeState('loading')
        const res = await API('fetchPostBlock', { postId, blockId: block.id })
        setBlock(res)
        changeState('view')
    }
  
    const changeState = (newState) => {
      if(!newState){ // toggle
        newState = state === 'view' ? 'edit' : 'view'
      }
      setState(newState)
    }

    const onSaveBtn = async () => {
      await API('updatePostDataBlock', { postId, block })
      refresh()
    }

    const onDeleteBtn = async () => {
        const needDeleting = confirm('Точно удалить?');
        if(needDeleting){
            await API('deletePostBlock', { postId, blockId: block.id })
            window.location.reload()
        }
    }
  
    return (
      <div className={styles.wrap} onDoubleClick={() => changeState()}>
        {state === 'view' && renderBlock(block)}
        {state === 'edit' && <EditForm block={block} onFormChange={(newBlock) => setBlock(newBlock)} onSaveBtn={() => onSaveBtn()} onDeleteBtn={() => onDeleteBtn()} />}
        {state === 'loading' && <LoadingState />}
      </div>
    )
}

export default OneBlock