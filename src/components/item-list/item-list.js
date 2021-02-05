import React from "react";
import SwapiService from '../../services/swapi'
import { withData } from "../hoc-helpers";

const ItemListViews = (props) => {

    const { data, onPersonSelected, renderItem } = props

    const items = data.map(item => {
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
const { getAllPeople } = new SwapiService()

export default withData(ItemListViews, getAllPeople)