import styles from './Cover.module.scss';
import Image from 'next/image';
import Link from 'next/link'


const Cover = (params) => {

    const { type, title, img, path } = params.path;

    return (
        <div className={styles.wrap}>
            <Link href={`/posts${path}`}>
                <a>
                <div className={type === 'post' ? styles.post : styles.folder}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.imgContainer}>
                        <Image
                            src={img}
                            alt={title}
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    </div>
                </div>
                </a>
            </Link>
        </div>
    )
}

export default Cover