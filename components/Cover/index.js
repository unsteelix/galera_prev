import styles from './Cover.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { isLowbackFileName, lowbackFileNameToUrl } from 'utils/imgParser';
import { useState, useEffect } from 'react';


const Cover = (params) => {

    const { type, title, img, path } = params.path;

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

    console.log(`\n\n original [${img}] \n lowbackFileNameToUrl [${imgPath}] \n`)

    return (
        <div className={styles.wrap}>
            <Link href={`/posts${path}`}>
                <a>
                    <img src={imgPath} />

                    <div className={styles.title}>{title}</div>

                    {type === 'folder' && (
                        <div className={styles.folderIcon}>
                            <Image 
                                src={'/folder.svg'}
                                width={30}
                                height={30}
                                priority
                            />
                        </div>
                    )}
                </a>
            </Link>
        </div>
    )
}

export default Cover