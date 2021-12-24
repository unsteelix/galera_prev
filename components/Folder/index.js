import Covers from 'components/Covers';
import styles from './folder.module.scss';


const Folder = ({ childrenPaths, isLoggined }) => {
    return (
        <div className={styles.wrap}>
            <Covers paths={childrenPaths} isLoggined={isLoggined} />
        </div>
    )
}

export default Folder