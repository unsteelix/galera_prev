import { GALERA_PASSWORD } from "utils/constants";

export function middleware(req, ev) {

    const { cookies } = req;
    const { password } = cookies;

    if(!password) {
        return new Response('You must be authorizated') 
    }

    if(password !== GALERA_PASSWORD) {
        return new Response('Bad password') 
    }

}