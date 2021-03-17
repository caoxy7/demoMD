import React,{useState,useRef,useEffect} from 'react';
import marked from 'marked';
import highlight from'highlight.js'
import {Button,Menu,Dropdown} from "antd";

import Tool from './Tool';
import Editor from "./Editor";
import Preview from "./Preview";
import './App.css';
import 'antd/dist/antd.css'

marked.setOptions({
    highlight (code) {
        return highlight.highlightAuto(code).value
    }
})

function App(){
    const [value,setValue] = useState('');
    const [scale,setScale] = useState(0);
    const [listen,setListen] = useState(0);
    const [heights,setHeights] = useState(0);
    const refLeft = useRef(null);
    const refRight = useRef(null);
    const refEditor = useRef(null);
    const refPreview = useRef(null);

    useEffect(()=>{
        setHeights(document.documentElement.clientHeight - document.querySelector('.edit-header').offsetHeight- 300 + 'px');
    },[heights]);

    function onEditorChange(e){

        setValue(marked(e.target.innerText));

    }

    function setListenValue(v){
        setListen(v);
    }

    function onScreenScroll(){
        const r = document.querySelector('.right');
        const l = document.querySelector('.left');
        const edi = document.querySelector('.Editor');
        const pre = document.querySelector('.Preview');
        setScale((r.offsetHeight - pre.offsetHeight) / (l.offsetHeight - edi.offsetHeight));

        if(listen === 1){
            pre.scrollTop = edi.scrollTop * scale;
        }else{
            edi.scrollTop = pre.scrollTop / scale;
        }

        console.log(scale);
    }

    function onClickTool(v){
        document.getElementById('left').focus();
        insertHtml(v);
    }


    function insertHtml(html) {


        let sel, range;
        if (window.getSelection) {
            // IE9 或 非IE浏览器
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)
                let el = document.createElement("div");
                el.innerHTML = html;
                let frag = document.createDocumentFragment(),
                    node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }

    }

    const title = (
        <Menu>
            <Menu.Item>
                <Button onClick={()=>insertHtml('# ')}>h1</Button>
            </Menu.Item>
            <Menu.Item>
                <Button onClick={()=>insertHtml('## ')}>h2</Button>
            </Menu.Item>
            <Menu.Item>
                <Button onClick={()=>insertHtml('### ')}>h3</Button>
            </Menu.Item>
            <Menu.Item>
                <Button onClick={()=>insertHtml('#### ')}>h4</Button>
            </Menu.Item>
            <Menu.Item>
                <Button onClick={()=>insertHtml('##### ')}>h5</Button>
            </Menu.Item>
            <Menu.Item>
                <Button onClick={()=>insertHtml('###### ')}>h6</Button>
            </Menu.Item>
        </Menu>
    );
    const boldFont = (
        <Menu>
            <Menu.Item>
                <Button onClick={()=>insertHtml('*斜体*')}>斜体</Button>
            </Menu.Item>
            <Menu.Item>
                <Button onClick={()=>insertHtml('**粗体**')}>粗体</Button>
            </Menu.Item>
            <Menu.Item>
                <Button onClick={()=>insertHtml('***粗斜体***')}>粗斜体</Button>
            </Menu.Item>
        </Menu>
    );


    return(
        <div className="App">
            <div className="edit-header">
                <div className="title-input">
                    <Dropdown overlay = {title} placement="bottomLeft" arrow>
                        <Button>标题</Button>
                    </Dropdown>
                    <Button onClick={()=>insertHtml('- ')}>无序列表</Button>
                    <Button onClick={()=>insertHtml('> ')}>引用块</Button>
                    <Dropdown overlay = {boldFont} placement = "bottomLeft" arrow>
                        <Button>粗/斜体</Button>
                    </Dropdown>
                    <Button onClick={()=>insertHtml('[]()')}>链接</Button>
                    <Button onClick={()=>insertHtml('![]()')}>图片</Button>
                </div>
            </div>
            <div className="editor-main-a" style={{height:heights}}>
                <div className="Editor common-container" ref={refEditor} onMouseOver={()=>setListenValue(1)} onScroll={onScreenScroll}>
                    <div contentEditable="plaintext-only" id="left" className="left common-wrapper" onInput={onEditorChange} ref={refLeft}/>
                </div>
                <div className="Preview common-container" ref={refPreview} onMouseOver={()=>setListenValue(2)} onScroll={onScreenScroll}>
                    <div className="markdown-body right common-wrapper" dangerouslySetInnerHTML={{__html: value}} ref={refRight}/>
                </div>
            </div>
        </div>
    );
}

export default App;