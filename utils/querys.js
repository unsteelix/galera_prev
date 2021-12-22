import axios from 'axios';

export const lowback_url = 'https://kali.unsteelix.keenetic.link';
export const lowback_token = 'master_token';


/**
 * 
 * @param {*} options { includeDeleted: true } - for fetching all posts, include deleted
 * @returns 
 */
export const fetchPosts = async (options) => {
    const res = await fetch(`${lowback_url}/get/galera/posts`, {
        headers: {
            Authorization: `Bearer ${lowback_token}`
        }
    })

    if (res.ok) {

        /**
         * включая удаленные посты
         */
        if(options && 'includeDeleted' in options && options.includeDeleted){
            return await res.json();
        }

        /**
         * неудаленные
         */
        const allPosts = await res.json();

        const posts = {}

        for(let key in allPosts){
            const post = allPosts[key];
            if(('isDeleted' in post && !post.isDeleted) || !('isDeleted' in post)){
                posts[key] = post
            }
        }

        return posts
      } else {
        throw new Error(res.status + res.text)
    }
} 

export const fetchPost = async (id) => {
    const res = await fetch(`${lowback_url}/get/galera/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${lowback_token}`
        }
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const fetchPostBlock = async (postId, blockId) => {
    const res = await fetch(`${lowback_url}/get/galera/posts/${postId}/data/${blockId}`, {
        headers: {
            Authorization: `Bearer ${lowback_token}`
        }
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const addPost = async (id, post) => {
    const res = await fetch(`${lowback_url}/push/galera/posts/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${lowback_token}`,
        },
        body: JSON.stringify(post)
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const deletePost = async (id) => {
    const res = await fetch(`${lowback_url}/push/galera/posts/${id}/isDeleted`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${lowback_token}`,
        },
        body: true
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const deletePostBlock = async (postId, blockId) => {
    const res = await fetch(`${lowback_url}/delete/galera/posts/${postId}/data/${blockId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${lowback_token}`,
        }
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const updatePostTitle = async (id, title) => {
    const res = await fetch(`${lowback_url}/push/galera/posts/${id}/title`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${lowback_token}`,
        },
        body: JSON.stringify(title)
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const updatePostData = async (id, data) => {
    const res = await fetch(`${lowback_url}/push/galera/posts/${id}/data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${lowback_token}`,
        },
        body: JSON.stringify(data)
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const updatePostDataBlock = async (postId, block) => {
    const res = await fetch(`${lowback_url}/merge/galera/posts/${postId}/data/${block.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${lowback_token}`,
        },
        body: JSON.stringify(block)
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const countPostBlocks = async (id) => {
    const res = await fetch(`${lowback_url}/get/galera/posts/${id}/data`, {
        headers: {
            Authorization: `Bearer ${lowback_token}`
        }
    })

    if (res.ok) {
        const blocks = await res.json();
        return Object.values(blocks).length
      } else {
        throw new Error(res.status + res.text)
    }
}

export const fetchPaths = async () => {
    const res = await fetch(`${lowback_url}/get/galera/paths`, {
        headers: {
            Authorization: `Bearer ${lowback_token}`
        }
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const deletePath = async (id) => {
    const res = await fetch(`${lowback_url}/delete/galera/paths/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${lowback_token}`,
        }
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const updatePath = async (id, path) => {
    const res = await fetch(`${lowback_url}/merge/galera/paths/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${lowback_token}`,
        },
        body: JSON.stringify(path)
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const uploadFiles = async (formData) => {

    try {
        const res = await axios.post(`${lowback_url}/upload/files`, formData, {
            headers: {
                "Content-type": "multipart/form-data",
                "Authorization": `Bearer ${lowback_token}`
            }
        }); 

        return res.data

    } catch(e) {
        throw new Error('failed files uploading:', e.message)
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
    deletePath,
    updatePath,

    uploadFiles
}

export default querys