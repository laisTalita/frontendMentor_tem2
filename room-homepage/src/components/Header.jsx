import { useState } from 'react'
import style from './styles/Header.module.css'
import { useEffect } from 'react'

export default function Header({img,imgDesk}){

    const pages = ["home","shop","about","contact"]
    const [menu,setMenu] = useState(false)
    
    useEffect(()=>{
        const handleSize = ()=>{
            if (window.innerWidth>= 992) {
                setMenu(false)
            }
        }
        window.addEventListener('resize',handleSize)
        return ()=> window.removeEventListener('resize', handleSize)
    },[])

    return(
        <header className={style.header}>
            {menu &&
            (<div className={`position-fixed w-100 h-100 z-2 ${style.bgDark} d-lg-none`}></div>)
            }
            
            <img src={window.innerWidth >=631? imgDesk:img} alt="background" className={style.bg}/>

            <nav className={`d-flex z-3 position-relative align-items-center px-4 px-xl-3  gap-lg-5 pt-xl-5 ${menu ? 'bg-white py-4':'py-5'}`}>
                <img 
                src={`${menu ? "/images/icon-close.svg": "/images/icon-hamburger.svg"}`} 
                alt="menu" 
                className="d-lg-none"
                onClick={()=> setMenu(!menu)} />

                <img className={`mx-auto mt-xl-3 mx-lg-0 mx-xl-5 me-xl-2 ${menu?'d-none':'d-block'}`} src="/images/logo.svg" alt="room" />
                
                {menu && (
                    <ul className='d-flex pt-3 justify-content-end gap-4  w-100 list-unstyled'>
                    {pages.map((item,index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
                )}
                <ul className='d-flex justify-content-start gap-4 w-100 list-unstyled d-none d-lg-flex m-0 text-white mt-xl-3'>
                    {pages.map((item,index) => (
                        <li key={index} className={"active"}>
                            {item}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}