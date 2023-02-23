import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import * as icon from '../icon'
import { logo } from '../img';

const LongSidebar = () => {
  const [isActive, setIsActive] = useState('home')
  return (
    <div className='overflow-hidden overflow-y-auto w-60 h-[89vh] bg-white'>
      <div className='px-3.5  border-b border-b-slate-300 pb-4'>  
        <Link to='/' className='flex px-2 py-2 hover:bg-slate-200 rounded-xl'  onClick={()=>setIsActive('home')}>
          {
            isActive==='home'?<img src={icon.homeActive} className="w-6 font-medium"/>:<img src={icon.home} className="w-6" onClick={()=>setIsActive('home')}/>
          }    
          <h2 className='text-base px-6'>
              Trang chủ
          </h2>
        </Link>
      
        <Link to='/' className='flex px-2 py-2 hover:bg-slate-200 rounded-xl'  onClick={()=>setIsActive('shorts')}>
          {
            isActive==='shorts'?<img src={icon.shortsActive} className="w-6 font-medium"/>:<img src={icon.shorts} className="w-6" onClick={()=>setIsActive('shorts')}/>
          }    
          <h2 className='text-base px-6'>
              Shorts
          </h2>
        </Link>
      
      
        <Link to='/' className='flex px-2 py-2 hover:bg-slate-200 rounded-xl'  onClick={()=>setIsActive('subscribe')}>
          {
            isActive==='subscribe'?<img src={icon.subscribeActive} className="w-6 font-medium"/>:<img src={icon.subscribe} className="w-6" onClick={()=>setIsActive('subscribe')}/>
          }    
          <h2 className='text-base px-6'>
              Kênh đăng kí
          </h2>
        </Link>
      
      
        <Link to='/' className='flex px-2 py-2 hover:bg-slate-200 rounded-xl'  onClick={()=>setIsActive('lib')}>
          {
            isActive==='lib'?<img src={icon.libActive} className="w-6 font-medium"/>:<img src={icon.lib} className="w-6" onClick={()=>setIsActive('lib')}/>
          }    
          <h2 className='text-base px-6'>
              Thư viện
          </h2>
        </Link>
      
      
        <Link to='/' className='flex px-2 py-2 hover:bg-slate-200 rounded-xl'  onClick={()=>setIsActive('watched')}>
          {
            isActive==='watched'?<img src={icon.watchedActive} className="w-6 font-medium"/>:<img src={icon.watched} className="w-6" onClick={()=>setIsActive('watched')}/>
          }    
          <h2 className='text-base px-6'>
              Video đã xem
          </h2>
        </Link>
      
      </div>  
      
      <div className="py-4 px-3.5 border-b border-b-slate-300">
        <p className="text-sm mb-3">Hãy đăng nhập để thích video, bình luận và đăng kí kênh</p>
        <div className="flex border rounded-3xl p-1 mr-5 text-[#065fd4] hover:bg-teal-100 w-[126px]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h2 className='cursor-pointer whitespace-nowrap'>Đăng nhập</h2>
        </div>
      </div>
      <div className="cursor-pointer text-sm py-4 px-3.5 border-b border-b-slate-300">
          <p className='inline-block pr-2'>Giới thiệu</p>
          <p className='inline-block pr-2'>Báo chí</p>
          <p className='inline-block pr-2'>Bản quyền</p>
          <p className='inline-block pr-2'>Liên hệ với chúng tôi</p>
          <p className='inline-block pr-2'>Người sáng tạo</p>
          <p className='inline-block pr-2'>Quảng cáo</p>
          <p className='inline-block pr-2'>Người phát triển</p>
      </div>
      <div className="cursor-pointer text-sm py-4 px-3.5 border-b border-b-slate-300">
          <p className='inline-block pr-2'>Điều khoản</p>
          <p className='inline-block pr-2'>Quyền riêng tư</p>
          <p className='inline-block pr-2'>Chính sách an toàn</p>
          <p className='inline-block pr-2'>Cách youtube hoạt động</p>
          <p className='inline-block pr-2'>Thử tính năng mới</p>
      </div>
      <p className='text-sm pt-4 px-3.5'>© 2023 clone youtube by hauajngoo</p>
    </div>
  )
}

export default LongSidebar