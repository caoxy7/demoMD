import React,{ useState,useRef,useEffect } from 'react';
import {editor} from 'monaco-editor';

import { debounce } from 'lodash';

import "../Style/Main.css";
import useWidth from "./hooks/useWidth";

function Editor(props){
    const editorRef = useRef(null);
    const [count,setCount]=useState(0);
    const { flag,tool,value,onChange } = props;


    useEffect(()=>{
       const mdEditor = editor.create(editorRef.current,{
           value: value,
           language: "markdown",
           wordWrap:"on",
           fontSize:20,
           theme: "vs-dark",
           minimap:{
               enabled:false
           }

       });

       const mdModel = mdEditor.getModel();
       mdModel.onDidChangeContent(() => {
           let str = mdModel.getValue();
           onChange(str);
       });


       const handleResize = () => mdEditor.layout(editorRef.current.getBoundingClientRect());
       window.addEventListener('resize',handleResize);
       return ()=>{
           window.removeEventListener('resize',handleResize);
       }


    },[flag,value,onChange]);



    return(
      <div className="editor" ref={editorRef}/>
    );
}

Editor.defaultProps = {
    value:'',
    onChange:() => { },
    onCursorChange:() => { }
};

export default Editor;