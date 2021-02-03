import React, { Component } from "react";
import SwapiService from "../../services/swapi";
import ErrorIndicator from "../error-indicator";
import Spiner from "../spiner";

export default class ItemList extends Component {

    swapiServise = new SwapiService()

    state = {
        peopleList: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.swapiServise.getAllPeople()
            .then((peopleList) => {
                this.setState({
                    peopleList,
                    loading: false,
                    error: false
                })
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    error: true
                })
            })
    }

    render() {
        const { peopleList, error, loading } = this.state
        const contentError = error ? < ErrorIndicator /> : null
        const contentLoader = loading ? < Spiner /> : null
        const content = !error && !loading ? <ItemListViews peopleList={ peopleList } onPersonSelected={ this.props.onPersonSelected } /> : null
        
        return (
            <div className="col-md-4">
                { contentError }
                { contentLoader }
                { content }
            </div>
        )
    }
}

const ItemListViews = ({ peopleList, onPersonSelected }) => {

    const items = peopleList.map(item => {
        return  (
            <li key={ item.id } 
            className="list-group-item"
            onClick={ () => onPersonSelected(item.id)}
            >{ item.name }</li>
        )
    })

    return (
        <div className="card" style={{ width: '18rem' }}>
            <ul className="list-group list-group-flush">
               { items }
            </ul>
        </div>
    )
}