import SwapiService from '../../services/swapi'
import { withData } from "../hoc-helpers"
import ItemList from '../item-list'

const  { getAllPeople, getAllPlanets, getAllStarships } = new SwapiService()

const withChildrenFunction = (View, func) => {

    return (props) => {
        return (
            <View {...props}>
                {func}
            </View>
        )
    }
}

const newItemList = withChildrenFunction(ItemList, ({name}) => name)

const PersonList = withData(newItemList, getAllPeople)

const PlanetList = withData(newItemList, getAllPlanets)

const StarshipList = withData(newItemList, getAllStarships)

export {
    PersonList,
    PlanetList,
    StarshipList
}