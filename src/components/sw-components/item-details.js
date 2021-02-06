import SwapiService from "../../services/swapi"
import { withDataItemDetails } from "../hoc-helpers"
import ItemDetails from "../item-details"

const  { getPerson } = new SwapiService()

const PersonDetails = withDataItemDetails(ItemDetails, getPerson)

const PlanetDetails = () => {
    
}
const StarshipDetails = () => {
    
}

export {
    PersonDetails,
    PlanetDetails,
    StarshipDetails
}