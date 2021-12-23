import Covers from 'components/Covers';
import styles from './folder.module.scss';


const Folder = ({children}) => {
    return (
        <div className={styles.wrap}>
            <Covers paths={children} />
        </div>
    )
}

export default Folder