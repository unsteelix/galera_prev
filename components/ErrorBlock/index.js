import styles from './ErrorBlock.module.scss'

const ErrorBlock = ({text}) => {

    return(
        <div className={styles.wrap}>{text}</div>
    )
}

export default ErrorBlock