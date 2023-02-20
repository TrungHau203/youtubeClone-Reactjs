import {useState,useEffect,memo} from 'react'
import { Link } from 'react-router-dom'
import {Load} from '../components'
import { fetchFromAPI } from '../utils/fetchFromApi';
const VideoCard = ({video, direction_row,direction_search}) => {
    // console.log(video?.snippet?.thumbnails?.high?.url);
    const [channel, setchannel] = useState(null);
    const [statistics, setStatistics] = useState(null);
    var channelId = video?.snippet?.channelId;
    var videoId =video?.id?.videoId ? video.id.videoId : video.id;
    // console.log(snippet);
    useEffect(() =>{
      fetchFromAPI(`videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`)
         .then(data=>setStatistics(data.items[0]));
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
  const msPublished = new Date(video.snippet?.publishedAt);
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
  return (
    <div className={(direction_row&&'mb-2 mx-2')||(direction_search&&'mb-2 mx-2')}>
        <Link to={`/videodetail/${videoId}`} className={(direction_row||direction_search)&&'flex'}>
            <img className={(direction_row&&'w-44')||(direction_search&&'max-w-[360px] rounded-2xl mr-4 max-sm:max-w-[240px] max-sm:h-[160px]')||'rounded-2xl '} src={video?.snippet?.thumbnails?.high?.url}/>
            <div className='flex mt-2'>
              <div className={(direction_row||direction_search)&&'hidden'}>
                <Link to={`/channeldetail/${video?.snippet?.channelId}`}>
                  <img src={channel?.snippet?.thumbnails?.default?.url} className='w-14 rounded-full max-w-[50px] '/>
                </Link>
              </div>
              <div className=''>
                <h2 className='text-ellipsis overflow-hidden leading-5 max-h-10 text-base font-normal'>{video.snippet?.title}</h2>
                <div className={(direction_search)?'flex':'hidden'}>
                  <p className='text-xs '>{numToString(statistics?.statistics?.viewCount)} Lượt xem • </p>
                  <p className='text-xs ml-1'> {timeSince(msPublished)} Trước</p>
                </div>
                <div className={(direction_search)?'flex':''}>
                  <Link to={`/channeldetail/${video?.snippet?.channelId}`} className={direction_search?'':'hidden'}>
                    <img src={channel?.snippet?.thumbnails?.default?.url} className='w-14 rounded-full max-w-[50px]'/>
                  </Link>
                  <Link className={direction_search?'flex items-center justify-center':'inline-block'} to={`/channeldetail/${video?.snippet?.channelId}`} >
                      <p className='text-xs  my-2'>{video?.snippet?.channelTitle}</p>
                  </Link>
                </div>
                <p className={(direction_search)?'flex':'hidden'} >{video.snippet.description}</p>
                <div className={(direction_search)?'hidden':'flex'}>
                  <p className='text-xs '>{numToString(statistics?.statistics?.viewCount)} Lượt xem • </p>
                  <p className='text-xs ml-1'> {timeSince(msPublished)} Trước</p>
                </div>
              </div>
            </div>
        </Link>
    </div>
  )
}

export default memo(VideoCard)