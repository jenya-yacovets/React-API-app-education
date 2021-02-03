import React, { Component } from "react";

import Header from '../header'
import RandomPlanet from '../random-planet'
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";
import SwapiService from "../../services/swapi";
import ItemList from "../item-list";
import PersonDetails from "../person-details";

export default class App extends Component {

    swapiServise = new SwapiService()

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
                    <PeoplePage />
                    <div className="row">
                        <ItemList
                        onPersonSelected={ this.onPersonSelected }
                        getDate={this.swapiServise.getAllPlanets}
                        renderItem={(item) => { return item.name}}
                        />
                        <PersonDetails personId={ this.state.selectedPerson } />
                    </div>
                </div>
            </div>
        )
    }
}