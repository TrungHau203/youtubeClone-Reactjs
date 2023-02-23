import React,{useState, useEffect, useRef} from 'react'
import { Link,useParams,Route, Routes } from 'react-router-dom' 
import { fetchFromAPI } from '../utils/fetchFromApi' 
import {ShortSidebar,ChannelCard, Videos, SearchFeed} from '../components'
import { useNavigate } from 'react-router-dom' 

const ChannelFeed = ({search}) => {
  const [channeldetail, setChanneldetail] = useState('') 
  const [videosData, setVideosData] = useState('') 
  const [playlist, setPlaylist] = useState('') 
  const [playlistItems, setPlaylistItems] = useState('') 
  var initSelection = search?'Tìm kiếm':'Video' 
  const [selection, setSelection] = useState(initSelection) 
  const [searchTerm, setSearchTerm] = useState('') 
  const [searchData, setSearchData] = useState('') 
  //ref
  const containBannerRef = useRef()
  const bannerRef = useRef()
  const cardRef = useRef()
  const navbarRef = useRef()
  const navigate = useNavigate()
  const {id,searchContent} = useParams()
  // const {searchContent} = useParams() 
  // List "Đen Vâu"'playlists
  // https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCWu91J5KWEj1bQhCBuGeJxw&key=AIzaSyA2xo2tj2jXGM09LwBNvb_mPH5OeqnOLmE
  //playlist by id 
  // https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=PLH_v4r_pvudWk9uKQejKmgnahYG7ZG7Ek&key=AIzaSyA2xo2tj2jXGM09LwBNvb_mPH5OeqnOLmE
  // get all videos of "Đen Vâu"'channel
  // https://youtube.googleapis.com/youtube/v3/search?channelId=UCWu91J5KWEj1bQhCBuGeJxw&part=snippet%2Cid&order=date&key=AIzaSyA2xo2tj2jXGM09LwBNvb_mPH5OeqnOLmE
  // get banner 
  // https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics%2CbrandingSettings&id=UCWu91J5KWEj1bQhCBuGeJxw&key=AIzaSyA2xo2tj2jXGM09LwBNvb_mPH5OeqnOLmE
  useEffect(() =>{
    fetchFromAPI(`channels?part=snippet%2CcontentDetails%2Cstatistics%2CbrandingSettings&id=${id}`)
    .then(data => setChanneldetail(data.items[0])) 
    fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date&maxResults=50`)
    .then(data => setVideosData(data.items))
    fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&maxResults=50&q=${searchContent||''}`)
    .then(data => setSearchData(data.items))
    // fetchFromAPI(`playlists?part=snippet&channelId=${id}`)
    // .then(data => setPlaylist(data.items))
    //  sửa lại idPlaylist
    // fetchFromAPI(`playlistItems?part=snippet%2CcontentDetails&playlistId=${idPlaylist}`)
    // .then(data => setPlaylistItems(data.items)) 
  },[id,searchContent])
  window.onscroll = function() {myFunction()}

// var navbar = document.getElementById("navbar") 
// var sticky = navbar.offsetTop 
  var nav = navbarRef.current;
  var containBanner = containBannerRef.current;
  var banner = bannerRef.current;
  var card = cardRef.current;
function myFunction() { 
  const navHeight =Math.ceil(containBanner.offsetWidth/6)  + 100
  var height=window.pageYOffset - navHeight
  if (window.pageYOffset >= navHeight) {
    nav.classList.add("fixed")
    nav.classList.add("top-14")
    nav.classList.add("bg-white")
    nav.classList.add("w-full")
    // nav.classList.add("mt-14")
  } 
  else { 
    console.log("nav"+navHeight) 
    console.log("cửa sổ: "+window.pageYOffset) 
    containBanner.style.transform = `translate3d(0,-${window.pageYOffset/6}px, 0)` 
    banner.style.transform = `translate3d(0,${window.pageYOffset/2}px, 0)` 
    card.style.transform = `translate3d(0,0px, 0px)` 
    nav.style.transform = `translate3d(0,0px, 0px)` 
      // console.log(window.pageYOffset) 
    nav.classList.remove("fixed")
    nav.classList.remove("top-14")
    nav.classList.remove("bg-white");
    nav.classList.remove("w-full");
    // nav.classList.remove("mt-14");
  }
}
const btnSearchChannel = document.getElementById("btnSearchChannel") 
const searchChannel = document.getElementById("searchChannel") 
document.addEventListener("click",function(e) {
  const isClickInside = btnSearchChannel?.contains(e.target)||searchChannel?.contains(e.target)
  if(!isClickInside){
    searchChannel?.classList.add("hidden") 
    setSearchTerm('') 
  } 
})
btnSearchChannel?.addEventListener("click",function(){
  const element =document.getElementById('searchChannel') 
  element.classList.remove('hidden') 
  element.classList.add('border-b-[3px]') 
  element.classList.add('border-solid') 
  element.classList.add('border-[#000]') 
})
const handleSearchTerm = function(e){
  e.preventDefault() 
  if(searchTerm){
    navigate(`/channeldetail/${id}/searchChannel/${searchTerm}`) 
    // selection!=="Tìm kiếm"&&setSearchTerm('') 
    setSelection("Tìm kiếm")
  }
}
// console.log(cardRef);
function setHeight() {
  // code xử lý khi chiều rộng thay đổi
  if(containBannerRef.current){
    const getContaine = containBannerRef.current
    const height = Math.ceil(getContaine.offsetWidth/6) 
    // console.log(containBannerRef.current);
    getContaine.style.height = height.toString()+'px';
  }
}
window.addEventListener('resize', setHeight) 
  return (
    <div className='mt-14'>
      
      <ShortSidebar channelFeed />
      
      <div className='ml-16 max-sm:ml-0'>
      {/* style={{background:`url(${channeldetail?.brandingSettings?.image.bannerExternalUrl}) no-repeat fixed`}} */}
        <div  className='' >
          <div ref={containBannerRef} className={`w-full overflow-hidden`} style={{height:'210px'}}>
            <img ref={bannerRef} src={channeldetail?.brandingSettings?.image.bannerExternalUrl} className='w-full h-full object-cover'/>
          </div>
          <div className="px-[calc((100%_-_1070px)/2)] border-b-[1px] border-solid border-[#ccc] pt-4">
            <div ref={cardRef} className="mb-2">
              <ChannelCard channelFeed video={channeldetail}/>
            </div>
            <div ref={navbarRef} className="flex hover:text-black font-medium leading-4 overflow-y-hidden whitespace-nowrap">
              <Link to={`/channeldetail/${id}/`} className={`${selection==="Video"?'text-black border-b-[3px] border-solid border-[#000]':'text-slate-400'} px-8 py-2 `} onClick={()=>setSelection("Video")}>Video</Link>
              <Link to={`/channeldetail/${id}/shorts`} className={`${selection==="Shorts"?'text-black border-b-[3px] border-solid border-[#000]':'text-slate-400'} px-8 py-2 `} onClick={()=>setSelection("Shorts")}>Shorts</Link>
              <Link to={`/channeldetail/${id}/playList`} className={`${selection==="Danh sách phát"?'text-black border-b-[3px] border-solid border-[#000]':'text-slate-400'} px-8 py-2 `} onClick={()=>setSelection("Danh sách phát")}>Danh sách phát</Link>
              <Link to={`/channeldetail/${id}/communication`} className={`${selection==="Cộng đồng"?'text-black border-b-[3px] border-solid border-[#000]':'text-slate-400'} px-8 py-2 `} onClick={()=>setSelection("Cộng đồng")}>Cộng đồng</Link>
              <Link to={`/channeldetail/${id}/channel`} className={`${selection==="Kênh"?'text-black border-b-[3px] border-solid border-[#000]':'text-slate-400'} px-8 py-2 `} onClick={()=>setSelection("Kênh")}>Kênh</Link>
              <Link to={`/channeldetail/${id}/prevent`} className={`${selection==="Giới thiệu"?'text-black border-b-[3px] border-solid border-[#000]':'text-slate-400'} px-8 py-2 `} onClick={()=>setSelection("Giới thiệu")}>Giới thiệu</Link>
              <button id="btnSearchChannel" className={`${selection==="Tìm kiếm"?'text-black':'text-slate-400'} text-slate-400 pl-8 py-2 hover:text-black flex`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <form id="searchChannel" className={`${selection==="Tìm kiếm"?'text-black border-b-[3px] border-solid border-[#000]':'hidden ml-4'}`} onSubmit={handleSearchTerm}>
                  <input type="search" className='outline-none' placeholder='Tìm kiếm' onChange={e=>setSearchTerm(e.target.value)}/>
                </form>
              </button>
            </div>
          </div>
          {/* <div className='mt-8'>
            <Routes>
              <Route path='channeldetail/:id/' element={<Videos videos={videosData}/>} />
              <Route path='channeldetail/:id/searchChannel/:searchContent' element={<Videos videos={searchData} direction_search/>} />
            </Routes>
          </div> */}
          <div className="mt-8 px-[calc((100%_-_1070px)/2)]">
            {selection==="Video"&&<Videos videos={videosData}/>}
            {(selection==="Tìm kiếm"&&searchContent)&&<Videos videos={searchData} direction_search/>}
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default ChannelFeed