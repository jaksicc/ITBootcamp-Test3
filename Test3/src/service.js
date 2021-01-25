import axios from 'axios'

const BASE_URL = 'https://api.spacexdata.com/v4'
const COMPANY_INFO = '/company'
const SATELITES = '/starlink'
const NEXT_LAUNCH = '/launches/next'
const ROCKETS = '/rockets'
const ROCKET_ID = '/:id'

export const getCompanyInfo = () => {
    return axios.get(`${BASE_URL}${COMPANY_INFO}`)

}

export const getStarLinkSat = () =>{
    return axios.get(`${BASE_URL}${SATELITES}`)
}

export const getNextLaunch = () => {
    return axios.get(`${BASE_URL}${NEXT_LAUNCH}`)
}

export const getRocketByID = () => {
    return axios.get(`${BASE_URL}${ROCKETS}${ROCKET_ID}`)
}