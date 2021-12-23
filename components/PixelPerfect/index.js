import { useState, useEffect } from 'react';
import { wrap } from './PixelPerfect.module.scss';

const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840]

const PixelPerfect = () => {

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


    return (
        <div className={wrap} suppressHydrationWarning >
            {size.width} {deviceSizes.includes(size.width) && 'perfect'}
        </div>
    )
}

export default PixelPerfect