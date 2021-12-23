import { Blocks } from 'components/Blocks';
import styles from './post.module.scss';


const Post = ({post}) => {
    return (
        <div className={styles.wrap}>
            <Blocks post={post} />
        </div>
    )
}

export default Post