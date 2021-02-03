import React, { Component } from "react";
import ErrorBoundry from "../error-boundry";
import ErrorIndicator from "../error-indicator";
import Spiner from "../spiner";

export default class ItemList extends Component {

    state = {
        itemList: null,
        loading: true,
        error: false
    }

    componentDidMount() {

        const { getDate } = this.props

        getDate()
            .then((itemList) => {
                this.setState({
                    itemList,
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
        const { itemList, error, loading } = this.state

        const contentError = error ? < ErrorIndicator /> : null
        const contentLoader = loading ? < Spiner /> : null
        const content = !error && !loading ? <ItemListViews 
        itemList={ itemList } 
        onPersonSelected={ this.props.onPersonSelected }
        renderItem={this.props.renderItem}
        /> : null
        
        return (
            <div className="col-md-4">
                <ErrorBoundry>
                    <br/>
                    { contentError }
                    { contentLoader }
                    { content }
                </ErrorBoundry>
            </div>
        )
    }
}

const ItemListViews = ({ itemList, onPersonSelected, renderItem }) => {


    const items = itemList.map(item => {
        const label = renderItem(item)

        return  (
            <li key={ item.id } 
            className="list-group-item"
            onClick={ () => onPersonSelected(item.id)}
            >
            { label }
            </li>
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