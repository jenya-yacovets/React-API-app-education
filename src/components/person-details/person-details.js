import React, { Component } from "react";
import SwapiService from "../../services/swapi";
import ErrorIndicator from "../error-indicator";
import Spiner from "../spiner";

import './person-details.css'

export default class PersonDetails extends Component {

    swapiServise = new SwapiService()

    state = {
        person: null,
        loading: false,
        error: false
    }

    updatePerson() {
        const { personId } = this.props
        if (!personId) return
        
        this.setState({
            loading: true,
        }) 

        this.swapiServise.getPerson(personId)
        .then(person => {
            this.setState({
                person,
                loading: false,
                error: false
            })  
        })
        .catch(() => {
            this.setState({
                error: true,
                loading: false
            }) 
        })
    }

    componentDidMount() {
        this.updatePerson()
    }
    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson()
        }
    }

    render() {

        const { person, loading, error } = this.state

        const contentError = error ? <ErrorIndicator /> : null
        const contentLoader = loading && !error ? <Spiner /> : null
        const content = !error && !loading ? <PersonView person={ person } /> : null

        return (
        <div className="col-md-8">
             <br/>
            { contentError }
            { contentLoader }
            { content }
        </div>
        )
    }
}

const PersonView = ({ person }) => {

    if (!person) {
        return (
            <span>Выбери персонажа в списке слево</span>
        )
    }

    return (
        <div className="card person-details">
            <h3 className="card-header">Информация о персонаже</h3>
            <div className="card-body">
                <h5 className="card-title">{ person.name }</h5>
            </div>
            <img className="img-fluid d-block user-select-none" alt={ person.name } src={`https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`}></img>
            <br/>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><b>Дата рождения: { person.bithYear }</b></li>
            </ul>
        </div>
    )
}