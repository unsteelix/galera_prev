import { wrap, listEL, pixelPerfectIcon, pixelPerfectValue, login, madeBy, about } from './Footer.module.scss'
import Link from 'next/link'
import PixelPerfect from 'components/PixelPerfect'
import Login from 'components/Login'


const Footer = () => {

    return(
        <div className={wrap}>
            <div className={listEL}>
                {/**
                <div className={pixelPerfectValue}>
                    <PixelPerfect type="value" className={pixelPerfectIcon} />
                </div>
                 */}
                <div className={login}>
                    <Login />
                </div>
                <div className={madeBy}>
                    Made By Myself
                </div>
                <div className={about}>
                    <Link href={'/about'}>
                        About
                    </Link>
                </div>
            </div>
            <div className={pixelPerfectIcon}>
                <PixelPerfect type="icon" className={pixelPerfectIcon} />
            </div>
        </div>

    )
}

export default Footer