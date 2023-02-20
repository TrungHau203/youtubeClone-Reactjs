import React, {useState,useEffect } from 'react'
import {Load} from '../components'
import {fetchFromAPI} from '../utils/fetchFromApi'
// import {categories} from '../utils/constant'
const SidebarFeed = ({selectedCategory,setSelectedCategory}) => {
    const [categories, setCategories] = useState(["Tất cả",]);
    useEffect(() =>{
        fetchFromAPI('videoCategories?part=snippet&regionCode=VN')
            .then((data)=>setCategories(data.items));
    },[]);
    // console.log(categories);
    console.log(categories);
    // console.log(selectedCategory===category?.snippet?.title);
    function objectToArray(object) {
        var addFirst = ["Tất cả"];
        var arr = object.map(object=>object?.snippet?.title);
        addFirst.push(...arr);
        return addFirst;
    }
  return (
    <div className='flex leading-4 overflow-y-hidden whitespace-nowrap'>
        {
            objectToArray(categories).map((category,index)=>{
            return (
                <button onClick={()=>{
                    setSelectedCategory(category)
                }} key={index} className={`${selectedCategory===category?'bg-black text-white':'bg-slate-200'}  m-2 p-2 rounded-lg`}>
                    <p className='block'>{category}</p>
                </button>
            )
        })
        }
    </div>
  )
}

export default SidebarFeed
// categories.map((category,index)=>{
//     return (
//         <button onClick={()=>{
//             setSelectedCategory(category?.snippet?.title)
//             console.log(selectedCategory===category?.snippet?.title);
//         }} key={index} className={`${selectedCategory===category?.snippet?.title}'bg-black text-white':'bg-slate-200'}  m-2 p-2 rounded-lg`}><p className='block'>{category?.snippet?.title}</p></button>
//     )
// })