import React from "react"

import './item-details.css'

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
                <h5 className="card-title">{item.name}</h5>
            </div>
            <img className="img-fluid d-block user-select-none" alt={item.name} src={item.image}></img>
            <br />
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, { item })
                    })
                }
            </ul>
        </div>
    )
}

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item"><b>{label}: {item[field]}</b></li>
    )
}

export default ItemView

export {
    Record
}