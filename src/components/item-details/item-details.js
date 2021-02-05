import React, { Component } from "react";
import SwapiService from "../../services/swapi";
import ErrorIndicator from "../error-indicator";
import Spiner from "../spiner";

import './item-details.css'

export default class ItemDetails extends Component {

    swapiServise = new SwapiService()

    state = {
        item: null,
        loading: false,
        error: false
    }

    updateItem() {
        const { itemId, getData } = this.props
        if (!itemId) return
        
        this.setState({
            loading: true,
        }) 

        getData(itemId)
        .then(item => {
            this.setState({
                item,
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

        const { item, loading, error } = this.state

        const contentError = error ? <ErrorIndicator /> : null
        const contentLoader = loading && !error ? <Spiner /> : null
        const content = !error && !loading ? <ItemView item={item} children={this.props.children} /> : null

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

const ItemView = ({ item, children }) => {
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
            <img className="img-fluid d-block user-select-none" alt={ item.name } src={item.image}></img>
            <br/>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </div>
    )
}

const Record = ({item, field, label}) => {
    return(
        <li className="list-group-item"><b>{label}: { item[field] }</b></li>
    )
}

export {
    Record
}