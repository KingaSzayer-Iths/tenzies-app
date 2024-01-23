import React from "react";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "rgb(249 136 203)" : "#d1ccf6"
    }
    return (
        <div className="die-face" style={styles} onClick={props.holdDice}>
            {/* <h2 className={'dot dice-num die-num '+
                (props.topLeft ? 'dot top-left ' : '') + 
                (props.topCenter ? 'dot top-center ' : '') +
                (props.topRight ? 'dot top-right ' : '') + 
                (props.center ? 'dot center ' : '') + 
                (props.bottomLeft ? 'dot bottom-left ' : '') +
                (props.bottomCenter ? 'dot bottom-center ' : '') +
                (props.bottomRight ? 'dot bottom-right ' : '')
                }>{props.value}</h2> */}
                {/* <div className={'dice-num die-num '+
                (props.topLeft ? 'top-left ' : '') + 
                (props.topCenter ? 'top-center ' : '') +
                (props.topRight ? 'top-right ' : '') + 
                (props.center ? 'center ' : '') + 
                (props.bottomLeft ? 'bottom-left ' : '') +
                (props.bottomCenter ? 'bottom-center ' : '') +
                (props.bottomRight ? 'bottom-right ' : '')} 
                /> */}
                {props.topLeft ? <div className="dot top-left"></div> : ''}
                {props.topCenter ? <div className="dot top-center"></div> : ''}
                {props.topRight ? <div className="dot top-right"></div> : ''}
                {props.center ? <div className="dot center"></div> : ''}
                {props.bottomLeft ? <div className="dot bottom-left"></div> : ''}
                {props.bottomCenter ? <div className="dot bottom-center"></div> : ''}
                {props.bottomRight ? <div className="dot bottom-right"></div> : ''}
        </div>
    )
}