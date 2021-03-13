import React ,{useState} from 'react';
import { editor } from 'monaco-editor';

import Menu from './Menu';
import Preview from './Preview';
import Editor from './Editor';
import "../Style/Main.css";

function Main(){
    const [source,setSource] = useState('');
    const [tool,setTool] = useState('');
    const [flag,setFlag] = useState(0);

    function handleSourceChange(newSource){
        setSource(newSource);
    }

    function handleToolChange(newTool){
        setTool(newTool);
        console.log(tool);
        setFlag(flag+1);

    }


    return(
        <div className="main">
            <Menu onChange={handleToolChange}/>
            <Editor flag = {flag} tool = {tool} value={source} onChange = {handleSourceChange} />
            <Preview source = {source} />
        </div>
    );
}

export default Main;