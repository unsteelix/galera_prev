//export const LOWBACK_URL = 'https://kali.unsteelix.keenetic.link';
//export const LOWBACK_URL = 'http://localhost:8000';

export const LOWBACK_URL = process.env.LOWBACK_URL;

export const GALERA_TOKEN = process.env.GALERA_TOKEN;

export const GALERA_PASSWORD = process.env.GALERA_PASSWORD;

export const LOWBACK_URL_FOR_ADMIN_UPLOAD_FORM = 'http://localhost:8000';

console.log(`\n\n ENVS:\n[${LOWBACK_URL}]\n[${GALERA_TOKEN}]\n[${GALERA_PASSWORD}]\n[${LOWBACK_URL_FOR_ADMIN_UPLOAD_FORM}]\n`)

export default {
    LOWBACK_URL,
    GALERA_TOKEN,
    GALERA_PASSWORD
}