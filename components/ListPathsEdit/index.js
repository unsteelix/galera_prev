import React, { useState, useEffect } from 'react';
import styles from './ListPathsEdit.module.scss';
import querys from "utils/querys";
import { pathMockup } from 'utils/mockups';
import { uid } from 'uid/secure';

const ListPathsEdit = () => {

  const [paths, setPaths] = useState([]);

  useEffect(() => {
    async function fetchData() {

      const data = await querys.fetchPaths()

      let list = []
  
      if(data){
        for(let key in data){
          list.push({
            id: key,
            ...data[key]
          })
        }
        console.log('init posts',list)
        setPaths(list)
      }
    }
    fetchData()
  }, []);

  const updatePaths = async () => {

    setPaths([])

    const paths = await querys.fetchPaths()
    let list = []

    if(paths){
      for(let key in paths){
        list.push(paths[key])
      }
      console.log('update paths', paths)
      setPaths(list)
    }
  }
    
  const onDeletePathBtn = async (id) => {
    const needDeleting = confirm('Точно удалить путь?')

    if(needDeleting) {
      await querys.deletePath(id)
      updatePaths()
    }
  }

  const onUpdatePathBtn = async (id, path) => {
    await querys.updatePath(id, path)
    updatePaths()
  }

  const onAddPathBtn = async () => {
    const newId = uid(14)
    await querys.updatePath(newId, {
      ...pathMockup,
      id: newId
    })
    updatePaths()
  }

  const OnePath = ({path}) => {
    const { id, postId, title } = path;

    const [inputsValues, setinputsValues] = useState(path)
      
    return (
      <div className={styles.onePath}>
        <div className={styles.path}>
          <input type="text" value={inputsValues.path} onChange={(e) => {setinputsValues({
            ...inputsValues,
            path: e.target.value
          })}} />
        </div>
        <div className={styles.type}>
          <div className={styles.typeToggler} onClick={() => {setinputsValues({
            ...inputsValues,
            type: inputsValues.type === 'post' ? 'folder' : 'post'
          })}} >
            {inputsValues.type}
          </div>
        </div>
        <div className={styles.title}>
          <input type="text" value={inputsValues.title} onChange={(e) => {setinputsValues({
            ...inputsValues,
            title: e.target.value
          })}} />
        </div>
        <div className={styles.post}>
          <input type="text" value={inputsValues.postId} onChange={(e) => {setinputsValues({
            ...inputsValues,
            postId: e.target.value
          })}} />
        </div>
        <div className={styles.img}>
          <input type="text" value={inputsValues.img} onChange={(e) => {setinputsValues({
            ...inputsValues,
            img: e.target.value
          })}} />
        </div>
        <div className={styles.priority}>
          <input type="number" value={inputsValues.priority} onChange={(e) => {setinputsValues({
            ...inputsValues,
            priority: e.target.value
          })}} />
        </div>
        <div className={styles.isHidden}>
          <input type="text" value={inputsValues.isHidden} onChange={(e) => {setinputsValues({
            ...inputsValues,
            isHidden: e.target.value
          })}} />
        </div>
        <div className={styles.deleteBtn} onClick={() => onDeletePathBtn(id)}>delete</div>
        <div className={styles.updateBtn} onClick={() => onUpdatePathBtn(id, inputsValues)}>update</div>
      </div>
    )
  }
    
  const AddPath = () => <div className={styles.addBtn} onClick={onAddPathBtn}>Add PATH</div>

  const ListPaths = () => <div className={styles.listPaths}>
    {paths.map((path) => <OnePath key={path.id} path={path} />)}
  </div>



  return (
    <div className={styles.wrap}>
      <ListPaths />
      <AddPath />
    </div>
  )
}

export default ListPathsEdit