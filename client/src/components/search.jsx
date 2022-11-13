import React from "react";
import LoaderGif from'../assets/images/chercher.gif'
export default function Loader_cherche(){
    return (
        <div className="cherche-position">
         <img src={LoaderGif} alt="" />
        </div>
    )
}