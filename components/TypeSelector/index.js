import styles from './typeSelector.module.scss';
import { renderTypes } from 'utils/renders';


const TypeSelector = (props) => {
    const { onChange, initValue } = props

    const types = renderTypes.map(el => el.type)

    const list = types.map(type => (
        <div className={styles.oneType} onClick={() => onChange(type)} key={type}>
            {initValue === type ? <b>{type}</b> : type}
        </div>
    ))

    return (
        <div className={styles.wrap}>
            {list}
        </div>
    )
}

export default TypeSelector