import styles, { wrap } from './PostHead.module.scss';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { isLowbackFileId, lowbackFileIdToUrl } from 'utils/imgParser';


const PostHead  = ({ title, img }) => {

    const [isReady, setIsReady] = useState(false);
    const [imgPath, setImgPath] = useState(img);

    useEffect(async () => {

        if( isLowbackFileId(img) ) {
            const res = await lowbackFileIdToUrl(img)
            
            setImgPath(res)
            setIsReady(true)
        }
        setIsReady(true)

    }, []);


    return (
        <div className={ wrap }>
            <div className={ styles.title }>
                { title }
            </div>
            <div className={ styles.imgWrap }>
            {isReady ? (
                <Image 
                    src={imgPath}
                    priority 
                    objectFit='cover'
                    layout="fill"
                />
            ) : 'Loading'}
            </div>
        </div>
    )
}

export default PostHead