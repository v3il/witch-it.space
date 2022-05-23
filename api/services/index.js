import axios from 'axios'
import items from '../../shared/items111.json'
import { WitchItApiService } from './WitchItApiService'
import { QuestsService } from './QuestsService'
import { UserService } from './UserService'
import { WishlistService } from './WishlistService'
import { PriceService } from './PriceService'

const axiosInstance = axios.create({
    baseURL: 'https://master.witchit.com/api/v1',
    timeout: 5000,
    headers: {
        'User-Agent': 'User-Agent: WitchIt/++UE4+Release-4.27-CL-0 Windows/10.0.19044.1.256.64bit',
        'Content-Type': 'application/x-www-form-urlencoded',
        Host: 'master.witchit.com',
        Accept: '*/*'
    }
})

export const witchItApiService = new WitchItApiService({ axiosInstance })
export const questsService = new QuestsService({ witchItApiService })
export const userService = new UserService()
export const priceService = new PriceService()
export const wishlistService = new WishlistService({ priceService })
