import React, { useState } from 'react';
//import dynamic from 'next/dynamic'
import ListPathsEdit from 'components/ListPathsEdit'
import ListPostsEdit from 'components/ListPostsEdit'
import styles from './posts.module.css'

//const DynamicComponent = dynamic(() => import('/components/hello'))


export default function () {

  return <div className={styles.posts}>
    <ListPathsEdit />
    <ListPostsEdit />
  </div>
}