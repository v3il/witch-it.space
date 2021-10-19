import axios from 'axios'
import items from '../../shared/items.json'
import { WitchItApiService } from './WitchItApiService'
import { QuestsService } from './QuestsService'

const axiosInstance = axios.create({
    baseURL: 'https://master.witchit.com/api/v1',
    timeout: 5000,
    headers: {
        'User-Agent': 'WitchIt/++UE4+Release-4.27-CL-0 Windows/10.0.19041.1.256.64bit',
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Length': 0,
        // 'Accept-Encoding': 'deflate, gzip',
        Host: 'master.witchit.com',
        Accept: '*/*'
    }
})

export const witchItApiService = new WitchItApiService({ axiosInstance })
export const questsService = new QuestsService(items)
