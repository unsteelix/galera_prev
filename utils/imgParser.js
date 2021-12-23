import { lowback_url } from './querys';
import Image from 'next/image'
import { oneImg } from 'components/renders/img/img.module.scss'
import styles from 'components/renders/img/img.module.scss'
import { uid } from 'uid/secure';

/**
 * without any size transformations
 */
export const normalEngine = ({ options, sources }) => {

    return sources.map((source, i) => {

        /**
         * external (NOT from lowback)
         */
        if(isValidURL(source)) {
            return (
                <img
                    className={oneImg} 
                    key={`img-normal-${source}-${i}`}
                    src={source}
                    alt={source}
                />
            )
        }

        /**
         * from lowback
         */
        const width = source.split('_')[1]
        const height = source.split('_')[2]

        return (
            <Image
                className={oneImg} 
                key={`img-normal-${source}-${i}`}
                src={lowbackFileIdToUrl(source)}
                alt={source}
                layout="intrinsic"
                width={width}
                height={height}
            />
        )

    })
}


/**
 * background cover
 */
export const coverEngine = ({ options, sources }) => {

    /**
     * Does NOT matter from the lowback or not
     */
    return sources.map((source, i) => {
        const id = uid(10);
        
        return (
            <div className={oneImg} key={`img-cover-${id}`} >
                <style jsx>{`
                    .img-c-${id} {
                        background: url('${isLowbackFileId(source) ? lowbackFileIdToUrl(source) : source}') no-repeat;
                        width:100%;
                        height:100vh;
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-attachment: fixed;
                    }
                `}</style>
                <div className={`img-c-${id}`}></div>
            </div>       
        )
    })
}


/**
 * full wide width
 */
export const wideEngine = ({ options, sources }) => {

    return sources.map((source, i) => {
    
        /**
         * external (NOT from lowback)
         */
        if(isValidURL(source)) {
            return (
                <img
                    className={oneImg} 
                    key={`img-wide-${source}-${i}`}
                    src={source}
                    alt={source}
                />
            )
        }

        /**
         * from lowback
         */
        const width = source.split('_')[1]
        const height = source.split('_')[2]

        return (
            <Image
                className={oneImg}
                key={`img-wide-${source}-${i}`}
                src={lowbackFileIdToUrl(source)}
                alt={source}
                layout="responsive"
                width={width}
                height={height}
            />
        )

    })
}



export const imgTypes = {
    normal: normalEngine,
    cover: coverEngine,
    wide: wideEngine
}

export const defaultType = 'wide'


export const isValidURL = (str) => {
    const res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

/**
 * return true, if this str - fileID from lowback
 */
export const isLowbackFileId = (str) => {
    if(!isValidURL(str) && str.length >= 14 && str.split('_').length === 3){
        return true
    }

    return false
}

export const lowbackFileIdToUrl = (fileId) => {
    return `${lowback_url}/files/${fileId}`
}



export const parseAttributes = (str) => {

    const parts = str.trim().split(' ')
    const count = parts.length

    let type = ''
    const sources = []
    const options = []

    for(let i = 0; i < count; i++) {
        const el = parts[i]

        /**
         * all parts over 10 are sources
         */
        if(el.length > 10){
            sources.push(el)
        } else {
            if(i >= 1){
                options.push(el)
            }
        }
    }

    if(count >= 2) {
        type = parts[0]
    }

    return {
        type,
        options,
        sources
    }
}

export const checkType = (type) => {
    if(type === '') return defaultType

    const types = Object.keys(imgTypes)
    if(!types.includes(type)){
        throw new Error (`type "${type}" not found. Try: ${Object.keys(imgTypes).join(' | ')}`)
    } else {
        return type
    }
}


/**
 * return img type by input str
 * @param {string} str 
 */
export const parseImgType = (str) => {
    const { type } = parseAttributes(str);
    return checkType(type)
}


const parseImg = (str) => {
    const { type, options, sources } = parseAttributes(str);

    const engine = imgTypes[checkType(type)]

    console.log('\n\n=== engine ===', checkType(type), ' +++ ', type, '\n\n')

    return (
        <div className={styles[`img-${checkType(type)}`]}>
            {engine({ 
                sources, 
                options 
            })}
        </div>
    )
}


export default parseImg