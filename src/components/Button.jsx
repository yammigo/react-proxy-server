
import React from "react"
import PropTypes from "prop-types"
const Button=(props)=>{
    return (<button className="ml-6 bg-blue-600 text-white active:opacity-90 h-10 px-5">
        {props.children}
    </button>)
}
Button.propTypes  ={
    children:PropTypes.oneOfType([
        PropTypes.node
    ]).isRequired
}
export default Button