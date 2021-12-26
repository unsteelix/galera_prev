import styles, { wrap } from './PostHead.module.scss';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { isLowbackFileName, lowbackFileNameToUrl } from 'utils/imgParser';


const PostHead  = ({ title, img }) => {

    // const [isReady, setIsReady] = useState(false);
    // const [imgPath, setImgPath] = useState(img);

    // useEffect(async () => {

    //     if( isLowbackFileId(img) ) {
    //         const res = await lowbackFileIdToUrl(img)
            
    //         setImgPath(res)
    //         setIsReady(true)
    //     }
    //     setIsReady(true)

    // }, []);

    const imgPath = isLowbackFileName(img) ? lowbackFileNameToUrl(img) : img;

    return (
        <div className={ wrap }>
            <div className={ styles.title }>
                { title }
            </div>
            <div className={ styles.imgWrap }>
                <img src={imgPath} />


                 {/* <Image
                    src={imgPath}
                    alt={imgPath}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />  */}
            </div>
        </div>
    )
}

export default PostHead