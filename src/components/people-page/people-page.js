import React, { Component } from "react";
import SwapiService from "../../services/swapi";

import ItemDetails from "../item-details";
import { Record } from "../item-details/item-details";
import { PersonList } from "../sw-components";

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

                <PersonList 
                onPersonSelected={this.onPersonSelected}
                renderItem={({name, gender}) => `${name} (${gender})`}
                />
                <ItemDetails 
                itemId={ this.state.selectedPerson}
                getData={this.swapiServise.getPerson}>
                    <Record field="gender" label="Пол" />
                    <Record field="eyeColor" label="Цвет глаз" />
                    <Record field="bithYear" label="Год рождения" />
                </ItemDetails>
            </div>
        )
    }
}