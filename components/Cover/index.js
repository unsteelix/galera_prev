import styles from './Cover.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { isLowbackFileId, lowbackFileIdToUrl } from 'utils/imgParser';


const Cover = (params) => {

    const { type, title, img, path } = params.path;

    const imgPath = isLowbackFileId(img) ? lowbackFileIdToUrl(img) : img

    return (
        <div className={styles.wrap}>
            <Link href={`/posts${path}`}>
                <div className={type === 'post' ? styles.post : styles.folder}>
                    
                    <div className={styles.title}>{title}</div>
                    
                    <div className={styles.imgContainer}>
                        <Image
                            src={imgPath}
                            alt={title}
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
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