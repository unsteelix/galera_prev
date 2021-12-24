import Cover from 'components/Cover';
import styles from './Covers.module.scss';

const Covers = (params) => {
    const { paths, isLoggined } = params;

    const filteredPaths = isLoggined ? paths : paths.filter(path => !path.isHidden)

    return (
        <div className={styles.wrap} >
            <div className={styles.container}>
                {filteredPaths.map(el => <div key={el.id} className={styles.oneCover}><Cover path={el} /></div>)}
            </div>
        </div>
    )
}

export default Covers