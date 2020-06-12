/**
 * @fileoverview JS file with all Axios XMLHttpRequests,
 * Axios transforms JSON Data Automatically.
 * @author Tom Jones <tom@wilson-express.co.uk>
 */

/** 
 * Constants and Variables,
 * SpaceX Endpoints Used on multiple Functions
 * @const  {string} A URL to Retrieve Main SpaceX API
 * @const  {string} A URL to Retrieve SpaceX info API 
 * @type {string} A quierystring to add to end of an endpoint
 */
const spaceX = "https://api.spacexdata.com/v3/";
const infoApi = "https://api.spacexdata.com/v3/info";

let btnValue = "?limit=10&offset=84";


/** 
 * Function to retrieve data from 3 endpoints
 * Upcoming launch, launch sites and land sites.
 */
function homepageData() {

    /** SpaceX endpoints  */
    const upcomingApi = "https://api.spacexdata.com/v3/launches/upcoming";
    const launchPads = "https://api.spacexdata.com/v3/launchpads";
    const landPads = "https://api.spacexdata.com/v3/landpads";

    /** perform multiple XMLHttpRequests */
    axios.all([
        axios.get(upcomingApi),
        axios.get(launchPads),
        axios.get(landPads)
    ])

        /** Spread response data across associated variables */
        .then(axios.spread((upcomingApi, launchPads, landPads) => {

            upcoming = upcomingApi.data;
            launchData = launchPads.data;
            landData = landPads.data;

            /** Call all functions within homepage.js */
            carousel();
            active();
            siteLabels();
            headers();
            launchSiteData();
            landSiteData();
        }));
}

/** Function to retrieved data from the rockets API endpoint */
function callRockets() {

    /** request and turn response data into a variable to be used within rockets.js */
    axios.get("https://api.spacexdata.com/v3/rockets").then(response => {
        rockets = response.data;

        /** call all related functions within rockets.js */
        eachRocket();
    });
}

/** Function which retrieves specific rocket data once user selects which one  */
function oneRocket() {

    /** displays loader before specific rocket data is loaded */
    $("#loader").removeClass("hide-loader");

    /** 
     * Request data from the main spaceX URL + the value of the button selected 
     * and turn data into a variable for use within rockets.js
     */
    axios.get(spaceX + btnValue).then(response => {
        specificRocket = response.data;

        /** Call all related functions within rockets.js */
        rocketSpec();
    });
}

/** Function to retrieve data from the dragons API endpoint */
function callDragons() {

    /** request and turn response data into a variable to be used within dragons.js */
    axios.get("https://api.spacexdata.com/v3/dragons").then(response => {
        dragons = response.data;

        /** call all related functions within dragons.js */
        eachDragon();
    });
}

/** Function which retrieves specific dragon data once user selects which one  */
function oneDragon() {

    /** displays loader before specific rocket data is loaded */
    $("#loader").removeClass("hide-loader");

    /** 
     * Request data from the main spaceX URL + the value of the button selected 
     * and turn data into a variable for use within dragons.js
     */
    axios.get(spaceX + btnValue).then(response => {
        specificDragon = response.data;

        /** call all related functions within dragons.js */
        dragonSpec();
    });
}

/**
 * Function to change the value of the btnValue Variable
 * @param {string} value 
 */
function getValue(value) {

    /** btnValue value changed to the value attribute of the selected button */
    btnValue = value;

    /** checks to see if eachRocket is a functions on the current page  */
    if (typeof eachRocket === "function") {

        /** call oneRocket function to produce new response data */
        oneRocket();

    /** checks to see if eachDragon is a functions on the current page  */
    } else if (typeof eachDragon === "function") {

        /** call oneDragon function to produce new response data */
        oneDragon();
    }
}

/** function to retrieve data from the missions api endpoint */
function callMissions() {

    axios.get("https://api.spacexdata.com/v3/missions").then(response => {
        missionData = response.data;
        eachMission();
    });
}

/** function to retrieve data from the past launches api endpoint + the value of the  */
function callLaunches() {

    axios.get("https://api.spacexdata.com/v3/launches/past" + btnValue).then(response => {
        launchData = response.data;
        launchReversed = launchData.slice().reverse();
        allLaunches();
    });
}



function getPagination(value) {
    btnValue = value;
    callLaunches();
    clearData();
    $("#loader").removeClass("hide-loader");
}



function callHistory() {

    axios.get("https://api.spacexdata.com/v3/history").then(response => {
        historyData = response.data;
        historyReversed = historyData.slice().reverse();
        allHistory();
    });
}



function callAbout() {
    
    axios.all([
        axios.get(spaceX),
        axios.get(infoApi)
    ])
        .then(axios.spread((spaceX, infoApi) => {
            spacexData = spaceX.data;
            infoApiData = infoApi.data;
            aboutPage();
        }));
}

/** function to clear all HTML from pages if called */ 
function clearData() {
    launches.innerHTML = "";
}