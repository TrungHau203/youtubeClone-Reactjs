import React,{useState, useEffect} from 'react'
import { Videos,ShortSidebar } from '../components'
import { fetchFromAPI } from '../utils/fetchFromApi'
import { useParams } from 'react-router-dom'

const SearchFeed = () => {
    const [results, setResults] = useState(null);
    const {searchTerm} = useParams();
    console.log(searchTerm);
    useEffect(() => {
        fetchFromAPI(`search?part=snippet&q=${searchTerm}&maxResults=50`)
            .then((data)=>setResults(data.items));
    }, [searchTerm]);
  return (
    <div className=' mt-14'>
        <div className=''>
          <ShortSidebar />
        </div>
        <div className="max-ms:px-0 px-[calc((100%_-_1070px)/2)] ml-20 max-sm:ml-0">
            <Videos videos={results} direction_search/>
        </div>
    </div>
  )
}

export default SearchFeed