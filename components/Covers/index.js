import Cover from 'components/Cover';
import styles from './Covers.module.scss';

const Covers = (params) => {
    const { paths } = params;

    return (
        <div className={styles.wrap} >
            {paths.map(el => <Cover key={el.id} path={el} />)}
        </div>
    )
}

export default Covers