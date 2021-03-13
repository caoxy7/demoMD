import React from "react";

import "../Style/Main.css"

function Menu(props){
    const {onChange} = props;

    return(
      <div className="menu">
          <ul>
              <li onClick={() => onChange("#")}>h</li>
          </ul>
      </div>
    );
}

Menu.defalutProps = {
    onChange: ()=>{}
}

export default Menu;