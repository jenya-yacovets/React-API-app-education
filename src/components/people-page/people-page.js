import React, { Component } from "react";
import SwapiService from "../../services/swapi";
import ErrorIndicator from "../error-indicator";

import ItemList from "../item-list";
import PersonDetails from "../person-details";

export default class PeoplePage extends Component {

    swapiServise = new SwapiService()

    state = {
        selectedPerson: null,
        error: false
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if(this.state.error) return <ErrorIndicator />
        
        return(
            <div className="row">
                <ItemList onPersonSelected={ this.onPersonSelected } getDate={this.swapiServise.getAllPeople} />
                <PersonDetails personId={ this.state.selectedPerson } />
            </div>
        )
    }
}