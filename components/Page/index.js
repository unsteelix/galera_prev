import { wrap, header, content, footer, login, madeBy, about, logo, pixelPerfectIcon, pixelPerfectValue } from './Page.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import PixelPerfect from 'components/PixelPerfect'
import Login from 'components/Login'

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
            <div className={content}>
                {children}
            </div>
            <div className={footer}>
                {/**
                <div className={pixelPerfectValue}>
                    <PixelPerfect type="value" className={pixelPerfectIcon} />
                </div>
                 */}
                <div className={login}>
                    <Login />
                </div>
                <div className={madeBy}>
                    Made by myself
                </div>
                <div className={about}>
                    <Link href={'/about'}>
                        about
                    </Link>
                </div>
            </div>
            <div className={pixelPerfectIcon}>
                <PixelPerfect type="icon" className={pixelPerfectIcon} />
            </div>
        </div>

    </>)
}

export default Page