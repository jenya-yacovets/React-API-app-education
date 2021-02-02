import React, { Component } from "react";

import './error-indicator.css'

export default class ErrorIndicator extends Component {

    render () {
        return(
            <div className="container error-indicator">
                <span>Произошла ошибка, дроны уже вылетели для устранения неполадок :-)</span>
            </div>
        )
    }
}