import styles from './img.module.scss';

const imgRender = (block) => {

    return (
        <div className={styles.wrap}>
            <div className={styles.content} >
                <img src={block.data} alt={block.data} />
            </div>
        </div>
    )
}

export default imgRender