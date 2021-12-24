import { wrap, loginForm, logoutForm, message, button } from './Login.module.scss'
import { logIn, logOut, isLoggedIn } from 'utils'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

const LoginForm = ({ setIsLogined }) => {

    const [inputValue, setinputValue] = useState('')
    const [timeoutId, setTimeoutId] = useState(null)
    const [msg, setMsg] = useState('')
    const [state, setState] = useState('view')
    const [disabled, setDisabled] = useState(false)


    const Button = () => <div className={button}>login</div>

    const hideMsgDelay = 2000;
    const passFetchingDelay = 2000;

    const showMessage = (message) => {
        setMsg(message)

        const newTimeoutId = setTimeout(async () => {
            setMsg('')
            clearTimeout(newTimeoutId)
        }, hideMsgDelay)
    }

    const onChange = (pass) => {
        setinputValue(pass)

        clearTimeout(timeoutId)

        /**
         * fetch token
         */
        let token = null;

        if(pass.length > 0) {
            const newTimeoutId = setTimeout(async () => {
                setDisabled(true)

                token = await logIn(pass)

                if(token) {
                    setIsLogined(true)
                } else {
                    showMessage('bad')
                    setinputValue('')
                    setDisabled(false)
                    clearTimeout(timeoutId)
                }
            }, passFetchingDelay)
    
            setTimeoutId(newTimeoutId)
        }
    }


    return (
        <div className={loginForm} onClick={() => {setState('edit')}} onBlur={() => {setState('view')}}>
            {state === 'view' ? <Button /> : (<>
                <input type="password" autoFocus disabled={disabled} value={inputValue} onChange={(e) => {
                    onChange(e.target.value)}
                } />
                <div className={message}>
                    {msg}
                </div>  
            </>)}
        </div>
    )
}

const LogoutForm = ({ setIsLogined }) => {

    const router = useRouter()

    const onClick = () => {
        logOut()
        setIsLogined(false)
        router.push('/')
    }

    return (
        <div className={logoutForm} onClick={onClick}>
            logout
        </div>
    )
}


const Login = () => {

    const [isLogined, setIsLogined] = useState(false)

    useEffect(() => {
        if(isLoggedIn()){
            console.log('\n we are already authorized  \n')
            setIsLogined(true)
        }
    }, []);


    return (
        <div className={wrap}>
            {isLogined ? 
                <LogoutForm  setIsLogined={setIsLogined}/> 
                : 
                <LoginForm setIsLogined={setIsLogined} />
            }
        </div>
    )
}

export default Login