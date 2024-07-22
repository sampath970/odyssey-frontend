import React from "react";

export default function Panel(props) {
    console.log(props)
    return <div style={{backgroundColor:"white",padding:"0 0 12px 0",borderRadius:"12px",height:"inherit"}}>{props.children}</div>;
}