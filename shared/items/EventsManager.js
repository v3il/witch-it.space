export class EventsManager {
    #events = [
        { value: 'mystic sands', label: 'Mystic Sands' },
        { value: 'winterdream witch', label: 'Winter Dream Witch' },
        { value: 'chinese newyear', label: 'Chinese New Year' },
        { value: 'summerevent', label: 'Summer Event' },
        { value: 'halloween', label: 'Halloween' },
        { value: 'winterdream', label: 'Winter Dream' },
        { value: 'winterdream2018', label: 'Winter Dream 2018' },
        { value: 'winterdream2019', label: 'Winter Dream 2019' },
        { value: 'winterdream2020', label: 'Winter Dream 2020' },
        { value: 'theater', label: 'Theater' },
        { value: 'springfever', label: 'Spring Fever' },
        { value: 'plunderparty', label: 'Plunder Party' },
        { value: 'halloween2018', label: 'Halloween 2018' },
        { value: 'halloween2019', label: 'Halloween 2019' },
        { value: 'halloween2020', label: 'Halloween 2020' },
        { value: 'witchforest', label: 'Witch Forest' }
    ]

    find (value) {
        return this.#events.find(event => event.value === value)
    }

    getAll () {
        return this.#events
    }
}
