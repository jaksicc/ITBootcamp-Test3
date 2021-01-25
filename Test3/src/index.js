import { getCompanyInfo, getNextLaunch, getRocketByID, getStarLinkSat } from './service.js'

const divInfo = document.querySelector('#company-info')
const divSatelite = document.querySelector('#satelite-info')
const btnPrikazi = document.querySelector('#prikazi-lansiranje')
const divLansiranje = document.querySelector('#lansiranje')
const divSelect = document.querySelector('#select')
const selectVer = document.querySelector('#select-ver')

let satelites = []

let obj = {
    "spaceTrack": {
        "CCSDS_OMM_VERS": "2.0",
        "COMMENT": "GENERATED VIA SPACE-TRACK.ORG API",
        "CREATION_DATE": "2020-06-19 21:46:09",
        "ORIGINATOR": "18 SPCS",
        "OBJECT_NAME": "STARLINK-1506",
        "OBJECT_ID": "2020-038T",
        "CENTER_NAME": "EARTH",
        "REF_FRAME": "TEME",
        "TIME_SYSTEM": "UTC",
        "MEAN_ELEMENT_THEORY": "SGP4",
        "EPOCH": "2020-06-19 20:00:01.000224",
        "MEAN_MOTION": 15.88829743,
        "ECCENTRICITY": 0.0087515,
        "INCLINATION": 53.002,
        "RA_OF_ASC_NODE": 266.3302,
        "ARG_OF_PERICENTER": 69.9474,
        "MEAN_ANOMALY": 221.4733,
        "EPHEMERIS_TYPE": 0,
        "CLASSIFICATION_TYPE": "U",
        "NORAD_CAT_ID": 45747,
        "ELEMENT_SET_NO": 999,
        "REV_AT_EPOCH": 212,
        "BSTAR": 0.01007,
        "MEAN_MOTION_DOT": 0.03503094,
        "MEAN_MOTION_DDOT": 0.01265,
        "SEMIMAJOR_AXIS": 6683.699,
        "PERIOD": 90.632,
        "APOAPSIS": 364.057,
        "PERIAPSIS": 247.072,
        "OBJECT_TYPE": "PAYLOAD",
        "RCS_SIZE": null,
        "COUNTRY_CODE": "US",
        "LAUNCH_DATE": "2020-06-13",
        "SITE": "AFETR",
        "DECAY_DATE": null,
        "DECAYED": 0,
        "FILE": 2768947,
        "GP_ID": 155985688,
        "TLE_LINE0": "0 STARLINK-1506",
        "TLE_LINE1": "1 45747U 20038T   20171.83334491  .03503094  12654-1  10068-1 0  9995",
        "TLE_LINE2": "2 45747  53.0017 266.3302 0087515  69.9474 221.4733 15.88829743  2124"
    },
    "version": "v1.0",
    "launch": "5eb87d46ffd86e000604b389",
    "longitude": 165.93047730624068,
    "latitude": -52.91311434465077,
    "height_km": 446.61936740361125,
    "velocity_kms": 7.643507427834188,
    "id": "5eed7716096e590006985825"
}


getCompanyInfo().then(res => {
    // console.log(res.data)
    divInfo.innerHTML = `<div>${res.data.name}</div>
    <div>${res.data.founded}</div>
    <div>${res.data.headquarters.address}, ${res.data.headquarters.city}, ${res.data.headquarters.state}`
})



getStarLinkSat().then(res => {
    // console.log(res.data)
    satelites = res.data
    divSatelite.append(Satelites(satelites))
    // generateSelect(satelites)
    console.log(satelites)
    satelites.forEach(satelite => {
        let opt = document.createElement('option')
        opt.value = satelite.version
        opt.textContent = satelite.version
        selectVer.append(opt)
        
    })

})

const Satelite = (satelite) => {
    const divContainer = document.createElement('div')
    const pLine = document.createElement('p')
    pLine.textContent = satelite.spaceTrack.TLE_LINE0

    const pVersion = document.createElement('p')
    pVersion.textContent = satelite.version
    const hr = document.createElement('hr')
    divContainer.append(pLine, pVersion, hr)
    divSatelite.append(divContainer)

}

const Satelites = (satelites) => satelites.map(satelite => Satelite(satelite))
// console.log(Satelite(obj))
// console.log(Satelites(obj))

// const SelectSateliteVer = (versions) =>{
//     const select = document.createElement('section')
//         const defOption = document.createElement('option')
//         defOption.value = '-1'
//         defOption.selected = true
//         defOption.disabled = true
//         defOption.hidden = true
//         defOption.textContent = 'Izaberite verziju'
//     select.append(defOption)

//     versions.forEach(version =>{
//         const option = document.createElement('option')
//         option.value = version
//         option.textContent = version
//         select.append(option)
//     })
//     return select
// }

// function generateSelect(satelites){
//     const selectVersion = SelectSateliteVer(new Set(satelites.map(satelite => satelite.version)))
//     divSelect.append(selectVersion)
// }


const addLaunchToDOM = launch => {
    const divLaunch = document.createElement('div')
    const img = document.createElement('img')
    img.src = launch.links.patch.small

    const pName = document.createElement('p')
    pName.textContent = launch.name

    divLaunch.append(img, pName)
    divLansiranje.append(divLaunch)

}

btnPrikazi.addEventListener('click', () => {
    divSatelite.innerHTML = ''
    getNextLaunch().then(res => {
        console.log(res)
        addLaunchToDOM(res.data)
    })
})


const addRocketToDOM = (rocket) =>{
    const img2 = document.createElement('img')
    img2.src = rocket.flickr_images

    const pName2 = document.createElement('p')
    pName2.textContent = rocket.name
}

getRocketByID().then(res =>{
    console.log(res)
})
