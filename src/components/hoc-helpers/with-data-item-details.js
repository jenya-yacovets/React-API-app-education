import React, { Component } from "react";
import SwapiService from "../../services/swapi";
import ErrorIndicator from "../error-indicator";
import Spiner from "../spiner";

const withDataItemDetails = (View, getData) => {
    return class extends Component {

        swapiServise = new SwapiService()

        state = {
            item: null,
            loading: false,
            error: false
        }

        updateItem() {
            const { itemId } = this.props
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
            const content = !error && !loading ? <View item={item} children={this.props.children} /> : null

            return (
                <div className="col-md-8">
                    <br />
                    { contentError}
                    { contentLoader}
                    { content}
                </div>
            )
        }
    }
}

export default withDataItemDetails