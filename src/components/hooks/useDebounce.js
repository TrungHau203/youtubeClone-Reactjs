import { useState,useEffect } from "react";

const useDebounce = ({value, delay}) => {
    const [deBounced, setDeBounced] = useState(value);
    useEffect(()=>{
        const handler = setTimeout(()=>setDeBounced(searchTerm), 900)
        return clearTimeout(handler);
      },[value])
  return deBounced
}

export default useDebounce