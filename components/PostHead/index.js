import styles, { wrap } from './PostHead.module.scss';
import Image from 'next/image';
import { isLowbackFileName, lowbackFileNameToUrl } from 'utils/imgParser';
import { myLoader } from 'utils'


const PostHead  = ({ title, img }) => {

    const imgPath = isLowbackFileName(img) ? lowbackFileNameToUrl(img) : img;

    return (
        <div className={ wrap }>
            <div className={ styles.title }>
                { title }
            </div>
            <div className={ styles.imgWrap }>
                <Image
                    loader={myLoader}
                    src={imgPath}
                    alt={imgPath}
                    layout="fill"
                    objectFit="cover"
                    quality={85}
                    priority
                />  
            </div>
        </div>
    )
}

export default PostHead