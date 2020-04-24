  
// Variables

const app = document.getElementById("data");
const api = "https://api.spacexdata.com/v3/";


let btnValue = "?limit=10&offset=83";

// function to clear data div

function clearData() {
    app.innerHTML = "";
}

// obtains value from the pagination buttons to change the launches on screen.

function getPagination(value) {
    btnValue = value;
    callLaunches();
    clearData();
}

// calls spacex past launches api

callLaunches();

function callLaunches() {

    $("#loader").removeClass("hide-loader");
    $("#data").addClass("container");

    axios.get(api + "launches/past" + btnValue).then(response => {
        let data = response.data;
        let newData = data.slice().reverse();
        let title = document.createElement("div");
        title.setAttribute("class", "title");
        app.appendChild(title);
        title.innerHTML = `<h1 class="title">SpaceX Launches</h1>`;

        newData.forEach(item => {
            $("#loader").addClass("hide-loader");
            let date = moment.parseZone(item.launch_date_utc).utc().format("dddd, MMMM Do YYYY, h:mm:ss a");
            let info = document.createElement("div");

            info.setAttribute("class", "card");
            app.appendChild(info);

            // Checks for true or false values within Mission name item.

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

            // checks for a url within reddit item.

            let reddit = item.links.reddit_campaign;

            if (reddit == null) {
                reddit = `<i class="fab fa-reddit-alien"></i>`;
                                                
            } else {
                reddit = `<a href="${item.links.reddit_campaign}" target="_blank"><i class="fab fa-reddit-alien"></i></a>`;
            }

            // checks for a url within presskit item.

            let presskit = item.links.presskit;

            if (presskit == null) {
                presskit = `<i class="far fa-newspaper"></i>`;
                                                
            } else {
                presskit = `<a href="${item.links.presskit}" target="_blank"><i class="far fa-newspaper"></i></a>`;
            }

            

            info.innerHTML = `
                            ${launchSuccess}
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-7">
                                        <h5 class="card-title">Flight Number: ${item.flight_number}</h5>
                                        <p class="card-text">Date: ${date.toString()}</br>
                                        Site: ${item.launch_site.site_name_long}</p>
                                        <p>${item.details}</p>
                                        <div class="media-buttons">
                                        <a href="${item.links.video_link}" target="_blank"><i class="fab fa-youtube"></i></a>
                                        <a href="${item.links.wikipedia}" target="_blank"><i class="fab fa-wikipedia-w"></i></a>
                                        ${reddit}
                                        ${presskit}
                                        </div>
                                    </div>
                                    <div class="col-md-5 text-center">
                                        <img src="${item.links.mission_patch_small}" alt="Mission Patch" >
                                    </div>
                                </div>
                            </div>
                            `;
        });
    });
}

// applys pagination to page

let pagination = document.getElementById("btm-pagination");
pagination.innerHTML = `<nav aria-label="Page navigation" class="container">
                                    <ul class="pagination justify-content-center">
                                        
                                        <li class="page-item active"><option class="page-link" onclick="getPagination(value)" value="?limit=10&offset=82">1</option></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=73" class="page-link">2</option></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=63" class="page-link">3</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=53" class="page-link">4</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=33" class="page-link">5</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=23" class="page-link">6</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=13" class="page-link">7</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=10&offset=03" class="page-link">8</a></li>
                                        <li class="page-item"><option onclick="getPagination(value)" value="?limit=3&offset=0" class="page-link">9</a></li>
                                        
                            
                                    </ul>
                                </nav>`;


// nav-bar active state change without reloading webpage
$(".page-item").on("click", function () {
    $(".page-item").removeClass("active");
    $(this).addClass("active");
});