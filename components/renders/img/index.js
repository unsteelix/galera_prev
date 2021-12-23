import styles from './img.module.scss';
import parseImg from 'utils/imgParser';

const imgRender = (block) => {

    const rawRows = block.data.split('\n');
    let rows = []

    rawRows.forEach(el => {
        const val = el.trim()

        if(val.length > 0) {
            rows.push(val)
        }
    })

    const key = (max) => Math.floor(Math.random() * max)

    const els = rows.map((el, i) => <div key={key(999)} className={styles.wrap}>{parseImg(el)}</div>)

    return (
        <div className={styles.wrap}>
            {els}
        </div>
    )
}

export default imgRender