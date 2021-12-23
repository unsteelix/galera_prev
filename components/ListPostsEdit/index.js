import React, { useState, useEffect } from 'react';
import { uid } from 'uid/secure';
import styles from './ListPostsEdit.module.scss';
import querys from "utils/querys";
import { postMockup } from 'utils/mockups';
import Link from 'next/link';

const ListPostsEdit = () => {

  const [posts, setPosts] = useState([]);

  useEffect(async () => {

    const data = await querys.fetchPosts()

    let list = []

    if(data){
      for(let key in data){
        list.push({
          id: key,
          ...data[key]
        })
      }
      setPosts(list)
    }

  }, []);

  const updatePosts = async () => {

    setPosts([])

    const posts = await querys.fetchPosts()
    let list = []

    if(posts){
      for(let key in posts){
        list.push(posts[key])
      }
      setPosts(list)
    }
  }
    
  const onDeletePostBtn = async (id) => {
    const needDeleting = confirm('Точно удалить пост?')

    if(needDeleting) {
      await querys.deletePost(id)
      updatePosts()
    }
  }

  const onUpdatePostBtn = async (id, title) => {
    await querys.updatePostTitle(id, title)
    updatePosts()
  }

  const onAddPostBtn = async () => {
    const newId = uid(14)

    const post = {
      ...postMockup,
      id: newId
    }

    await querys.addPost(newId, post)

    updatePosts()
  }

  const OnePost = ({post}) => {
    const { id, title } = post;

    const [inputVal, setInputVal] = useState(title)
      
    return (
      <div className={styles.onePost}>
        <div className={styles.editBtn}>
          <Link href={`/admin/post/${id}`} >
            edit
          </Link>
        </div>
        <div className={styles.id}>{id}</div>
        <div className={styles.title}>
          <input type="text" value={inputVal} onChange={(e) => {setInputVal(e.target.value)}} />
        </div>
        <div className={styles.deleteBtn} onClick={() => onDeletePostBtn(id)}>delete</div>
        <div className={styles.updateBtn} onClick={() => onUpdatePostBtn(id, inputVal)}>update</div>
      </div>
    )
  }
    
  const AddPost = () => <div className={styles.addBtn} onClick={onAddPostBtn}>Add POST</div>

  const ListPosts = () => <div className={styles.listPosts}>
    {posts.map((post) => <OnePost key={post.id} post={post} />)}
  </div>



  return (
    <div className={styles.wrap}>
      <ListPosts />
      <AddPost />
    </div>
  )
}

export default ListPostsEdit