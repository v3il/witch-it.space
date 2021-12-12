import { RaritiesManager } from './RaritiesManager'
import { EventsManager } from './EventsManager'
import { SlotsManager } from './SlotsManager'

export { Rarity } from './Rarity'

export const slotsManager = new SlotsManager()
export const eventsManager = new EventsManager()
export const raritiesManager = new RaritiesManager()
