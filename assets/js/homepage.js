// Variables

const app = document.getElementById("data");
const api = "https://api.spacexdata.com/v3/";


// call spacex api on load 


upcomingLaunch();


// call spacex upcoming launches api

function upcomingLaunch() {

    $("#loader").removeClass("hide-loader");

    axios.get(api + "launches/upcoming").then(response => {
        data = response.data;
        $("#loader").addClass("hide-loader");
        app.innerHTML = `
        <div class="overlay"></div>
        <div class="container-fluid">
            <div class="card card-raised card-carousel">
                <h1 class="title">Upcoming Launches</h1>
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
                                        <div class="col-md-7 text-right">
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

        let activeLaunch = document.getElementsByTagName("li").item(7);
        activeLaunch.setAttribute("class", "active");
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    });

}







