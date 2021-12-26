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
        throw new Error('[fetchPosts]: ', e.message)
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
        throw new Error('[fetchPost]: ', e.message)
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
        throw new Error('[fetchPostBlock]: ', e.message)
    }
}

export const addPost = async ({ id, post }) => {
    try {
        const res = await axios.post(`${LOWBACK_URL}/push/galera/posts/${id}`, JSON.stringify(post), {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 

        return res.data

    } catch(e) {
        throw new Error('[addPost]: ', e.message)
    }
}

export const deletePost = async ({ id }) => {
    try {
        const res = await axios.post(`${LOWBACK_URL}/push/galera/posts/${id}/isDeleted`, true, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${GALERA_TOKEN}`,
            }
        }); 

        return res.data

    } catch(e) {
        throw new Error('[deletePost]: ', e.message)
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
        throw new Error('[deletePostBlock]: ', e.message)
    }
}

export const updatePostTitle = async ({ id, title }) => {
    try {
        const res = await axios.post(`${LOWBACK_URL}/push/galera/posts/${id}/title`, JSON.stringify(title), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${GALERA_TOKEN}`,
            }
        }); 

        return res.data

    } catch(e) {
        throw new Error('[updatePostTitle]: ', e.message)
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
        throw new Error('[updatePostData]: ', e.message)
    }
}

export const updatePostDataBlock = async ({ postId, block }) => {
    try {
        const res = await axios.post(`${LOWBACK_URL}/merge/galera/posts/${postId}/data/${block.id}`, JSON.stringify(block), {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 

        return res.data

    } catch(e) {
        throw new Error('[updatePostDataBlock]: ', e.message)
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
        throw new Error('[countPostBlocks]: ', e.message)
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
        throw new Error('[fetchPaths]: ', e.message)
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
        throw new Error('[fetchPath]: ', e.message)
    }
}

export const deletePath = async ({ id }) => {
    try {
        const res = await axios.get(`${LOWBACK_URL}/delete/galera/paths/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${GALERA_TOKEN}`,
            }
        })

        return res.data

    } catch(e) {
        throw new Error('[deletePath]: ', e.message)
    }
}

export const updatePath = async ({ id, path }) => {
    try {
        const res = await axios.post(`${LOWBACK_URL}/merge/galera/paths/${id}`, JSON.stringify(path), {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 

        return res.data

    } catch(e) {
        throw new Error('[updatePath]: ', e.message)
    }
}

export const uploadFiles = async ({ formData }) => {
    try {
        console.log('\n\n ====WWWWWW======\n\n', LOWBACK_URL)
        const res = await axios.post(`${LOWBACK_URL_FOR_ADMIN_UPLOAD_FORM}/upload/files`, formData, {
            headers: {
                "Content-type": "multipart/form-data",
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 

        return res.data

    } catch(e) {
        throw new Error('[uploadFiles]: ', e.message)
    }
}

export const auth = async ({ pass }) => {
    try {
        const res = await axios.get(`/api/pass/${pass}`); 

        return res.data

    } catch(e) {
        throw new Error('[auth]:', e.message)
    }
}

export const fetchFileById = async ({ id }) => {
    try {
        const res = await axios.get(`${LOWBACK_URL}/files/${id}`); 

        return res.data

    } catch(e) {
        throw new Error('[fetchFileById]:', e.message)
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