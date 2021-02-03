import React, { Component } from "react";
import SwapiService from "../../services/swapi";

import ItemList from "../item-list";
import PersonDetails from "../person-details";

export default class PeoplePage extends Component {

    swapiServise = new SwapiService()

    state = {
        selectedPerson: null,
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    }

    render() {
        
        return(
            <div className="row">
                <ItemList 
                onPersonSelected={this.onPersonSelected} 
                getDate={this.swapiServise.getAllPeople}
                renderItem={({name, gender}) => `${name} (${gender})`}
                />
                <PersonDetails personId={ this.state.selectedPerson } />
            </div>
        )
    }
}