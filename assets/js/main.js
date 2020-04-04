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
    
    moreRockets = document.getElementsByClassName('more');

    about.addEventListener('click', aboutClick);
    rockets.addEventListener('click', rocketsClick);
    missions.addEventListener('click', missionsClick);
    launches.addEventListener('click', launchesClick);

    Array.from(moreRockets).forEach(function(moreRockets) {
      moreRockets.addEventListener('click', getValue());
    });
    
}
let btnValue = {};
function getValue(value) {
  btnValue = value;
  console.log(btnValue)

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

//Clear data div 

function clearData() {
    app.innerHTML = "";
}


// API function

upcomingLaunch()

function upcomingLaunch() {
    $("#loader").removeClass("hide-loader");
    $("#data").addClass("bg");

    axios.get(api + "launches/upcoming").then(response => {
        data = response.data
        console.log(data)
        $("#loader").addClass("hide-loader");
    });
}


function callRockets() {
    clearData()
    $("#loader").removeClass("hide-loader");
    $("#data").addClass("bg");

    axios.get(api + "rockets").then(response => {
        data = response.data

        data.forEach(item => {
            console.log(data)
            $("#loader").addClass("hide-loader");

            let info = document.createElement("div");
            info.setAttribute("class", "card");
            app.appendChild(info);

            info.innerHTML = `<div class="card-header">
                                <h3>${item.rocket_name}</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h5 class="card-title">ID: ${item.id} - Active: ${item.active}</h5>
                                        <p class="card-text">${item.description}</p>
                                        <button id="rocket1" class="more btn btn-primary">More</button>
                                    </div>
                                    <div class="col-md-6 text-center">
                                        <img class="rocket-image" src="${item.flickr_images[0]}">
                                    </div>
                                </div>
                            </div>`;
        });
    })
}

function callMissions() {
    clearData()
    $("#loader").removeClass("hide-loader");
    $("#data").addClass("bg");

    axios.get(api + "missions").then(response => {
        data = response.data
        console.log(data)
        $("#loader").addClass("hide-loader");
    });
}

function callLaunches() {
    clearData()
    $("#loader").removeClass("hide-loader");
    $("#data").addClass("bg");

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

        info.innerHTML = `<div class="card-header">
                                <h3>${data.project_name}</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <p>All Information about SpaceX, Launches, Rockets and Missions are provided by the SpaceX API.</p>
                                        <p>${data.description}</p>
                                        <p><strong>Version: </strong>${data.version}</p>
                                            <div class="row">
                                                <a href="${data.project_link}" target="_blank">
                                                <img class="github" src="assets/images/Octocat.png">GitHub</a>
                                                <a href="${item.docs}" target="_blank">
                                                <img class="docs" src="assets/images/postman.png">Documentation</a>
                                            </div>
                                    </div>
                                    <div class="col-md-6 center-img">
                                        <img class="spacexwhite" src="assets/images/spacexwhite.png" alt="SpaceX">
                                    </div>
                                </div>
                            </div>`
        let aboutMe = document.createElement("div");
        aboutMe.setAttribute("class", "card");
        app.appendChild(aboutMe);
        aboutMe.innerHTML = `<div class="card-header">
                                <h3>Created By Tom Jones</h3>
                            </div>
                            <div class="card-body">
                                <p>This site was created as a Project for the Code Institutes Diploma in Software Development.
                                <br> To see the repository Click Here!</p>
                                <p><strong>Version: </strong>${data.version}</p>
                                <h5>Contact Me</h5>
                                <p><strong>Phone: </strong>07449 670 750</p>
                                <div class="row">
                                    <a href="https://github.com/kushberrycream" target="_blank">
                                        <img class="github" src="assets/images/Octocat.png" alt="Octocat">Github
                                    </a>
                                    <a href="" target="_blank">
                                        <img class="facebook" src="assets/images/facebook.png" alt="Facebook">Facebook
                                    </a>
                                </div>
                            </div>`;
    });
}





