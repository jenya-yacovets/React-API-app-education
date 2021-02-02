import React, { Component } from "react"
import SwapiService from "../../services/swapi"
import ErrorIndicator from "../error-indicator"
import Spiner from '../spiner'

import './random-planet.css'

export default class RandomPlanet extends Component {

    swapiServise = new SwapiService()

    state = {
        planet: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updatePlanet()
        this.interval = setInterval(this.updatePlanet, 5000)
    }

    onPlanetLoaded = (planet) => {
        this.setState({ 
            planet,
            loading: false
         })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
         })
    }

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 20) + 2

        this.swapiServise.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    }

    render() {

        const { loading, planet, error } = this.state

        const contentError = error ? < ErrorIndicator /> : null
        const contentLoader = loading ? <Spiner /> : null
        const content = !loading && !error ? <PlanetView planet={ planet } /> : null

        return (
            <div className="col-md-12">
                <div className="text-white bg-dark random-planet">
                    { content }
                    { contentLoader }
                    { contentError }
                </div>
            </div>
        )
    }
}

const PlanetView = ({ planet }) => {

    const { id, name, population, rotationPeriod, diameter } = planet
    
    return (

        <React.Fragment>
            <div className="row">
                <div className="col-md-3">
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
        </React.Fragment>
    )
}