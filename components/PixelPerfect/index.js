import { useState, useEffect } from 'react';
import { wrap, icon } from './PixelPerfect.module.scss';
import Image from 'next/image'

const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840]

const PixelPerfect = ({ type }) => {

    const isBrowser = typeof window !== "undefined"

    const [size, setSize] = useState({
        width: isBrowser && window.document.body.clientWidth,
        height: isBrowser && window.innerHeight
    })

    if (isBrowser) {
        window.onresize = () => {
            setSize({
                width: window.document.body.clientWidth,
                height: window.innerHeight
            })
        }
    }

    const Icon = () => (
        <div className={icon}>
            <Image 
                src={'/lightning.svg'}
                objectFit='cover'
                layout='fill'
            />
        </div>
    )



    return (
        <div className={wrap} suppressHydrationWarning >
            {type === 'icon' &&  (deviceSizes.includes(size.width) &&  <Icon />)}
            {type === 'value' && size.width}
        </div>
    )
}

export default PixelPerfect