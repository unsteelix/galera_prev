import Cover from 'components/Cover';
import styles from './Covers.module.scss';

const Covers = (params) => {
    const { paths } = params;

    return (
        <div className={styles.wrap} >
            <div className={styles.container}>
                {paths.map(el => <div key={el.id} className={styles.oneCover}><Cover path={el} /></div>)}
            </div>
        </div>
    )
}

export default Covers