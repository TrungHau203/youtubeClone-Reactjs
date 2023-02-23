import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import * as icon from '../icon'
function ShortSidebar() {
    const [isActive, setIsActive] = useState('home')
    
  return (
    <div className='inline pl-1.5 fixed bg-white h-full z-10 max-sm:hidden'>
        <div className={`m-auto w-16 py-2 ${isActive==='home'&&'bg-slate-200 hover:bg-slate-300'}`} onClick={()=>setIsActive('home')}>
            <Link to='/' className='' >
                {
                    isActive==='home'?<img src={icon.homeActive} className="w-6 m-auto"/>:<img src={icon.home} className="w-6 m-auto"/>
                }    
                <h2 className='text-center text-xs'>
                    Trang chủ
                </h2>
            </Link>
        </div>
        <div className={`m-auto w-16 py-2 ${isActive==='shorts'&&'bg-slate-200 hover:bg-slate-300'}`} onClick={()=>setIsActive('shorts')}>
            <Link to='/' className='' >
            {
                isActive==='shorts'?<img src={icon.shortsActive} className="w-6 m-auto"/>:<img src={icon.shorts} className="w-6 m-auto"/>
            }    
            <h2 className='text-center text-xs'>
                Shorts
            </h2>
        </Link>
        </div>
        <div className={`m-auto w-16 py-2 ${isActive==='subrices'&&'bg-slate-200 hover:bg-slate-300'}`} onClick={()=>setIsActive('subrices')}>
            <Link to="/" className='m-auto w-16 py-6 my-4' >
                {
                    isActive==='subrices'?<img src={icon.subscribeActive} className="w-6 m-auto"/>:<img src={icon.subscribe} className="w-6 m-auto"/>
                }                    
                <h2 className='text-center text-xs'>
                    Subrices
                </h2>
            </Link>
        </div>
        <div className={`m-auto w-16 py-2 ${isActive==='lib'&&'bg-slate-200 hover:bg-slate-300'}`} onClick={()=>setIsActive('lib')}>
            <Link to='/' className='' >
                {
                    isActive==='lib'?<img src={icon.libActive} className="w-6 m-auto"/>:<img src={icon.home} className="w-6 m-auto"/>
                }                    
                <h2 className='text-center text-xs'>
                    Thư viện
                </h2>
            </Link>
        </div>
        <div className={`m-auto w-16 py-2 ${isActive==='watched'&&'bg-slate-200 hover:bg-slate-300'}`} onClick={()=>setIsActive('watched')}>
            <Link to='/' className='' >
                {
                    isActive==='watched'?<img src={icon.watchedActive} className="w-6 m-auto"/>:<img src={icon.watched} className="w-6 m-auto"/>
                }                    
                <h2 className='text-center text-xs'>
                    Video đã xem
                </h2>
            </Link>
        </div>

    </div>
  )
}

export default ShortSidebar

