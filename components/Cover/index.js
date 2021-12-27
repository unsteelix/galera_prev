import styles from './Cover.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { isLowbackFileName, lowbackFileNameToUrl } from 'utils/imgParser';


const Cover = (params) => {

    const { type, title, img, path } = params.path;

    const imgPath = isLowbackFileName(img) ? lowbackFileNameToUrl(img) : img;

    console.log(`\n\n original [${img}] \n lowbackFileNameToUrl [${imgPath}] \n`)

    return (
        <div className={styles.wrap}>
            <Link href={`/posts${path}`}>
                <a>
                    <Image 
                        src={imgPath}
                        priority
                        layout='fill'
                        objectFit='cover'
                    />
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