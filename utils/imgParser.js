import { LOWBACK_URL } from './constants';
import Image from 'next/image'
import { oneImg } from 'components/renders/img/img.module.scss'
import styles from 'components/renders/img/img.module.scss'
import { uid } from 'uid/secure';
import querys from 'utils/querys';
import { useState, useEffect } from 'react';

const quality = 85;



/**
 * without any size transformations
 */
export const normalEngine = ({ options, sources }) => {

    return sources.map( async (source, i) => {

        /**
         * external (NOT from lowback)
         */
        if(!isLowbackIMG(source)) {
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
                src={source}
                alt={source}
                layout="intrinsic"
                width={width}
                height={height}
                quality={quality}
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
                        background: url('${source}') no-repeat;
                        width:100%;
                        height:100vh;
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-attachment: fixed;
                        background-position: center;
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
        if(!isLowbackIMG(source)) {
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
                src={source}
                alt={source}
                layout='responsive'
                objectFit='cover'
                width={width}
                height={height}
                quality={quality}
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
 * return true if img from lowback
 */
export const isLowbackIMG = (imgPath) => {
    if(imgPath.includes(LOWBACK_URL)){
        return true
    } else {
        return false
    }
}

/**
 * return true, if this str - fileID from lowback
 */
export const isLowbackFileId = (str) => {
    if(!isValidURL(str) && str.length >= 14 && str.split('_').length === 3){
        return true
    }

    return false
}


/**
 * return true, if this str - fileName from lowback
 */
export const isLowbackFileName = (str) => {
    const parts = str.split('.')

    if(parts.length === 2) {
        const name = parts[0]

        if(!isValidURL(name) && name.length >= 14 && name.split('_').length === 3){
            return true
        }
    }

    return false
}



export const lowbackFileNameToUrl = (fileName) => {

    const res = `/api/image/${fileName}`
        
    console.log(`[${fileName}] => [${res}]`)

    return res
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

    //const [data, setData] = useState('Loading')

    const newSources = sources.map(source => isLowbackFileName(source) ? lowbackFileNameToUrl(source) : source)

    const engine = imgTypes[checkType(type)]
            

    // useEffect( async () => {

    //     try {

    //         for (const source of sources) {
    //             const newSource = isLowbackFileId(source) ? await lowbackFileIdToUrl(source) : source;
    //             newSources.push(newSource)
    //         }

    //         const engine = imgTypes[checkType(type)]
            
    //         console.log('\n\nSOURSED', newSources, '\n\n')

    //         setData(engine({ 
    //             sources: newSources, 
    //             options 
    //         }))

    //     } catch(e) {
    //         console.error(`failed rendering img ${type} block: ` + e.message)
    //         setData(<div>{e.message}</div>)
    //     }
        
    // }, []);

    return (
        <div className={styles[`img-${checkType(type)}`]}>
            {engine({ 
                sources: newSources, 
                options 
            })}
        </div>
    )
}


export default parseImg