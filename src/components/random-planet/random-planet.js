import React, { Component } from "react"
import SwapiService from "../../services/swapi"
import ErrorIndicator from "../error-indicator"
import Spiner from '../spiner'

export default class RandomPlanet extends Component {

    swapiServise = new SwapiService()

    state = {
        planet: {},
        loading: true,
        error: false
    }

    constructor() {
        super()
        this.updatePlanet()
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

        const errorContent = error ? < ErrorIndicator /> : null
        const contentLoader = loading ? <Spiner /> : null
        const content = !loading && !error ? <PlanetView planet={ planet } /> : null

        return (
            <div className="row g-0 text-white bg-dark">
                { content }
                { contentLoader }
                { errorContent }
            </div>
        )
    }
}

const PlanetView = ({ planet }) => {

    const { id, name, population, rotationPeriod, diameter } = planet
    
    return (

        <React.Fragment>
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
        </React.Fragment>
    )
}