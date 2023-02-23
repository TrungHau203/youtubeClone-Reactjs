import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromApi';
// import {Load} from '../components'

const ChannelCard = ({video,channelFeed}) => {
  
  const [channel, setchannel] = useState(null);
    // const [statistics, setStatistics] = useState(null);
    var channelId = video.id?.channelId||video.id;
    // console.log('video');
    // console.log(video);
    
    useEffect(() =>{
      fetchFromAPI(`channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}`)
        .then(data=>setchannel(data.items[0]));
    },[channelId]);  
        
    const numToString = n => {
      if (n < 1e3) return n;
      if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "N";
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "Tr";
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "Tỉ";
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + "N,Tỉ";
    };
    // console.log(channelId);
  return (
    <div className={channelFeed?'':'mb-4 py-4 border-y-[1px] border-solid border-[#ccc]'}>
    <Link to={`/channeldetail/${channelId}`} className='flex '>
      <div className={channelFeed?'max-w-[80px] ':'max-w-[360px] ' + 'flex flex-1 mr-6 items-center justify-center'}>
        <Link to={`/channeldetail/${channelId}`} className='max-[320px]:min-w-[240px]'>
          <img src={video?.snippet?.thumbnails?.high?.url} className={channelFeed?'max-w-[80px] rounded-full ':'max-w-[136px] m-auto rounded-full'}/>
        </Link>
      </div>
      <div className='flex justify-center items-center'>
        <div className='pr-44 max-sm:pr-0'>
          <h2 className=''>{video?.snippet?.title}</h2>
          <div className={channelFeed?' ':'flex max-sm:block'}>
            <p className=''>{channel?.snippet?.customUrl}<span className={channelFeed?' ':'px-2'}> • </span> </p>
            <p className=''>{numToString(channel?.statistics?.subscriberCount)} <span> Người đăng kí </span></p>
          </div>
          <p className={channelFeed?'hidden':'max-sm:hidden'}>{video?.snippet?.description}</p>
        </div>
        <button className='flex justify-center bg-black text-white px-3 py-1 rounded-3xl whitespace-nowrap max-sm:hidden'>Đăng kí</button>
      </div>
    </Link>
    </div>
  )
}

export default React.memo(ChannelCard)