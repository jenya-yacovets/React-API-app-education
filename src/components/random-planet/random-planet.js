import React, { Component } from "react"
import SwapiService from "../../services/swapi"

export default class RandomPlanet extends Component {

    swapiServise = new SwapiService()

    state = {
        planet: {}
    }

    constructor() {
        super()
        this.updatePlanet()
    }

    onPlanetLoaded = (planet) => {
        this.setState({ planet })
    }

    updatePlanet() {

        const id = Math.floor(Math.random() * 20) + 2

        this.swapiServise.getPlanet(id)
            .then(this.onPlanetLoaded)
    }

    render() {

        const { planet: { id, name, population, rotationPeriod, diameter } } = this.state

        return (
            <div className="row g-0 text-white bg-dark">
                <div className="col-md-4">
                    <img className="img-fluid" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}></img>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text"><b>population: </b>{population}</p>
                        <p className="card-text"><b>Rotation Period: </b>{rotationPeriod}</p>
                        <p className="card-text"><b>Диаметр: </b>{diameter}</p>
                    </div>
                </div>
            </div>
        )
    }
}