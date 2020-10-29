import React from "react"
import {Spinner} from "reactstrap"

const Loading = () =>{
    return(
        <div className="load">
            <div className="spinner">
                <Spinner type="grow" color="primary" />
                <Spinner type="grow" color="primary" />
                <Spinner type="grow" color="primary" />
                <Spinner type="grow" color="primary" />
            </div>
        </div>
    )
}

export default Loading