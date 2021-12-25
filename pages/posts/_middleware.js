import { LOWBACK_URL, GALERA_TOKEN, GALERA_PASSWORD } from 'utils/constants'

export async function middleware(req, ev) {

    try {
        const { cookies } = req;
        const { password } = cookies;
        const pathnameFull = req.nextUrl.pathname;
        const pathname = pathnameFull.slice(6, pathnameFull.length)

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

        let curPath = Object.values(paths).find(el => el.path === pathname);

        console.log('\n\n----- middleware---', req.nextUrl, '\n\n', req.page, '\n\n')
        console.log('\n\n----- middleware @@@---', pathname, '\n\n', req)


        // not auth user
        if(!isLoggedin) {
            if( (curPath.path === pathname) && curPath.isHidden ) {
                return new Response('Is hidden path')
            }
        }

    } catch(e) {
        console.log(e)
        return new Response(e.message)
    }
}