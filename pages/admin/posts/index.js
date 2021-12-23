import React from 'react';
import ListPathsEdit from 'components/ListPathsEdit'
import ListPostsEdit from 'components/ListPostsEdit'
import styles from './posts.module.scss'
import Head from 'next/head'



export default function () {

  return (<>
    <Head>
      <title>Admin posts</title>
    </Head>

    <div className={styles.wrap}>
      <div className={styles.title}>
        Paths
      </div>
      <ListPathsEdit />
      <div className={styles.title}>
        Posts
      </div>
      <ListPostsEdit />
    </div>
  </>)
}