// Variables

const app = document.getElementById("data");
const api = "https://api.spacexdata.com/v3/";


let btnValue = "?limit=10&offset=82";

// obtains value from the pagination buttons to change the launches on screen.

function getPagination(value) {
    btnValue = value;
    callLaunches();
    clearData();
}


function clearData() {
    app.innerHTML = "";
}


callLaunches();

// calls spacex past launches api

function callLaunches() {

    $("#loader").removeClass("hide-loader");
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
                                        
                                        <li class="page-item active"><option class="page-link" onclick="getPagination(value)" value="?limit=10&offset=82">1</option></li>
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

    $(".page-item").on("click", function () {
    $(".page-item").removeClass("active");
    $(this).addClass("active")
    })