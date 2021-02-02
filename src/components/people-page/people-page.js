import React, { Component } from "react";
import ErrorIndicator from "../error-indicator";

import ItemList from "../item-list";
import PersonDetails from "../person-details";

export default class PeoplePage extends Component {

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
                <ItemList onPersonSelected={ this.onPersonSelected } />
                <PersonDetails personId={ this.state.selectedPerson } />
            </div>
        )
    }
}