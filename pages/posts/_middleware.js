import { GALERA_PASSWORD } from "utils/constants";
import { LOWBACK_URL, GALERA_TOKEN } from 'utils/constants'

export async function middleware(req, ev) {

    try {
        const { cookies } = req;
        const { password } = cookies;
        const hrefFull = req.nextUrl.href;
        const href = hrefFull.slice(6, hrefFull.length)

        const isLoggedin = password === GALERA_PASSWORD


        let request = new Request(`${LOWBACK_URL}/get/galera/paths`, {
            method: 'GET',
            headers: new Headers({
              'Content-Type': 'application/json; charset=UTF-8',
              Authorization: `Bearer ${GALERA_TOKEN}`,
            })
        });

        const resData = await fetch(request)
        const paths = await resData.json()

        let curPath = Object.values(paths).find(el => el.path === href);

        // not auth user
        if(!isLoggedin) {
            if( (curPath.path === href) && curPath.isHidden ) {
                return new Response('Is hidden path')
            }
        }

    } catch(e) {
        console.log(e)
        return new Response(e.message)
    }
}