// Variables
const app = document.getElementById("data");
const api = "https://api.spacexdata.com/v3/dragons";

let btnValue;

function getValue(value) {
    btnValue = value;
}

callDragons()


// calls spacex dragons api

function callDragons() {
    $("#loader").removeClass("hide-loader");
    $("#data").addClass("container");

    axios.get(api).then(response => {
        data = response.data;
        console.log(data);
        let title = document.createElement("div");
        title.setAttribute("class", "title");
        app.appendChild(title);
        title.innerHTML = `<h1 class="title">SpaceX Dragons</h1>`;
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
                                        <h6 class="card-title">First Flight: ${item.first_flight}</h6>
                                        <p class="card-text">${item.description}</p>
                                        Wikipedia: <a href="${item.wikipedia}" target="_blank">${item.wikipedia}</a>
                                        <br>
                                        <button onclick="getValue(value), dragonSpec()" value="/${item.id}" class="more btn btn-primary">More</button>
                                        
                                    </div>
                                    <div class="col-md-6 text-center">
                                        <img class="rocket-image" src="${item.flickr_images[0]} alt="Rocket-Image">
                                    </div>
                                </div>
                            </div>`;


        });
    });
}


function dragonSpec() {
    $("#loader").removeClass("hide-loader");


    axios.get(api + btnValue).then(response => {
        let data = response.data;
        console.log(data);
        $("#loader").addClass("hide-loader");
        let aboutRocket = document.createElement("div");

        aboutRocket.setAttribute("class", "about-rockets");

        app.innerHTML = `<h1 class="title">${data.name}</h1>`;
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
                                                <h6>Type: ${data.type}</h6>
                                                <h6>Crew Capacity: ${data.crew_capacity}</h6>
                                                <h6>Orbit Duration: ${data.orbit_duration_yr}Yrs</h6>
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
                                </div>`;

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
                                                    <li class="list-group-item">Diameter: ${data.diameter.meters}m</li>
                                                    <li class="list-group-item">Height With Trunk: ${data.height_w_trunk.meters}m</li>
                                                    <li class="list-group-item">Trunk Volume: ${data.trunk.trunk_volume.cubic_meters}&#13221;</li>
                                                    <li class="list-group-item">Dry Mass: ${data.dry_mass_kg}kg</li>
                                                    <li class="list-group-item">Launch Payload:
                                                        <ul>
                                                            <li class="list-item">Mass: ${data.launch_payload_mass.kg}kg</li>
                                                            <li class="list-item">Volume: ${data.launch_payload_vol.cubic_meters}&#13221;</li>
                                                        </ul> 
                                                    </li>
                                                    <li class="list-group-item">Return Payload: 
                                                        <ul>
                                                            <li class="list-item">Mass: ${data.return_payload_mass.kg}kg</li>
                                                            <li class="list-item">Volume: ${data.return_payload_vol.cubic_meters}&#13221;</li>
                                                        </ul>
                                                    </li>
                                                    <li class="list-group-item">Pressurized Capsule Payload Volume: ${data.pressurized_capsule.payload_volume.cubic_meters}&#13221;</li>
                                                    <li class="list-group-item">Solar Arrays: ${data.trunk.cargo.solar_array}</li>
                                                    <li class="list-group-item">Sidewall Angle: ${data.sidewall_angle_deg}&deg;</li>
                                                    <li class="list-group-item">Heat Shield:
                                                        <ul>
                                                            <li class="list-item">Development Partner: ${data.heat_shield.dev_partner}</li>
                                                            <li class="list-item">Material: ${data.heat_shield.material}</li>
                                                            <li class="list-item">Size: ${data.heat_shield.size_meters}m</li>
                                                            <li class="list-item">Temperature: ${data.heat_shield.temp_degrees}&deg;</li>
                                                        </ul>
                                                    </li>
                                                    <li id="thrusters" class="list-group-item">Thrusters:
                                                        
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
        data.thrusters.forEach(item => {

            let payloadName = document.getElementById("thrusters");
            let listitem = document.createElement("ul");
            payloadName.appendChild(listitem);

            listitem.innerHTML = `<li class="list-item">${item.type}:
                                    <ul>
                                        <li class="list-item">${item.thrust.kN}kN Thrust</li>
                                        <li class="list-item">${item.amount} Thrusters</li>
                                        <li class="list-item">${item.pods} Pods</li>
                                        <li class="list-item">Fuel: 
                                            <ul>
                                                <li class="list-item">${item.fuel_1}</li>
                                                <li class="list-item">${item.fuel_2}</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                    `;

        });

    });

}

//Clear data div 

function clearData() {
    app.innerHTML = "";
}