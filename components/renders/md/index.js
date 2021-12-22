import showdown from 'showdown';
import styles from './md.module.scss';

const mdRender = (block) => {
    const converter = new showdown.Converter()

    return <div className={styles.wrap}>
        <div className={styles.content} dangerouslySetInnerHTML={{
            __html: converter.makeHtml(block.data)
        }} />
    </div>
}

export default mdRender