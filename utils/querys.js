import axios from 'axios';
import { LOWBACK_URL, GALERA_TOKEN, LOWBACK_URL_FOR_ADMIN_UPLOAD_FORM } from './constants';



/**
 * 
 * @param {*} options { includeDeleted: true } - for fetching all posts, include deleted
 * @returns 
 */
export const fetchPosts = async ({ options }) => {
    try {
        const res = await axios.get(`${LOWBACK_URL}/get/galera/posts`, {
            headers: {
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 


        /**
         * включая удаленные посты
         */
         if(options && 'includeDeleted' in options && options.includeDeleted){
            return res.data;
        }

        /**
         * неудаленные
         */
        const allPosts = res.data

        const posts = {}

        for(let key in allPosts){
            const post = allPosts[key];
            if(('isDeleted' in post && !post.isDeleted) || !('isDeleted' in post)){
                posts[key] = post
            }
        }

        return posts

    } catch(e) {
        console.log('ERROR [fetchPosts]', e.message)
        throw new Error(e)
    }
} 

export const fetchPost = async ({ id }) => {
    try {
        const res = await axios.get(`${LOWBACK_URL}/get/galera/posts/${id}`, {
            headers: {
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 

        return res.data

    } catch(e) {
        console.log('ERROR [fetchPost]', e.message)
        throw new Error(e)
    }
}

export const fetchPostBlock = async ({ postId, blockId }) => {
    try {
        const res = await axios.get(`${LOWBACK_URL}/get/galera/posts/${postId}/data/${blockId}`, {
            headers: {
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 

        return res.data

    } catch(e) {
        console.log('ERROR [fetchPostBlock]', e.message)
        throw new Error(e)
    }
}

export const addPost = async ({ id, post }) => {
    try {
        const res = await axios.post(`${LOWBACK_URL_FOR_ADMIN_UPLOAD_FORM}/push/galera/posts/${id}`, JSON.stringify(post), {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 

        return res.data

    } catch(e) {
        console.log('ERROR [addPost]', e.message)
        throw new Error(e)
    }
}

export const deletePost = async ({ id }) => {
    try {
        const res = await axios.post(`${LOWBACK_URL_FOR_ADMIN_UPLOAD_FORM}/push/galera/posts/${id}/isDeleted`, true, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${GALERA_TOKEN}`,
            }
        }); 

        return res.data

    } catch(e) {
        console.log('ERROR [deletePost]', e.message)
        throw new Error(e)
    }
}

export const deletePostBlock = async ({ postId, blockId }) => {
    try {
        const res = await axios.get(`${LOWBACK_URL}/delete/galera/posts/${postId}/data/${blockId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${GALERA_TOKEN}`,            
            }
        }); 

        return res.data

    } catch(e) {
        console.log('ERROR [deletePostBlock]', e.message)
        throw new Error(e)
    }
}

export const updatePostTitle = async ({ id, title }) => {
    try {
        const res = await axios.post(`${LOWBACK_URL_FOR_ADMIN_UPLOAD_FORM}/push/galera/posts/${id}/title`, JSON.stringify(title), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${GALERA_TOKEN}`,
            }
        }); 

        return res.data

    } catch(e) {
        console.log('ERROR [updatePostTitle]', e.message)
        throw new Error(e)
    }
}

export const updatePostData = async ({ id, data }) => {
    try {
        const res = await axios.post(`${LOWBACK_URL}/push/galera/posts/${id}/data`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${GALERA_TOKEN}`,            
            }
        })

        return res.data
        
    } catch(e) {
        console.log('ERROR [updatePostData]', e.message)
        throw new Error(e)    
    }
}

export const updatePostDataBlock = async ({ postId, block }) => {
    try {
        const res = await axios.post(`${LOWBACK_URL_FOR_ADMIN_UPLOAD_FORM}/merge/galera/posts/${postId}/data/${block.id}`, JSON.stringify(block), {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 

        return res.data

    } catch(e) {
        console.log('ERROR [updatePostDataBlock]', e.message)
        throw new Error(e)
    }
}

export const countPostBlocks = async ({ id }) => {
    try {
        const res = await axios.get(`${LOWBACK_URL}/get/galera/posts/${id}/data`, {
            headers: {
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 

        return Object.values(res.data).length

    } catch(e) {
        console.log('ERROR [countPostBlocks]', e.message)
        throw new Error(e)
    }
}

export const fetchPaths = async () => {
    try {
        const res = await axios.get(`${LOWBACK_URL}/get/galera/paths`, {
            headers: {
                Authorization: `Bearer ${GALERA_TOKEN}`,
            }
        })

        return res.data
        
    } catch(e) {
        console.log('ERROR [fetchPaths]', e.message)
        throw new Error(e)
    }
}

export const fetchPath = async ({ id }) => {
    try {
        const res = await axios.get(`${LOWBACK_URL}/get/galera/paths/${id}`, {
            headers: {
                Authorization: `Bearer ${GALERA_TOKEN}`,
            }
        })

        return res.data
        
    } catch(e) {
        console.log('ERROR [fetchPath]', e.message)
        throw new Error(e)
    }
}

export const deletePath = async ({ id }) => {
    try {
        const res = await axios.get(`${LOWBACK_URL_FOR_ADMIN_UPLOAD_FORM}/delete/galera/paths/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${GALERA_TOKEN}`,
            }
        })

        return res.data

    } catch(e) {
        console.log('ERROR [deletePath]', e.message)
        throw new Error(e)
    }
}

export const updatePath = async ({ id, path }) => {
    try {
        const res = await axios.post(`${LOWBACK_URL_FOR_ADMIN_UPLOAD_FORM}/merge/galera/paths/${id}`, JSON.stringify(path), {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 

        return res.data

    } catch(e) {
        console.log('ERROR [updatePath]', e.message)
        throw new Error(e)
    }
}

export const uploadFiles = async ({ formData }) => {
    try {
        const res = await axios.post(`${LOWBACK_URL_FOR_ADMIN_UPLOAD_FORM}/upload/files`, formData, {
            headers: {
                "Content-type": "multipart/form-data",
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 

        return res.data

    } catch(e) {
        console.log('ERROR [uploadFiles]', e.message)
        throw new Error(e)
    }
}

export const auth = async ({ pass }) => {
    try {
        const res = await axios.get(`/api/pass/${pass}`); 

        return res.data

    } catch(e) {
        console.log('ERROR [auth]', e.message)
        throw new Error(e)
    }
}

export const fetchFileById = async ({ id }) => {
    try {
        const res = await axios.get(`${LOWBACK_URL}/files/${id}`); 

        return res.data

    } catch(e) {
        console.log('ERROR [fetchFileById]', e.message)
        throw new Error(e)
    }
}



const querys = {
    fetchPosts,
    fetchPost,
    fetchPostBlock,
    addPost,
    deletePost,
    deletePostBlock,
    updatePostTitle,
    updatePostData,
    updatePostDataBlock,
    countPostBlocks,

    fetchPaths,
    fetchPath,
    deletePath,
    updatePath,

    uploadFiles,

    auth,

    fetchFileById
}

export default querys