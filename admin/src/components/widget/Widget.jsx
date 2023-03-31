import React from "react";
import './widget.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Widget = (props) => {
    return (
        <div className="widget" >
            <div className="row" style={{ background: props.backgroundColor }}>
                <div className="col-4">
                    <FontAwesomeIcon icon={props.icon} />
                    {/* <img src={props.url} alt="" /> */}
                </div>
                <div className="col-8">
                    <div>
                        <div className="widget-type">{props.type}</div>
                        <div className="widget-countItem">Total: {props.countItem}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Widget;