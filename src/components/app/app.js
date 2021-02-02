import React, { Component } from "react";

import Header from '../header'
import RandomPlanet from '../random-planet'
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";

export default class App extends Component {

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }
     
    render () {

        if (this.state.error) return <ErrorIndicator />

        return (
            <div>
                < Header />
                <br/>
                <div className="container">
                    <div className="row">
                        < RandomPlanet />
                    </div>
                    <br/>
                    <PeoplePage />
                </div>
            </div>
        )
    }
}