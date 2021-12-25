import { Blocks } from 'components/Blocks';
import PostHead from 'components/PostHead';
import styles from './post.module.scss';


const Post = ({ post, path }) => {
    return (
        <div className={styles.wrap}>
            <PostHead title={post.title} img={path.img} />
            <Blocks post={post} />
        </div>
    )
}

export default Post