import React from 'react';
import './App.css';


function Editor(){
    return(
        <div contentEditable="plaintext-only" className="left" />
    );
}

export default Editor;