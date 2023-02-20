import React,{ useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TippyDefault from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
// gợi ý tìm kiếm ................
// import Tippy from '@tippyjs/react/headless';
// import { Popper } from "../components"
const SearchBar = () => {
    // const [results, setResults] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [deBounced, setDeBounced] = useState(searchTerm);
    const searchRef = useRef();
    const navigate = useNavigate();
    useEffect(()=>{
    const handler = setTimeout(()=>setDeBounced(searchTerm), 900)
    return ()=>clearTimeout(handler);
    },[searchTerm])
    useEffect(() => {
    if(!deBounced.trim()){
        setSearchTerm('')
        return ;
    }

    }, [deBounced]);
    // Định làm gợi ý, à mà thôi ...
    // const widthOfSearch = ()=>{
    // const width = searchRef.current?.offsetWidth?searchRef.current.offsetWidth:440;
    // return width;
    // }
    // window.addEventListener("resize",widthOfSearch);
    const handleSearchTerm = function(e){
        e.preventDefault();
        if(searchTerm){
            navigate(`/search/${deBounced}`)
            console.log(searchTerm);
        }
    }
  return (
    <div>
        {/* <Tippy
            interactive
            visible={searchTerm.length > 0}
            render={attrs => (
                <div {...attrs} className={`w-[${searchRef.current.offsetWidth}px]`}>
                <Popper>
                    hiih
                </Popper>
                </div>
            )}
            > */}
            <form ref={searchRef} className="flex" onSubmit={handleSearchTerm} >
            <input type="search" value={searchTerm} name="search" onChange={e=>setSearchTerm(e.target.value)} className="border-gray-800 border rounded-l-3xl p-1.5 lg:w-96 focus:outline-none relative" placeholder='Tìm kiếm' autoComplete="off"/>
            <TippyDefault content="Tìm kiếm">
                <button className="bg-zinc-200 rounded-r-3xl py-1.5 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                </button>
            </TippyDefault>
            </form>
        {/* </Tippy> */}
    </div>
  )
}

export default SearchBar