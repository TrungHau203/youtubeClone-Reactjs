import React, {useState, useEffect, useRef} from 'react'
import {Link, useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import { fetchFromAPI } from '../utils/fetchFromApi';
// import moment from 'moment';
import {Videos} from '../components'
const VideoDetail = () => {
    const [videoInfor, setVideoInfor] = useState(null);
    const [videos, setVideos] = useState(null);
    const [channel, setchannel] = useState(null);
    const {id} = useParams();
    const videoRef = useRef()
    useEffect(() =>{
         fetchFromAPI(`videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`)
         .then(data=>{
            setVideoInfor(data.items[0]);
            fetchFromAPI(`channels?part=snippet%2CcontentDetails%2Cstatistics&id=${data?.items[0]?.snippet?.channelId}`)
              .then(data=>setchannel(data.items[0]));
            })
         fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=50&`)
        .then(data=>setVideos(data.items));
    },[id]);  
  //   useEffect(() =>{
  //     fetchFromAPI(`videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`)
  //     .then(data=>{
  //        setVideoInfor(data.items[0]);
  //        fetchFromAPI(`channels?part=snippet%2CcontentDetails%2Cstatistics&id=${data?.items[0]?.snippet?.channelId}`)
  //          .then(data=>setchannel(data.items[0]));
  //        })
  //     fetchFromAPI(`search?part=snippet&relatedToVideo&maxResults=50&id=${id}`)
  //    .then(data=>setVideos(data.items));
  // },[id,videoInfor?.snippet?.channelId]);  
    // console.log('video: ');  
    // console.log(videos);
    //numToString
    // const numToString = function(value) {
    //   var newValue = value;
    //   if (value >= 1000) {
    //       var suffixes = ["", "N", "Tr", "Tỉ","N,Tỉ"];
    //       var suffixNum = Math.floor( (""+value).length/3 );
    //       var shortValue = '';
    //       for (var precision = 2; precision >= 1; precision--) {
    //           shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
    //           var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
    //           if (dotLessShortValue.length <= 3) { break; }
    //       }
    //       if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
    //       newValue = shortValue+suffixes[suffixNum];
    //   }
    //   return newValue;
    // }

    // else case

    const numToString = n => {
      if (n < 1e3) return n;
      if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "N";
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "Tr";
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "Tỉ";
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + "N,Tỉ";
    };

    const msPublished = new Date(videoInfor?.snippet?.publishedAt);
    function timeSince(date) {

      var seconds = Math.floor((new Date() - date) / 1000);
    
      var interval = seconds / 31536000;
    
      if (interval > 1) {
        return Math.floor(interval) + " Năm";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " Tháng";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " Ngày";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " Giờ";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " Phút";
      }
      return Math.floor(seconds) + " Giây";
    }
    const convertDescription = function(data){
      return data?.split('\n').map(cut=>{
          if(cut?.includes('https')){
            return `<Link to="${cut}">${cut}</Link>`;
          } else {
            return `<p > ${cut} </p>`
          }
      })
    }
    const toggleReadMore = function(){
      const readMore = document.querySelector('.read-more');
      const descriptionView = document.querySelector('.description-view');
      if(readMore.style.display==='block'){
        readMore.style.display = 'none';
        descriptionView.style.display = 'block';
      } else {
        readMore.style.display = 'block';
        descriptionView.style.display = 'none';
      }
    }
    
  return (
    <div ref={videoRef} className="lg:grid lg:grid-cols-6 lg:gap-4 mt-16">
      <div className="lg:col-span-4 lg:ml-6 justify-between" >
        {/* title */}
        <div>
          <div className='h-[80vh] max-lg:h-[50vh] max-sm:h-[30vh]'>
            <ReactPlayer  url={`https:www.youtube.com/watch?v=${id}`} width='100%' height="100%" controls/>
          </div>
          <h2 className='text-xl'>{videoInfor?.snippet?.title}</h2>
        </div>
        {/* Top row */}
        <div className="flex max-sm:block justify-between">
          <div className="flex  items-center">
            <div className="flex items-center">
              <Link  to={`/channeldetail/${videoInfor?.snippet.channelId}`} className='mr-2'><img src={channel?.snippet.thumbnails.default.url} className="rounded-full w-10" /></Link>
              <div className='mr-3'>
                <h3 className='text-sm'>
                  {channel?.snippet?.title}
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg> */}
                </h3>
                <p className='text-sm text-slate-500'>{numToString(channel?.statistics.subscriberCount)} người đăng ký</p>
              </div>
            </div>
            <button className="mr-5 px-4 bg-black text-white rounded-3xl h-10 whitespace-nowrap">Đăng Kí</button>
          </div>
          <div className="flex items-center">
            <button className="flex bg-zinc-100 p-2 pr-4 rounded-l-3xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg>
              <p>{numToString(videoInfor?.statistics?.likeCount)}</p>
            </button>
            <button className="flex bg-zinc-100 p-2 mr-2 rounded-r-3xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
              </svg>
            </button>
            <button className="flex px-1 bg-zinc-100 p-2 rounded-3xl mr-2">
              <svg xmlns="http://www.w3.org/2000/svg " fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              <p className="px-2 whitespace-nowrap">Chia sẻ</p>
            </button>
            <button className="flex bg-zinc-100 p-2 rounded-3xl mr-2 max-sm:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <p className='px-2'>Lưu</p>
            </button>
            <button className='bg-zinc-100 p-2 rounded-full max-sm:hidden'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </button>
          </div>
        </div>
        {/* Bottom row */}
        <div className='bg-zinc-100 p-4 rounded-xl mt-4'>
          <div className=''>
              <p className=''>{numToString(videoInfor?.statistics?.viewCount)}Lượt xem</p>
              <p className=''>{timeSince(msPublished)}</p>
          </div>
          {/* description */}
          <div className=''>
            <div className='text-sm'>
              <h2>{videoInfor?.snippet?.title}</h2>
              <button className='block read-more' onClick={toggleReadMore}>Hiện thêm</button>
              <div className='hidden description-view'>
                {
                  videoInfor?.snippet?.description?.split('\n')?.map((cut,index)=>{
                  if(cut?.includes('http')){
                    const [title,link] = cut.split('http');
                    console.log(title.length>0);
                    return (
                      <a href={'http'+link} className={title.length>0?'inline-block':'block' + ' text-cyan-600'}>{cut+'\n\n'}</a>
                    )
                  } else {
                    return <p > {cut} </p>
                  }
                })
                }
                <button onClick={toggleReadMore} className='block read-more'>Ẩn bớt</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='lg:col-span-2 max-lg:ml-4 max-sm:ml-0'>
        <Videos videos={videos} direction_row />
      </div>
    </div>
  )
}

export default VideoDetail