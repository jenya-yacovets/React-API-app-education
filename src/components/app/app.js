import React, { Component } from "react";

import Header from '../header'
import ItemList from "../item-list";
import RandomPlanet from '../random-planet'
import PersonDetails from '../person-details'

export default class App extends Component {

    state = {
        selectedPerson: null
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    }

    render () {
        return (
            <div>
                < Header />
                <br/>
                <div className="container">
                    <div className="row">
                        < RandomPlanet />
                    </div>
                    <br/>
                    <div className="row">
                        < ItemList onPersonSelected={ this.onPersonSelected } />
                        <PersonDetails personId={ this.state.selectedPerson } />
                    </div>
                </div>
            </div>
        )
    }
}