import ListPathsEdit from 'components/ListPathsEdit'
import ListPostsEdit from 'components/ListPostsEdit'
import styles from './posts.module.scss'
import Page from 'components/Page'

const PostsEdit = () => {
  return (
    <Page headtitle="Admin posts" headDescription="" >
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
    </Page>
  )
}

export default PostsEdit