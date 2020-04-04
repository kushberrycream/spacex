// nav-bar active state change without reloading webpage
$(".nav-item").on("click", function () {
    $(".nav-item").removeClass("active");
    $(this).addClass("active");
});

//Navigation Buttons

document.addEventListener('DOMContentLoaded', WireUpEvents);

function WireUpEvents() {
    var about = document.getElementById('about'),
        rockets = document.getElementById('rockets');
        missions = document.getElementById('missions');
        launches = document.getElementById('launches');

    about.addEventListener('click', aboutClick);
    rockets.addEventListener('click', rocketsClick);
    missions.addEventListener('click', missionsClick);
    launches.addEventListener('click', launchesClick);
}

function aboutClick() {
    callAbout()
}

function rocketsClick() {
    callRockets()
}

function missionsClick() {
    callMissions()
}

function launchesClick() {
    callLaunches()
}

// Variables

const app = document.getElementById("data");
const api = "https://api.spacexdata.com/v3/";


// API function

function upcomingLaunch() {
    $("#loader").removeClass("hide-loader");

    axios.get(api + "launches/upcoming").then(response => {
        data = response.data
        console.log(data)
        $("#loader").addClass("hide-loader");
    });
}

upcomingLaunch()

function callRockets() {
    clearData()
    $("#loader").removeClass("hide-loader");

    axios.get(api + "rockets").then(response => {
        data = response.data
        console.log(data)
        $("#loader").addClass("hide-loader");
    });
}

function callMissions() {
    clearData()
    $("#loader").removeClass("hide-loader");

    axios.get(api + "missions").then(response => {
        data = response.data
        console.log(data)
        $("#loader").addClass("hide-loader");
    });
}

function callLaunches() {
    clearData()
    $("#loader").removeClass("hide-loader");

    axios.get(api + "launches/past").then(response => {
        data = response.data
        console.log(data)
        $("#loader").addClass("hide-loader");
    });
}

function callAbout() {
    clearData()
    $("#loader").removeClass("hide-loader");
    $("#data").removeClass("bg");
    axios.get(api).then(response => {
        data = response.data
        $("#loader").addClass("hide-loader");
        let info = document.createElement("div");
        info.setAttribute("class", "card");
        let item = response.data;
        app.appendChild(info);
        info.innerHTML = `<div class="row"><div class="col-md-6"><h3>${data.project_name}</h3><p>All Information about SpaceX, Launches, Rockets and Missions are provided by the SpaceX API.</p>
      <p>${data.description}</p><p><strong>Version: </strong>${data.version}</p><div class="row"><a href="${data.project_link}" target="_blank"><img class="github" src="assets/images/Octocat.png">GitHub</a>
      <a href="${item.docs}" target="_blank"><img class="docs" src="assets/images/postman.png">Documentation</a></div></div><div class="col-md-6 center-img"><img class="spacexwhite" src="assets/images/spacexwhite.png" alt="SpaceX"></div></div>`;
        let aboutMe = document.createElement("div");
        aboutMe.setAttribute("class", "card");
        app.appendChild(aboutMe);
        aboutMe.innerHTML = `<h3>Created By Tom Jones</h3> <p>This site was created as a Project for the Code Institutes Diploma in Software Development.<br> To see the repository Click Here!</p>
      <h5>Contact Me</h5><p><strong>Phone: </strong>07449 670 750</p><div class="row"><a href="https://github.com/kushberrycream" target="_blank"><img class="github" src="assets/images/Octocat.png" alt="Octocat">Github</a>
      <a href="" target="_blank"><img class="facebook" src="assets/images/facebook.png" alt="Facebook">Facebook</a></div>`;
    });
}


function clearData() {
    app.innerHTML = "";
}


