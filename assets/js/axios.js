//   ---    SpaceX API Endpoints!
const spaceX = "https://api.spacexdata.com/v3/";
const upcomingApi = "https://api.spacexdata.com/v3/launches/upcoming";
const launchPads = "https://api.spacexdata.com/v3/launchpads";
const landPads = "https://api.spacexdata.com/v3/landpads";
const rocketsApi = "https://api.spacexdata.com/v3/rockets";
const dragonsApi = "https://api.spacexdata.com/v3/dragons";
const missionsApi = "https://api.spacexdata.com/v3/missions";
const launchesApi = "https://api.spacexdata.com/v3/launches/past";
const historyApi = "https://api.spacexdata.com/v3/history";
const aboutApi = "https://api.spacexdata.com/v3/";
const infoApi = "https://api.spacexdata.com/v3/info";

let btnValue = "?limit=10&offset=84";




function homepageData() {
    axios.all([
        axios.get(upcomingApi),
        axios.get(launchPads),
        axios.get(landPads)
    ])
        .then(axios.spread((upcomingApi, launchPads, landPads) => {
            upcoming = upcomingApi.data;
            launchData = launchPads.data;
            landData = landPads.data;

            carousel();
            active();
        }));
}

function callRockets() {
    axios.get(rocketsApi).then(response => {
        rockets = response.data;
        eachRocket();
    });

}

function oneRocket() {
    $("#loader").removeClass("hide-loader");
    axios.get(spaceX + btnValue).then(response => {
        specificRocket = response.data;
        rocketSpec();
    });
}

function callDragons() {
    axios.get(dragonsApi).then(response => {
        dragons = response.data;
        eachDragon();
    });
}

function oneDragon() {
    $("#loader").removeClass("hide-loader");
    axios.get(spaceX + btnValue).then(response => {
        specificDragon = response.data;
        dragonSpec();
    });
}

function getValue(value) {
    btnValue = value;
    if (typeof eachRocket === "function") {
        oneRocket();
    } else if (typeof eachDragon === "function") {
        oneDragon();
    }
}

function callMissions() {
    axios.get(missionsApi).then(response => {
        missionData = response.data;
        eachMission();
    });
}

function callLaunches() {
    axios.get(launchesApi + btnValue).then(response => {
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
    axios.get(historyApi).then(response => {
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

