import axios from "axios";


/**
 * make request to Next.js backend 
 */
const Api = async (method, data) => {
    try {
        console.log(`\n\n[API CALL] [${method}]\n\n`, data, '\n\n')
        const res = await axios.post(`/api/admin/${method}`, data); 

        return res.data

    } catch(e) {
        console.log(`[API CALL ERROR] ${method}:`, e)
        throw new Error(`[API] ${method}:`, e)
    }
}


export default Api