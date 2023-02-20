import { useEffect, useState } from 'react'
import { fetchFromAPI} from '../utils/fetchFromApi'
// import { category } from '../utils/constant'
import { ShortSidebar, Videos , SidebarFeed, Load} from '../components';
const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [videos, setVideos] = useState([]);
    useEffect(() =>{
      if(selectedCategory ==='Tất cả'){
        fetchFromAPI(`videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=VN&maxResults=50`)
            .then((data)=>setVideos(data.items));
      } else {
        fetchFromAPI(`search?part=snippet&q=${selectedCategory}&maxResults=50`)
            .then((data)=>setVideos(data.items));
      }
    },[selectedCategory]);
  return (
    <div className='flex mt-14'>
      <ShortSidebar/>
      <div className="min-w-[calc(100%-70px)] max-sm:pl-0 pl-24">
        <SidebarFeed selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div className="">
          <Videos videos={videos}/>
        </div>
      </div>
    </div>
  );
}

export default Feed