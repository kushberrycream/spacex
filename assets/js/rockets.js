// Variables
const app = document.getElementById("data");
const api = "https://api.spacexdata.com/v3/";

let btnValue;

function getValue(value) {
    btnValue = value;
}

callRockets();


// calls spacex rocket api - all rockets

function callRockets() {
    $("#loader").removeClass("hide-loader");
    $("#data").addClass("container");

    axios.get(api + "rockets").then(response => {
        let data = response.data;
        let title = document.createElement("div");
        title.setAttribute("class", "title");
        app.appendChild(title);
        title.innerHTML = `<h1 class="title">SpaceX Rockets</h1>`;
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

// calls a specific spacex rocket api url

function rocketSpec() {
    $("#loader").removeClass("hide-loader");


    axios.get(api + btnValue).then(response => {
        let data = response.data;
        $("#loader").addClass("hide-loader");
        let cost = accounting.formatMoney(data.cost_per_launch);
        let aboutRocket = document.createElement("div");

        aboutRocket.setAttribute("class", "about-rockets");

        app.innerHTML = `<h1 class="title">${data.rocket_name}</h1>`;
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
                                                <div class="meter red">
	                                                <span style="width:100%"></span>
                                                </div>

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

            let activeItem = document.getElementsByTagName("div").item(17);
            activeItem.setAttribute("class", "carousel-item active");

            let activePhoto = document.getElementsByTagName("li").item(7);
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

//Clear data div 

function clearData() {
    app.innerHTML = "";
}

