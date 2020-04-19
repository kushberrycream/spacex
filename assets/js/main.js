// nav-bar active state change without reloading webpage
$(".nav-item").on("click", function () {
    $(".nav-item").removeClass("active");
    $(this).addClass("active");
});

//Navigation Buttons

document.addEventListener("DOMContentLoaded", WireUpEvents);

function WireUpEvents() {
    let about = document.getElementById("about"),
        rockets = document.getElementById("rockets"),
        dragons = document.getElementById("dragons"),
        missions = document.getElementById("missions"),
        launches = document.getElementById("launches");


    about.addEventListener("click", aboutClick);
    rockets.addEventListener("click", rocketsClick);
    dragons.addEventListener("click", dragonsClick);
    missions.addEventListener("click", missionsClick);
    launches.addEventListener("click", launchesClick);

}
function aboutClick() {
    callAbout();
}
function rocketsClick() {
    callRockets();
}
function dragonsClick() {
    callDragons();
}
function missionsClick() {
    callMissions();
}
function launchesClick() {
    callLaunches();
}

// Variables

const app = document.getElementById("data");
const api = "https://api.spacexdata.com/v3/";

let data;
let btnValue = "?limit=10&offset=82";

function getValue(value) {
    btnValue = value;
}
function getPagination(value) {
    btnValue = value;
    callLaunches();
}

//Clear data div 

function clearData() {
    app.innerHTML = "";
}


// call spacex api on load 


upcomingLaunch();
 

// call spacex upcoming launches api

function upcomingLaunch() {

    $("#loader").removeClass("hide-loader");

    axios.get(api + "launches/upcoming").then(response => {
        data = response.data;
        $("#loader").addClass("hide-loader");
        console.log(data);
        app.innerHTML = `
        <div class="overlay"></div>
        <div class="container-fluid">
            <div class="card card-raised card-carousel">
                <h1 class="title"><strong>Upcoming Launches</strong></h1>
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="3000">
                    <ol id="data-slide" class="carousel-indicators">           
                    </ol>
                    <div id="upcoming-launch" class="carousel-inner">          
                    </div>         
                </div>
            </div>
            <a class="carousel-control-prev-home" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <i class="fas fa-long-arrow-alt-left"></i>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next-home" href="#carouselExampleIndicators" role="button" data-slide="next">
                <i class="fas fa-long-arrow-alt-right"></i>
                <span class="sr-only">Next</span>
            </a>
        </div>`;


        data.forEach(item => {
            let a = data.indexOf(item);
            let indicators = document.getElementById("data-slide");
            let slide = document.createElement("li");
            slide.setAttribute("data-slide-to", a);
            slide.setAttribute("data-target", "#carouselExampleIndicators");
            indicators.appendChild(slide);
        });

        data.forEach(item => {
            let upcomingLaunch = document.getElementById("upcoming-launch");
            let launches = document.createElement("div");
            launches.setAttribute("class", "carousel-item");
            upcomingLaunch.appendChild(launches);

            if (item.details == null) {
                launches.innerHTML = `<div class="details-container">
                                    <div class="carousel-caption row justify-content-center">
                                        <div class="col-md-5 text-right">
                                            <img src="${item.links.mission_patch_small ? item.links.mission_patch_small : "assets/images/spacexcircle.png"}" alt="mission patch">
                                            <h4><span class="flight">Flight No:</span> ${item.flight_number}</h4>
                                            <h4><span class="rocket">Rocket:</span> ${item.rocket.rocket_name}</h4>
                                            <h4><span class="type">Rocket Type:</span> ${item.rocket.rocket_type}</h4>
                                            <h4><span class="site">Site:</span> ${item.launch_site.site_name_long}</h4>
                                        </div>
                                    </div>
                                </div>`;
            } else {
                launches.innerHTML = `<div class="details-container">  
                                        <div class="carousel-caption row">
                                            <div class="col-md-5 text-right">
                                                <img src="${item.links.mission_patch_small ? item.links.mission_patch_small : "assets/images/spacexcircle.png"}" alt="mission patch">
                                                <h4><span class="flight">Flight No:</span> ${item.flight_number}</h4>
                                                <h4><span class="rocket">Rocket:</span> ${item.rocket.rocket_name}</h4>
                                                <h4><span class="type">Rocket Type:</span> ${item.rocket.rocket_type}</h4>
                                                <h4><span class="site">Site:</span> ${item.launch_site.site_name_long}</h4>
                                            </div>
                                            <div class="col-md-6 d-md-block d-none">                                                    
                                                <p>${item.details}</p>
                                            </div>
                                        </div>
                                    </div>`;
            }

            let info = document.createElement("div");
            info.setAttribute("class", "countdown");
            launches.appendChild(info);
            let deadline = new Date(item.launch_date_utc).getTime();
            let x = setInterval(function () {
                let now = new Date().getTime();
                let t = deadline - now;
                let days = Math.floor(t / (1000 * 60 * 60 * 24));
                let hours = Math.floor(
                    (t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((t % (1000 * 60)) / 1000);
                let date = moment.parseZone(item.launch_date_utc).utc().format("dddd, MMMM Do YYYY, h:mm:ss a");

                info.innerHTML = `<h1><span class="mission-name">Mission Name:</span> ${item.mission_name}</h1>
                                    <h2>${days}d ${hours}h ${minutes}m ${seconds}s</h2>
                                    <h3>${date}</h3>
                
                                         
                                        `;
                if (t < 0) {
                    clearInterval(x);
                    info.innerHTML = `<h1><span class="mission-name">Mission Name:</span> ${item.mission_name}</h1>
                                        <h2>LAUNCH PENDING!</h2>
                                        <h3>TBC</h3>
                    `;
                }
            }, 1000);




        });

        let activeItem = document.getElementsByTagName("div").item(9);
        activeItem.setAttribute("class", "carousel-item active");

        let activeLaunch = document.getElementsByTagName("li").item(6);
        activeLaunch.setAttribute("class", "active");
    });

}

// calls spacex rocket api - all rockets

function callRockets() {
    clearData();
    $("#loader").removeClass("hide-loader");
    $("#data").removeClass("bg");
    $("#data").removeClass("container-fluid");
    $("#data").addClass("container");

    axios.get(api + "rockets").then(response => {
        data = response.data;
        let title = document.createElement("div");
        title.setAttribute("class", "title");
        app.appendChild(title);
        title.innerHTML = `<h1><strong>SpaceX Rockets</strong></h1>`;
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
    });
}

// calls spacex dragons api

function callDragons() {
    clearData();
    $("#loader").removeClass("hide-loader");
    $("#data").removeClass("bg");
    $("#data").removeClass("container-fluid");
    $("#data").addClass("container");

    axios.get(api + "dragons").then(response => {
        data = response.data;
        console.log(data);
        let title = document.createElement("div");
        title.setAttribute("class", "title");
        app.appendChild(title);
        title.innerHTML = `<h1><strong>SpaceX Dragons</strong></h1>`;
        data.forEach(item => {
            $("#loader").addClass("hide-loader");

            let info = document.createElement("div");
            info.setAttribute("class", "card");
            app.appendChild(info);

            info.innerHTML = `<div class="card-header">
                                <h3>${item.name}</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h5 class="card-title">Type: ${item.type} - Active: ${item.active}</h5>
                                        <h6 class="card-title">Crew Capacity: ${item.crew_capacity} - Sidewall Angle: ${item.sidewall_angle_deg}&deg; - Orbit Duration: ${item.orbit_duration_yr}yrs</h6>
                                        <p class="card-text">${item.description}</p>
                                        Wikipedia: <a href="${item.wikipedia}" target="_blank">${item.wikipedia}</a>
                                        <br>
                                        
                                    </div>
                                    <div class="col-md-6 text-center">
                                        <img class="rocket-image" src="${item.flickr_images[0]} alt="Rocket-Image">
                                    </div>
                                </div>
                            </div>`;


        });
    });
}

// calls spacex missions api

function callMissions() {
    clearData();
    $("#loader").removeClass("hide-loader");
    $("#data").removeClass("bg");
    $("#data").removeClass("container-fluid");
    $("#data").addClass("container");

    axios.get(api + "missions").then(response => {
        data = response.data;
        let title = document.createElement("div");
        title.setAttribute("class", "title");
        app.appendChild(title);
        title.innerHTML = `<h1><strong>Missions</strong></h1>`;

        data.forEach(item => {
            $("#loader").addClass("hide-loader");

            let info = document.createElement("div");
            info.setAttribute("class", "card");
            app.appendChild(info);

            if (item.manufacturers[1] == null) {

                info.innerHTML = `<div class="card-header">
                                    <h3>${item.mission_name}</h3>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Mission ID: ${item.mission_id}</h5>
                                    <h6>Manufacturers: ${item.manufacturers[0]} </h6>
                                    <p class="card-text">${item.description}</p>
                                        Website: <a href="${item.website}" target="_blank">${item.website}</a> 
                                    <br>

                                    <a href="${item.wikipedia}" target="_blank"><i class="fab fa-wikipedia-w"></i> </a>
                                    

                                    <a href="${item.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
                                </div>`;
            } else {

                info.innerHTML = `<div class="card-header">
                                    <h3>${item.mission_name}</h3>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Mission ID: ${item.mission_id}</h5>
                                    <h6>Manufacturers: ${item.manufacturers[0]} - ${item.manufacturers[1]} - ${item.manufacturers[2]}</h6>
                                    <p class="card-text">${item.description}</p>
                                        Website: <a href="${item.website}" target="_blank">${item.website}</a> 
                                    <br>

                                    <a href="${item.wikipedia}" target="_blank"><i class="fab fa-wikipedia-w"></i> </a>
                                    

                                    <a href="${item.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
                                </div>`;

            }

        });


    });
}


// calls spacex past launches api

function callLaunches() {
    clearData();
    $("#data").removeClass("bg");
    $("#loader").removeClass("hide-loader");
    $("#data").removeClass("container-fluid");
    $("#data").addClass("container");


    axios.get(api + "launches/past" + btnValue).then(response => {
        data = response.data;

        let newData = data.slice().reverse();
        console.log(newData);
        let title = document.createElement("div");
        let pagination = document.createElement("div");
        title.setAttribute("class", "title");
        app.appendChild(title);
        app.appendChild(pagination);
        title.innerHTML = `<h1><strong>Past Launches</strong></h1>`;
        pagination.innerHTML = `<nav aria-label="Page navigation">
                                    <ul class="pagination justify-content-end">
                                        
                                        <li class="page-item"><option class="page-link" onclick="getPagination(value)" value="?limit=10&offset=82">1</option></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=72" class="page-link">2</option></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=62" class="page-link">3</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=52" class="page-link">4</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=32" class="page-link">5</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=22" class="page-link">6</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=12" class="page-link">7</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=02" class="page-link">8</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=2&offset=0" class="page-link">9</a></li>
                                        
                            
                                    </ul>
                                </nav>`;

        newData.forEach(item => {
            $("#loader").addClass("hide-loader");

            let date = moment.parseZone(item.launch_date_utc).utc().format("dddd, MMMM Do YYYY, h:mm:ss a");
            let info = document.createElement("div");

            info.setAttribute("class", "card");

            app.appendChild(info);

            let launchSuccess = item.launch_success;

            if (launchSuccess == true) {
                launchSuccess = `<div class='card-header green'>
                                <h3>${item.mission_name} <span class="launch-success"><i class="fas fa-check"></i> Launch Successful </span></h3>
                                </div>`;

            } else {
                launchSuccess = `<div class='card-header red'>
                                <h3>${item.mission_name} <span class="launch-success"><i class="fas fa-times"></i> Launch Failed </span></h3>
                                </div>`;


            }
            info.innerHTML = `
                            ${launchSuccess}
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-7">
                                        <h5 class="card-title">Flight Number: ${item.flight_number} </h5>
                                        <p class="card-text">Launch Date: ${date.toString()}</br>
                                        Launch Site: ${item.launch_site.site_name_long}</p>
                                        <p>${item.details}</p>
                                        <br>
                                    </div>
                                    <div class="col-md-5 text-center">
                                        <img src="${item.links.mission_patch_small}" alt="Mission Patch" >
                                    </div>
                                </div>
                            </div>
                            `;



        });
        let btmPages = document.createElement("nav");
        btmPages.setAttribute("aria-label", "Page navigation");
        app.appendChild(btmPages);
        btmPages.innerHTML = ` <ul class="pagination justify-content-end">
                                        
                                        <li class="page-item"><option class="page-link" onclick="getPagination(value)" value="?limit=10&offset=82">1</option></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=72" class="page-link">2</option></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=62" class="page-link">3</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=52" class="page-link">4</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=32" class="page-link">5</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=22" class="page-link">6</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=12" class="page-link">7</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=02" class="page-link">8</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=2&offset=0" class="page-link">9</a></li>
                                        
                            
                                    </ul>`;
    });
}


// calls spacex API & company info API

function callAbout() {
    clearData();
    $("#loader").removeClass("hide-loader");
    $("#data").removeClass("bg");
    $("#data").removeClass("container-fluid");
    $("#data").addClass("container");
    axios.all([
        axios.get(api),
        axios.get("https://api.spacexdata.com/v3/info")
    ])
        .then(axios.spread((api, infoApi) => {
            // do something with both responses

            data = api.data;
            infoApi = infoApi.data;
            console.log(infoApi);
            $("#loader").addClass("hide-loader");
            let valuation = accounting.formatMoney(infoApi.valuation);
            let info = document.createElement("div");
            info.setAttribute("class", "spacex-info");
            app.appendChild(info);

            info.innerHTML = `<div class="card">
                            <div class="card-header">
                                <h3>${infoApi.name}</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">

                                      
                                        <p><strong>Founder, CEO & CTO: </strong>${infoApi.founder}</p>
                                        <p><strong>COO: </strong>${infoApi.coo}</p>
                                        <p><strong>Valuation: </strong>${valuation}</p>
                                        <a href="${infoApi.links.website}" target="_blank"><i class="icon fas fa-link"></i></a>
                                        <a href="${infoApi.links.flickr}" target="_blank"><i class="icon fab fa-flickr"></i></a>
                                        <a href="${infoApi.links.twitter}" target="_blank"><i class="icon fab fa-twitter-square"></i></a>
                                        <a href="${infoApi.links.elon_twitter}" target="_blank"><img class="elon icon" src="assets/images/elon.png" alt="elon_twitter"></a>

                                        <p><strong>HQ: </strong>${infoApi.headquarters.address}, ${infoApi.headquarters.city}, ${infoApi.headquarters.state} </p>

                                         
                                            
                                    </div>
                                    <div class="col-md-6 center-img">
                                        <p>${infoApi.summary}</p>
                                    </div>
                                </div>
                            </div>
                            </div>

                            <div class="card">
                            <div class="card-header">
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
                            </div>
                            </div>`;
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
        }));
}


// calls a specific spacex rocket api url

function rocketSpec() {
    clearData();
    $("#loader").removeClass("hide-loader");
    $("#data").removeClass("container-fluid");
    $("#data").addClass("container");

    axios.get(api + btnValue).then(response => {
        data = response.data;
        btnValue = "?limit=10&offset=82";
        $("#loader").addClass("hide-loader");
        let cost = accounting.formatMoney(data.cost_per_launch);
        let aboutRocket = document.createElement("div");

        aboutRocket.setAttribute("class", "about-rockets");

        app.innerHTML = `<h1 class="text-center p-4"><strong>${data.rocket_name}</strong></h1>`;
        app.appendChild(aboutRocket);


        aboutRocket.innerHTML = `<div class="row">
                                    <div id="about" class="col-md-7">                                     
                                        <div class="card">
                                            <div class="card-header">
                                                <h4>About</h4>
                                            </div>
                                            <div class="card-body">

                                                <p class="card-text">${data.description}</p>
                                                   </br>

                                                <h6>Active: ${data.active}</h6>
                                                <h6>First Flight: ${data.first_flight}  </h6>
                                                <h6>Cost Per Launch: ${cost}</h6>
                                                <progress max="100" value="${data.success_rate_pct}"><span>${data.success_rate_pct}</span></progress>

                                                </br>

                                                Wikipedia: <a href="${data.wikipedia}" target="_blank">${data.wikipedia}</a>
                                        
                                             

                                                
                                
                                            </div>
                                        </div>
                                        <div id="photos">
                                        </div>
                                    </div>
                                    <div id="rocketstats" class="col-md-5">
                                    </div>
                                </div`;

        let photos = document.getElementById("photos");
        photos.innerHTML = `<div class="card">
                                            <div class="card-header">
                                                <h4>Photos</h4>
                                            </div>
                                                <div class="card-body">
                                                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                                        <ol id="data-slide" class="carousel-indicators">
                                                            
                                                        </ol>
                                                        <div id="flickr-images" class="carousel-inner">
                                                            
                                                            
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
                                        </div>`;


        data.flickr_images.forEach(item => {

            let a = data.flickr_images.indexOf(item);

            let flickrImages = document.getElementById("flickr-images");
            let indicators = document.getElementById("data-slide");

            photos = document.createElement("div");
            let slide = document.createElement("li");

            photos.setAttribute("class", "carousel-item");
            slide.setAttribute("data-slide-to", a);
            slide.setAttribute("data-target", "#carouselExampleIndicators");

            flickrImages.appendChild(photos);
            indicators.appendChild(slide);

            photos.innerHTML = `<img src="${item}" class="d-block w-100" alt="...">`;

            let activeItem = document.getElementsByTagName("div").item(16);
            activeItem.setAttribute("class", "carousel-item active");

            let activePhoto = document.getElementsByTagName("li").item(6);
            activePhoto.setAttribute("class", "active");

        });

        let rocketStats = document.getElementById("rocketstats");
        rocketStats.innerHTML = `
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
                                </div>`;
        data.payload_weights.forEach(item => {

            let payloadName = document.getElementById("payload-name");
            let listitem = document.createElement("li");
            payloadName.appendChild(listitem);

            listitem.innerHTML = `${item.name} - ${item.kg}kg`;

        });
    });

}


