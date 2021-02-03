export default class SwapiService {

    _apiBase = `https://swapi.dev/api`
    _imageBase = `https://starwars-visualguide.com/assets/img`

    async getResourse(url) {
        const res = await fetch(`${this._apiBase}${url}`)

        if (!res.ok) {
            throw new Error(`Request error at ${url}. HTTP response status ${res.status}`)
        }
        return await res.json()
    }

    getAllPeople = async () => {
        const res = await this.getResourse(`/people/`)
        return res.results.map(this._transformPerson)
    }

    getPerson = async (id) => {
        const res = await this.getResourse(`/people/${id}`)
        return this._transformPerson(res)
    }

    getAllPlanets = async () => {
        const res = await this.getResourse(`/planets/`)
        return res.results.map(this._trandformPlanet)
    }

    getPlanet = async (id) => {
        const res = await this.getResourse(`/planets/${id}`)
        return this._trandformPlanet(res)
    }

    getAllStarships = async () => {
        const res = await this.getResourse(`/starships/`)
        return res.results.map(this._transformStarchip)
    }

    getStarship = async (id) => {
        const res = await this.getResourse(`/starships/${id}`)
        return this._transformStarchip(res)
    }

    _extractId(item) {
        const idRegeEx = /\/([0-9]*)\/$/;
        return item.url.match(idRegeEx)[1]
    }

    _addUrlImagePlanet(id) {
        return `${this._imageBase}/planets/${id}.jpg`
    }

    _addUrlImagePerson(id) {
        return `${this._imageBase}/characters/${id}.jpg`
    }

    _addUrlImageStarchip(id) {
        return `${this._imageBase}/starships/${id}.jpg`
    }

    _trandformPlanet = (planet) => {
        const id = this._extractId(planet)
        return {
            id,
            image: this._addUrlImagePlanet(id),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    _transformStarchip = (starship) => {
        const id = this._extractId(starship)
        return {
            id,
            image: this._addUrlImageStarchip(id),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    }

    _transformPerson = (person) => {
        const id = this._extractId(person)
        return {
            id,
            image: this._addUrlImagePerson(id),
            name: person.name,
            gender: person.gender,
            bithYear: person.birth_year,
            eyeColor: person.eye_color
        }
    }
}