import { wrap, header, content, footer, login, madeBy, about, logo, pixelPerfectIcon, pixelPerfectValue } from './Page.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import Footer from 'components/Footer'
import Image from 'next/image'

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
                        <Image src="/logo.svg" height={30} width={30} />
                    </Link>
                </div>
            </div>
            <div className={content}>
                {children}
            </div>
            <Footer />
        </div>

    </>)
}

export default Page