// Variables
const app = document.getElementById("data");
const api = "https://api.spacexdata.com/v3/";


callDragons()


// calls spacex dragons api

function callDragons() {
    $("#loader").removeClass("hide-loader");
    $("#data").addClass("container");

    axios.get(api + "dragons").then(response => {
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