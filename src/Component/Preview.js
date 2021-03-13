import React,{useState,useRef,useEffect} from "react";
import MarkdownIt from "markdown-it";
import tocPlugin from "markdown-it-table-of-contents";
import "./math";
import "mathjax/es5/tex-svg"

import "../Style/Main.css"

const md = new MarkdownIt({
    html: false,
    xhtmlOut: false,
    breaks: false,
    langPrefix: "language-",
    linkify: true,
    typographer: false,
    quotes: "“”‘’"
});
md.use(tocPlugin, { includeLevel: [2, 3], markerPattern: /^\[toc\]/im });

function Preview(props){
    const [math,setMath] = useState(null);
    const { source } = props;
    const previewRef = useRef(null);

    useEffect(()=>{
        if(!math){
            window.MathJax.startup.elements = previewRef.current;
            window.MathJax.startup.getComponents();
            setMath(true);
        }
        previewRef.current.innerHTML = md.render(source || "");
        window.MathJax.typeset();
    },[source,math]);

    return(
        <div className="preview" ref={previewRef}/>
    );
}

export default Preview;