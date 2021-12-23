import Covers from 'components/Covers';
import styles from './folder.module.scss';


const Folder = ({childrenPaths}) => {
    return (
        <div className={styles.wrap}>
            <Covers paths={childrenPaths} />
        </div>
    )
}

export default Folder