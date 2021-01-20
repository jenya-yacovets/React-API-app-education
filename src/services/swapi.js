export default class SwapiService {

    _apiBase = `https://swapi.dev/api`

    async getResourse(url) {
        const res = await fetch(`${this._apiBase}${url}`)

        if (!res.ok) {
            throw new Error(`Request error at ${url}. HTTP response status ${res.status}`)
        }
        return await res.json()
    }

    async getAllPeople() {
        const res = await this.getResourse(`/people/`)
        return res.results
    }

    getPerson(id) {
        return this.getResourse(`/people/${id}`)
    }

    async getAllPlanets() {
        const res = await this.getResourse(`/planets/`)
        return res.results
    }

    getPlanet(id) {
        return this.getResourse(`/planets/${id}`)
    }

    async getAllStarships() {
        const res = await this.getResourse(`/starships/`)
        return res.results
    }

    getStarship(id) {
        return this.getResourse(`/starships/${id}`)
    }
}