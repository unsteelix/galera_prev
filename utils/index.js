import querys from './querys';


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
            const post = await querys.fetchPost({ id: postId });
    
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


/**
 * 
 * @returns true if the current user is logged in
 */
export const isLoggedIn = () => {
    try {
        const password = getCookie('password')

        if(password) {
            return true
        }
        return false
    } catch (e) {
        console.log(e.message)
        throw new Error('You are not authorizated')
        //return false
    }
}


/**
 * checking password
 * setting password cookie
 * 
 * @param {string} pass 
 * @returns 
 */
export const logIn = async (pass) => {
    try {
        const password = await querys.auth({ pass })
        if(!password) throw new Error('bad password')

        setCookie('password', password, { 'max-age': 3600 })

        return password
        
    } catch(e) {
        console.error('failed loggining: ', e.message)
        return false
    }
}

/**
 * deleting password cookie
 */
export const logOut = () => {
    deleteCookie('password')
}


export const getCookie = (name) => {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


export const setCookie = (name, value, options = {}) => {

    options = {
      path: '/',
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
}


export const deleteCookie = (name) => {
    setCookie(name, "", {
        'max-age': -1
    })
}


export const myLoader = ({ src, width, quality }) => {
    return `${src}`
}

export const parseSizeFromFileName = (fileName) => {
    const [name, ext] = fileName.split('.')
    const [other, width, height] = name.split('_')
    
    return {
        width,
        height
    }
}