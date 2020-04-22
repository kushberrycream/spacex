// Variables
const app = document.getElementById("data");
const api = "https://api.spacexdata.com/v3/";

callMissions();

// calls spacex missions api

function callMissions() {
    
    $("#loader").removeClass("hide-loader");
    $("#data").addClass("container");

    axios.get(api + "missions").then(response => {
        data = response.data;
        let title = document.createElement("div");
        title.setAttribute("class", "title");
        app.appendChild(title);
        title.innerHTML = `<h1 class="title">Missions</h1>`;

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

