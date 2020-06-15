/**
 * @fileoverview JS file with all Axios XMLHttpRequests,
 * Axios transforms JSON Data Automatically.
 * @author Tom Jones <tom@wilson-express.co.uk>
 */


/** 
 * Constants and Variables,
 * SpaceX Endpoints Used on multiple Functions
 * @const {string} spaceX URL to Retrieve Main SpaceX API
 * @const {string} infoApi URL to Retrieve SpaceX info API 
 * @const {string} upcomingApi URL to Retrieve SpaceX upcoming launches API 
 * @const {string} launchPads URL to Retrieve SpaceX launch sites API 
 * @const {string} landPads URL to Retrieve SpaceX land sites API 
 * @const {HTMLElement} mainContent Get data element and add to variable
 * @type {string} A quierystring to add to end of an endpoint
 */
const spaceX = "https://api.spacexdata.com/v3/";
const infoApi = "https://api.spacexdata.com/v3/info";
const upcomingApi = "https://api.spacexdata.com/v3/launches/upcoming";
const launchPads = "https://api.spacexdata.com/v3/launchpads";
const landPads = "https://api.spacexdata.com/v3/landpads";
const mainContent = document.getElementById("data");

let btnValue = "?limit=10&offset=84";

/** 
 * Function to retrieve data from 3 endpoints
 * Upcoming launch, launch sites and land sites.
 */
function homepageData() {

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

    /** 
     * request and turn response data into a variable
     * and call all related functions within rockets.js 
     */ 
    axios.get("https://api.spacexdata.com/v3/rockets").then(response => {
        rockets = response.data;
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
        rocketSpec();
    });
}

/** Function to retrieve data from the dragons API endpoint */
function callDragons() {

    /** 
     * request and turn response data from dragons api into a variable 
     * and call all related functions within dragons.js
     */
    axios.get("https://api.spacexdata.com/v3/dragons").then(response => {
        dragons = response.data;
        eachDragon();
    });
}

/** Function which retrieves specific dragon data once user selects which one  */
function oneDragon() {

    /** displays loader before specific rocket data is loaded */

    $("#loader").removeClass("hide-loader");

    /** 
     * request data from spacex main api and btn value and add to a variable
     * then call all related functions within Dragons.js
     */
    axios.get(spaceX + btnValue).then(response => {
        specificDragon = response.data;
        dragonSpec();
    });
}

/**
 * Function added to onclick attribute to change the btnValue
 * depending on the value of the btn selected. This wil then 
 * change the endpoint on the API so only the selected Rocket
 * or dragon is displayed.
 * @param {string} value value of btn
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

    /** Add data from missions api to a variable and call any related functions */
    axios.get("https://api.spacexdata.com/v3/missions").then(response => {
        missionData = response.data;
        eachMission();
    });
}

/** 
 * function to retrieve data from the past launches api endpoint
 * plus btnValue variable to add a querystring to the end of the url. 
 */
function callLaunches() {

    /** 
     * add data from past launches api to a variable and then reverse the object
     * then call all related functions within launches.js file.
     */
    axios.get("https://api.spacexdata.com/v3/launches/past" + btnValue).then(response => {
        launchData = response.data;
        launchReversed = launchData.slice().reverse();

        
        allLaunches();
    });
}

/**
 * Function added to onclick attribute to change the btnValue
 * depending on the value of the btn selected. This wil then 
 * change the endpoint on the API so only 10 items are shown 
 * at a time.
 * @param {string} value value of btn
 */
function getPagination(value) {
    btnValue = value;

    /** Recall Past Launches API and clear Data before displaying new data */
    clearData();
    callLaunches();
    
    $("#loader").removeClass("hide-loader");
}


/** function to retrieve data from the History api endpoint */
function callHistory() {

    /** 
     * Add response from History api to variable and reverse order of object
     * then call all related functions in History API.
     */
    axios.get("https://api.spacexdata.com/v3/history").then(response => {
        historyData = response.data;
        historyReversed = historyData.slice().reverse();
        allHistory();
    });
}


/** function to retrieve data from the main Spacex api and SpaceX info API  */
function callAbout() {


    /** 
     * Perform 2 XHLHttpRequests and add the reponses to variables 
     * then call any relevant functions within about.js
     */
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


/** function to clear all HTML from inside the Data div on Launches.html */ 
function clearData() {
    mainContent.innerHTML = "";
}