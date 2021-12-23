import { wrap, header, content, footer, login, madeBy, about, logo } from './Page.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import PixelPerfect from 'components/PixelPerfect'

const Page = (params) => {
    const { children, headTitle, headDescription  } = params;

    return(<>
        <Head>
            <title>{headTitle}</title>
            <meta name="description" content={headDescription} />
        </Head>

        <div className={wrap}>
            <div className={header}>
                <div className={logo}>
                    <Link href={'/'}>
                        logo
                    </Link>
                </div>
            </div>
            <PixelPerfect />
            <div className={content}>
                {children}
            </div>
            <div className={footer}>
                <div className={login}>
                    login
                </div>
                <div className={madeBy}>
                    Made by myself
                </div>
                <div className={about}>
                    about
                </div>
            </div>
        </div>

    </>)
}

export default Page