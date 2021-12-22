import styles from './EditBlockForm.module.scss';
import UploadForm from 'components/UploadForm';
import TypeSelector from 'components/TypeSelector';




const EditBlockForm = (params) => {
    const { block, onFormChange, onSaveBtn, onDeleteBtn } = params;
  
    const onTextareaChange = (val) => {
        onFormChange({
            ...block,
            data: val
        })
    }

    const onTypeChange = (val) => {
        onFormChange({
            ...block,
            type: val
        })
    }

    const onPositionChange = (val) => {
        onFormChange({
            ...block,
            position: parseInt(val)
        })
    }

    const onFinishUpload = (val) => {

        const extra = '\n\n' + val.map(el => el.value.id).join('\n');

        onFormChange({
            ...block,
            data: block.data + extra
        })
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.buttons}>
                <div className={styles.oneBtn} onClick={() => onSaveBtn()}>
                    <div className={styles.btnSave}>save</div>
                </div>
                <div className={styles.oneBtn} onClick={() => onDeleteBtn()}>
                    <div className={styles.btnDelete}>delete</div>
                </div>
                <div className={styles.oneBtn}>
                    <TypeSelector onChange={(type) => onTypeChange(type)} initValue={block.type} />
                </div>
                <div className={styles.oneBtn}>
                    <input className={styles.positionInput} type="number" value={block.position} onChange={(e) => onPositionChange(e.target.value)} />
                </div>
            </div>
            <div className={styles.edits}>
                <textarea autoFocus value={block.data} onChange={(e) => onTextareaChange(e.target.value)} cols={100} rows={30} />
                <UploadForm onFinish={(val) => onFinishUpload(val)} />
            </div>
        </div>
    )
}

export default EditBlockForm