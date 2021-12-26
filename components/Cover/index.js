import styles from './Cover.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { isLowbackFileId, lowbackFileIdToUrl } from 'utils/imgParser';
import { useState, useEffect } from 'react';


const Cover = (params) => {

    const { type, title, img, path } = params.path;

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
        <div className={styles.wrap}>
            <Link href={`/posts${path}`}>
                <div className={type === 'post' ? styles.post : styles.folder}>
                    
                    <div className={styles.title}>{title}</div>
                    
                    <div className={styles.imgContainer}>
                        {isReady ? (
                            <Image
                                src={imgPath}
                                alt={title}
                                layout="fill"
                                objectFit="cover"
                                priority
                            />)
                            :
                            'Loading'
                        }
                    </div>

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

                </div>
            </Link>
        </div>
    )
}

export default Cover