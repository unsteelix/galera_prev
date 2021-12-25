import { Blocks } from 'components/Blocks';
import PostHead from 'components/PostHead';
import styles from './post.module.scss';
import { isLowbackFileId, lowbackFileIdToUrl } from 'utils/imgParser';


const Post = ({ post, path }) => {

    const { img } = path
    const imgPath = isLowbackFileId(img) ? lowbackFileIdToUrl(img) : img

    return (
        <div className={styles.wrap}>
            <PostHead title={post.title} img={imgPath} />
            <Blocks post={post} />
        </div>
    )
}

export default Post