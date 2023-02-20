import React from 'react'
import {Load,VideoCard,ChannelCard} from '../components'
const Videos = ({videos,direction_row,direction_search}) => {
    if(!videos?.length){
        return <Load/>
    }
    // console.log(videos)
    console.log('video: ', videos);
  return (
    <div className={(direction_row||direction_search)?'':"grid lg:grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 gap-4"}>
        {
            videos.map((video,index) =>(
            <div className="" key={index}>
                {(video.id.kind==="youtube#video"||video.kind==="youtube#video")&&<VideoCard direction_row={direction_row} video={video} direction_search={direction_search}/>}
                {(video.id.channelId)&&<ChannelCard video={video} />}
            </div>
        ))
        }
    </div>
  )
}
//tránh render khi không cần thiết
export default React.memo(Videos)
// export default Videos
