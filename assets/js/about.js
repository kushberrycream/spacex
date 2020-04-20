// Variables

const app = document.getElementById("data");
const api = "https://api.spacexdata.com/v3/";


callAbout();

// calls spacex API & company info API

function callAbout() {
    
    $("#loader").removeClass("hide-loader");
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
