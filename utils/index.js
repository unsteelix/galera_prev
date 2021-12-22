import USID from 'usid';
import querys from './querys';

export const usid = new USID();

export const removeFirstSlash = (str) => {
    let res = str.trim();
    
    if(res[0] === '/'){
        res = res.slice(1, res.length)
    }

    return res
}

/**
 * 
 * @param {array} paths - list of path obj
 * @param {string} path  -  
 */
export const getChildPaths = (paths, pathStr) => {

    const res = []

    if(pathStr === '/') {

        paths.forEach(el => {
            const anotherPath = el.path
    
            if(anotherPath.indexOf(pathStr) === 0) {
                if(anotherPath.split('/').length === 2 && anotherPath !== '/'){
                    res.push(el)
                }
            }
        })

    } else {

        paths.forEach(el => {
            const anotherPath = el.path
    
            if(anotherPath.indexOf(pathStr) === 0) {
                if(anotherPath.split('/').length === pathStr.split('/').length + 1){
                    res.push(el)
                }
            }
        })

    }

    return res
}

export const filterPathsByType = (paths, type) => {
    return paths.map(path => path.type === type && type)
}


export const getPathType = (paths, pathStr) => {
    if(pathStr === '/') return 'folder';
    const path = paths.find(el => el.path === pathStr)
    return path.type
}

export const sortByKey = (list, key) => list.sort((a, b) => a[key] - b[key])


export const getPageTypeAndData = async (pathStr) => {

    try {

        const paths = await querys.fetchPaths();
        const listPath = Object.values(paths);

        let type = getPathType(listPath, pathStr);
        let path = listPath.find(el => el.path === pathStr);
        
        if(!path){
            return null
        }

        if(type === 'post'){
    
            const postId = path.postId;
            const post = await querys.fetchPost(postId);
    
            return {
                props: {
                    data: {
                        type: 'post',
                        path,
                        paths: listPath,
                        payload: post
                    }
                }
            }
        }
    
        if(type === 'folder'){
    
            const children = getChildPaths(listPath, pathStr);
            const sortedChildren = sortByKey(children, 'priority')

            return {
                props: {
                    data: {
                        type: 'folder',
                        path,
                        paths: listPath,
                        payload: sortedChildren
                    }
                }
            }
        }

    } catch(e) {
        throw new Error('failed when fetching page type and data', e)
    }    
}