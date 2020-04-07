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

let btnValue = {}

function getValue(value) {
    btnValue = value;
}
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
        let title = document.createElement("div");
        title.setAttribute("class", "title")
        app.appendChild(title)
        title.innerHTML = `<h1><strong>SpaceX Rockets</strong></h1>`
        console.log(data);
        data.forEach(item => {
            $("#loader").addClass("hide-loader");

            let info = document.createElement("div");
            info.setAttribute("class", "card");
            app.appendChild(info);

            info.innerHTML = `
                            <div class="card-header">
                                <h3>${item.rocket_name}</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h5 class="card-title">ID: ${item.id} - Active: ${item.active}</h5>
                                        <p class="card-text">${item.description}</p>
                                        Wikipedia: <a href="${item.wikipedia}" target="_blank">${item.wikipedia}</a>
                                        <br>
                                        <button onclick="getValue(value), rocketSpec()" value="rockets/${item.rocket_id}" class="more btn btn-primary">More</button>
                                    </div>
                                    <div class="col-md-6 text-center">
                                        <img class="rocket-image" src="${item.flickr_images[0]} alt="Rocket-Image">
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
                                                <a href="${data.docs}" target="_blank">
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
                                <p><strong>Phone: </strong>07449 670 750</br>
                                <strong>Email: </strong>kushberrycream@hotmail.com</p>
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


function rocketSpec() {
    clearData()
    $("#loader").removeClass("hide-loader");
    $("#data").removeClass("bg");

    axios.get(api + btnValue).then(response => {
        data = response.data
        $("#loader").addClass("hide-loader");

        const objectArray = Object.keys(data.payload_weights);

        objectArray.forEach(([key]) => {
            let text = key
            console.log(text); // 1


            let aboutRocket = document.createElement("div");
            let rocketStats = document.createElement("div");

            aboutRocket.setAttribute("class", "about-rockets");
            rocketStats.setAttribute("class", "rocket-stats");

            app.innerHTML = `<h1 class="text-center p-4"><strong>${data.rocket_name}</strong></h1>`
            app.appendChild(aboutRocket);
            app.appendChild(rocketStats);

            aboutRocket.innerHTML = `<div class="card">
                            <div class="card-header">
                                <h4>About</h4>
                            </div>
                            <div class="card-body">
                                        <h6>Active: ${data.active}</h6>
                                        <h6>First Flight: ${data.first_flight}  </h6>
                                        <h6>Cost Per Launch: $${data.cost_per_launch}  </h6>
                                        <progress max="100" value="${data.success_rate_pct}"><span>${data.success_rate_pct}</span></progress>

                                        </br>

                                        Wikipedia: <a href="${data.wikipedia}" target="_blank">${data.wikipedia}</a>
                                        
                                        </br>

                                        <p class="card-text">${data.description}</p>
                                
                            </div>
                        </div>`;

            rocketStats.innerHTML = `<div class="row">
                                        <div class="col-md-5">
                                            <div class="card">
                                                <div class="card-header">
                                                    <h4>Statistics</h4>
                                                </div>
                                            <div class="card-body">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Stages: ${data.stages}</li>
                                                    <li class="list-group-item">Boosters: ${data.boosters}</li>
                                                    <li class="list-group-item">Height: ${data.height.meters}m</li>
                                                    <li class="list-group-item">Diameter: ${data.diameter.meters}m</li>
                                                    <li class="list-group-item">Mass: ${data.mass.kg}kg</li>
                                                    <li class="list-group-item">Landing Legs: ${data.landing_legs.number}</li>
                                                    <li class="list-group-item">Payload:
                                                        <ul>
                                                            <li id="payload-name" class="list-item"></li>
                                                        </ul>
                                                    </li>
                                                    <li class="list-group-item">Engines:
                                                        <ul>
                                                            <li class="list-item">Type: ${data.engines.type}</li>
                                                            <li class="list-item">No. of Engines: ${data.engines.number}</li>
                                                            <li class="list-item">Engine Version: ${data.engines.version}</li>
                                                            <li class="list-item">Layout: ${data.engines.layout}</li>
                                                            <li class="list-item">Propellants:
                                                                <ul>
                                                                    <li class="list-item">1: ${data.engines.propellant_1}</li>
                                                                    <li class="list-item">2: ${data.engines.propellant_2}</li>
                                                                </ul>
                                                            </li>
                                                            <li class="list-item">Thrust at Sea Level: ${data.engines.thrust_sea_level.kN}kN</li>
                                                            <li class="list-item">Thrust Vaccum: ${data.engines.thrust_vacuum.kN}kN</li>
                                                        </ul>
                                                    </li>
                                                    <li class="list-group-item">First Stage:
                                                        <ul>
                                                            <li class="list-item">No. of Engines: ${data.first_stage.engines}</li>
                                                            <li class="list-item">Resuable: ${data.first_stage.reusable}</li>
                                                            <li class="list-item">Fuel Amount: ${data.first_stage.fuel_amount_tons}t</li>
                                                            <li class="list-item">Burn Time: ${data.first_stage.burn_time_sec}secs</li>
                                                        </ul>
                                                    </li>
                                                    <li class="list-group-item">Second Stage:
                                                        <ul>
                                                            <li class="list-item">No. of Engines: ${data.second_stage.engines}</li>
                                                            <li class="list-item">Resuable: ${data.second_stage.reusable}</li>
                                                            <li class="list-item">Fuel Amount: ${data.second_stage.fuel_amount_tons}t</li>
                                                            <li class="list-item">Burn Time: ${data.second_stage.burn_time_sec}secs</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <div class="card">
                                        <div class="card-header">
                                        <h4>Photos</h4>
                                    </div>
                                    <div class="card-body">
                                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                            <ol class="carousel-indicators">
                                                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                            </ol>
                                            <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <img src="..." class="d-block w-100" alt="...">
                                            </div>
                                            <div class="carousel-item">
                                                <img src="..." class="d-block w-100" alt="...">
                                            </div>
                                            <div class="carousel-item">
                                                <img src="..." class="d-block w-100" alt="...">
                                            </div>
                                        </div>
                                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
            data.payload_weights.forEach(item => {

                payloadName = document.getElementById("payload-name");
                listitem = document.createElement("li")
                payloadName.appendChild(listitem);
                
                listitem.innerHTML = `${item.name} - ${item.kg}kg`

            })

        })

    })

}
