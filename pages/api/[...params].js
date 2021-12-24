import { GALERA_TOKEN, GALERA_PASSWORD } from 'utils/constants'


export default async function api(req, res) {
  
    console.log('\n\n === ENVS ===', GALERA_TOKEN, GALERA_PASSWORD, '\n\n')

    console.log('\n\n === API ===', req.query, '\n\n')




    res.status(200).send(pass)
}










/**
 * 
 * @param {*} options { includeDeleted: true } - for fetching all posts, include deleted
 * @returns 
 */
 export const fetchPosts = async (options) => {
    const res = await fetch(`${LOWBACK_URL}/get/galera/posts`, {
        headers: {
            Authorization: `Bearer ${GALERA_TOKEN}`
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
    const res = await fetch(`${LOWBACK_URL}/get/galera/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${GALERA_TOKEN}`
        }
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const fetchPostBlock = async (postId, blockId) => {
    const res = await fetch(`${LOWBACK_URL}/get/galera/posts/${postId}/data/${blockId}`, {
        headers: {
            Authorization: `Bearer ${GALERA_TOKEN}`
        }
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const addPost = async (id, post) => {
    const res = await fetch(`${LOWBACK_URL}/push/galera/posts/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GALERA_TOKEN}`,
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
    const res = await fetch(`${LOWBACK_URL}/push/galera/posts/${id}/isDeleted`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GALERA_TOKEN}`,
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
    const res = await fetch(`${LOWBACK_URL}/delete/galera/posts/${postId}/data/${blockId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GALERA_TOKEN}`,
        }
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const updatePostTitle = async (id, title) => {
    const res = await fetch(`${LOWBACK_URL}/push/galera/posts/${id}/title`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GALERA_TOKEN}`,
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
    const res = await fetch(`${LOWBACK_URL}/push/galera/posts/${id}/data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GALERA_TOKEN}`,
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
    try {
        const res = await axios.post(`${LOWBACK_URL}/merge/galera/posts/${postId}/data/${block.id}`, JSON.stringify(block), {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 

        return res.data

    } catch(e) {
        throw new Error('failed updating post block:', e.message)
    }
}

export const countPostBlocks = async (id) => {
    try {
        const res = await axios.get(`${LOWBACK_URL}/get/galera/posts/${id}/data`, {
            headers: {
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 

        return Object.values(res.data).length

    } catch(e) {
        throw new Error('failed fetching count of posts:', e.message)
    }
}

export const fetchPaths = async () => {
    const res = await fetch(`${LOWBACK_URL}/get/galera/paths`, {
        headers: {
            Authorization: `Bearer ${GALERA_TOKEN}`
        }
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const deletePath = async (id) => {
    const res = await fetch(`${LOWBACK_URL}/delete/galera/paths/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GALERA_TOKEN}`,
        }
    })

    if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.status + res.text)
    }
}

export const updatePath = async (id, path) => {

    console.log('GGGG', GALERA_TOKEN)


    const res = await fetch(`${LOWBACK_URL}/merge/galera/paths/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GALERA_TOKEN}`,
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
        const res = await axios.post(`${LOWBACK_URL}/upload/files`, formData, {
            headers: {
                "Content-type": "multipart/form-data",
                "Authorization": `Bearer ${GALERA_TOKEN}`
            }
        }); 

        return res.data

    } catch(e) {
        throw new Error('failed files uploading:', e.message)
    }
}

export const auth = async (pass) => {
    try {
        const res = await axios.get(`/api/pass/${pass}`); 

        return res.data

    } catch(e) {
        throw new Error('failed authentication:', e.message)
    }
}