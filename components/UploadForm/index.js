import React, { useState, useEffect } from 'react';
import querys from 'utils/querys';
import styles from './uploadForm.module.scss';

const UploadForm = (props) => {

    const { onFinish } = props;

    const [files, setFiles] = useState()
    const [msg, setMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const onUploadBtn = async () => {
        setIsLoading(true)

        const formData = new FormData();

        files.forEach(file => {
            formData.append( 
                "files[]", 
                file  
            );             
        });


        const res = await querys.uploadFiles(formData);
        setIsLoading(false)

        const message = res.map(el => el.value.id).join('\n')
        setMsg(message)
        
        onFinish(res)
    }

    const onChange = (e) => {
        const files = e.target.files;
        setFiles(Object.values(files))
    }

    return(
        <div className={styles.wrap}>
            {isLoading ? 
                <div className={styles.loading}>...Loading</div> 
                : 
                <div className={styles.buttons}>
                    <input type="file" multiple name="files" onChange={onChange}  />
                    <div className={styles.uploadBtn} onClick={onUploadBtn}>upload</div>
                </div>
            }
            <div className={styles.msg}>{msg}</div>

        </div>
    )
}

export default UploadForm