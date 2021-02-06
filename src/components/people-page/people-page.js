import React, { Component } from "react";
import SwapiService from "../../services/swapi";

import { Record } from "../item-details/item-details";
import { PersonList, PersonDetails } from "../sw-components";

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

                <PersonList onPersonSelected={this.onPersonSelected} />
                <PersonDetails 
                itemId={ this.state.selectedPerson}>
                    <Record field="gender" label="Пол" />
                    <Record field="eyeColor" label="Цвет глаз" />
                    <Record field="bithYear" label="Год рождения" />
                </PersonDetails>
            </div>
        )
    }
}