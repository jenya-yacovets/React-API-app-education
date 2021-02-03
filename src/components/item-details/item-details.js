import React, { Component } from "react";
import SwapiService from "../../services/swapi";
import ErrorIndicator from "../error-indicator";
import Spiner from "../spiner";

import './item-details.css'

export default class ItemDetails extends Component {

    swapiServise = new SwapiService()

    state = {
        item: null,
        image: null,
        loading: false,
        error: false
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props
        if (!itemId) return
        
        this.setState({
            loading: true,
        }) 

        getData(itemId)
        .then(item => {
            this.setState({
                item,
                image: getImageUrl(item),
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
        this.updateItem()
    }
    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
    }

    render() {

        const { item, loading, error, image } = this.state

        const contentError = error ? <ErrorIndicator /> : null
        const contentLoader = loading && !error ? <Spiner /> : null
        const content = !error && !loading ? <ItemView item={item} image={image} /> : null

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

const ItemView = ({ item, image }) => {
    if (!item) {
        return (
            <span>Выбери персонажа в списке слево</span>
        )
    }

    return (
        <div className="card person-details">
            <h3 className="card-header">Информация о персонаже</h3>
            <div className="card-body">
                <h5 className="card-title">{ item.name }</h5>
            </div>
            <img className="img-fluid d-block user-select-none" alt={ item.name } src={image}></img>
            <br/>
            <ul className="list-group list-group-flush">
            <li className="list-group-item"><b>Дата рождения: { item.bithYear }</b></li>
            <li className="list-group-item"><b>Пол: { item.gender }</b></li>
            </ul>
        </div>
    )
}