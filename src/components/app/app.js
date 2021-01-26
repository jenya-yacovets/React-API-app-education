import React, { Component } from "react";

import Header from '../header'
import RandomPlanet from '../random-planet'

export default class App extends Component {

    render () {
        return (
            <div>
                < Header />
                <br/>
                <div className="container">
                   < RandomPlanet />
                </div>
            </div>
        )
    }
}