import React,{ useState,useEffect } from "react";

function useWidth(){
    const [width,setWidth] = useState(window.innerWidth);

    useEffect(()=>{
        const handleWidth = () => setWidth(window.innerWidth);
        window.addEventListener('resize',handleWidth);
        return ()=>{
            window.removeEventListener('resize',handleWidth);
        }
    });

    return width;
}

export default useWidth;