// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState, useRef} from 'react'
import { Link } from "react-router-dom"
// export default khi import thì import bằng tên nào cũng đc more : "https://www.youtube.com/watch?v=JZh7K8ry4jE"
import TippyDefault from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react/headless';
import { logo } from '../img';
// sử dụng fontawesome nếu không có trong tailwindIcon
import "../fontawesome";
import {SearchBar, LongSidebar, Popper, ShortSidebar} from '../components'
const Navbar = () => {
  // console.log("call me");
  const [visible, setvisible] = useState(false)
  const overlayRef = useRef()
  const handleToggle = () => {
    console.log("Clicked toggle:" + visible)
    setvisible(!visible)
  }
  
  return (
    <div className=''>
      <div className='flex justify-between px-4 max-sm:px-0 h-14 items-center fixed top-0 z-50 bg-white w-full'>
        <div className='flex items-center '>
          
            
          <Tippy
            placement='bottom'
            visible={visible}
            render={attrs => (
                <div {...attrs} tabIndex="-1" className='relative w-full h-full'>
                  <div className='relative z-60'><LongSidebar/></div>
                  <div onClick={handleToggle} className='absolute z-55 top-0 left-0 z-[-1] bg-slate-50 w-[100vw] h-full' style={{backgroundColor:'rgba(0, 0, 0, 0.5)'}}></div>
                </div>
            )}
            >
            <button className='p-2 hover:rounded-[50%] hover:bg-slate-200' onClick={handleToggle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </button>    
          </Tippy>  
          
          <Link to="/" className='p-3.5 max-sm:p-0'>
            <img className='w-24 h-5' src={logo}/>
          </Link>
          <span className="text-[10px] relative text-slate-500 top-[-10px] left-[-20px] max-sm:hidden">VN</span>
        </div>
        <div className="flex">
          <SearchBar/>
          <TippyDefault content="Tìm kiếm bằng giọng nói">
            <button className="rounded-r-3xl p-1.5 hover:bg-slate-300 hover:rounded-[50%] max-sm:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 items-center">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </button>
          </TippyDefault>
        </div>
        <div className="flex max-sm:hidden">
          <TippyDefault content="Cài đặt">
            <button className="rounded-r-3xl py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </button>
          </TippyDefault>
          <div className="flex border rounded-3xl p-1 mr-5 text-[#065fd4] hover:bg-teal-100 max-sm:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 className='cursor-pointer whitespace-nowrap'>Đăng nhập</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

