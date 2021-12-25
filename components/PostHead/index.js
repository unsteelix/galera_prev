import styles, { wrap } from './PostHead.module.scss';
import Image from 'next/image';


const PostHead  = ({ title, img }) => {

    return (
        <div className={ wrap }>
            <div className={ styles.title }>
                { title }
            </div>
            <div className={ styles.imgWrap }>
                <Image 
                    src={img}
                    priority 
                    objectFit='cover'
                    layout="fill"
                />
            </div>
        </div>
    )
}

export default PostHead