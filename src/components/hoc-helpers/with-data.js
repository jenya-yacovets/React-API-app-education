import React, { Component } from "react";
import ErrorBoundry from "../error-boundry";
import ErrorIndicator from "../error-indicator";
import Spiner from "../spiner";

const withData = (View, getDate) => {

    return class extends Component {

        state = {
            data: null,
            loading: true,
            error: false
        }
    
        componentDidMount() {

            getDate()
                .then((data) => {
                    this.setState({
                        data,
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
            const { data, error, loading } = this.state
    
            const contentError = error ? < ErrorIndicator /> : null
            const contentLoader = loading ? < Spiner /> : null
            const content = !error && !loading ? <View 
            data={ data } 
            {...this.props}
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
}

export default withData