import SwapiService from '../../services/swapi'
import { withData } from "../hoc-helpers"
import ItemList from '../item-list'

const  { getAllPeople, getAllPlanets, getAllStarships } = new SwapiService()

const PersonList = withData(ItemList, getAllPeople)

const PlanetList = withData(ItemList, getAllPlanets)

const StarshipList = withData(ItemList, getAllStarships)

export {
    PersonList,
    PlanetList,
    StarshipList
}