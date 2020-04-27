// Variables

const app = document.getElementById("data");
const app2 = document.getElementById("data2")
const api = "https://api.spacexdata.com/v3/";
const pads = "https://api.spacexdata.com/v3/launchpads"



// call spacex api on load 


upcomingLaunch();


// call spacex upcoming launches api

function upcomingLaunch() {

    $("#loader").removeClass("hide-loader");
    axios.all([
        axios.get(api + "launches/upcoming"),
        axios.get(pads)
    ])
        .then(axios.spread((api, pads) => {
            // call both apis upcoming launches and past launches
            data = api.data;
            pads = pads.data;

            $("#loader").addClass("hide-loader");
            app.innerHTML = `
            <div class="overlay"></div>
                <div class="container-fluid">
                    <div class="card card-raised card-carousel">
                        <h1 class="title">Upcoming Launches</h1>
                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="10000">
                            <ol id="data-slide" class="carousel-indicators"></ol>
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
                    launches.innerHTML = `
                    <div class="details-container">
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
                    launches.innerHTML = `
                    <div class="details-container">  
                        <div class="carousel-caption row">
                            <div class="col-md-5 text-right">
                                <img src="${item.links.mission_patch_small ? item.links.mission_patch_small : "assets/images/spacexcircle.png"}" alt="mission patch">
                                <h4><span class="flight">Flight No:</span> ${item.flight_number}</h4>
                                <h4><span class="rocket">Rocket:</span> ${item.rocket.rocket_name}</h4>
                                <h4><span class="type">Rocket Type:</span> ${item.rocket.rocket_type}</h4>
                                <h4><span class="site">Site:</span> ${item.launch_site.site_name_long}</h4>
                            </div>
                            <div class="col-md-6 d-md-block d-none launch-details">                                                    
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
                    let date;

                    let mql = window.matchMedia("screen and (min-width: 800px)")
                    if (mql.matches) {
                        date = moment.parseZone(item.launch_date_utc).utc().format("dddd Do MMMM YYYY, h:mm a");
                    }
                    else {
                        date = moment.parseZone(item.launch_date_utc).utc().format("D / M / YYYY, h:mm a");
                    };


                    info.innerHTML = `
                    <h1><span class="mission-name">Mission Name:</span> ${item.mission_name}</h1>
                    <h2>${days}d ${hours}h ${minutes}m ${seconds}s</h2>
                    <h3>${date}</h3>`;


                    if (t < 0) {
                        clearInterval(x);
                        info.innerHTML = `
                        <h1><span class="mission-name">Mission Name:</span> ${item.mission_name}</h1>
                        <h2>Date To Be Confirmed!</h2>`;
                    }
                }, 1000);

            });


            let activeItem = document.getElementsByTagName("div").item(8);
            activeItem.setAttribute("class", "carousel-item active");

            let activeLaunch = document.getElementsByTagName("li").item(7);
            activeLaunch.setAttribute("class", "active");

            let tableHeaders = [];
            Object.keys(pads[1]).forEach(key => {
                let newKey = key.replace(/_/g, " ")
                let upper = newKey.replace(/^\w/, c => c.toUpperCase());

                tableHeaders.push(upper)
            })
            console.log(pads)
            app2.innerHTML = `<h3 class="title">Launch Sites</h3>
                <div class="responsive-tabs">

                    <input class="state" type="radio" title="tab-one" name="tabs-state" id="tab-one" checked />
                    <input class="state" type="radio" title="tab-two" name="tabs-state" id="tab-two" />
                    <input class="state" type="radio" title="tab-three" name="tabs-state" id="tab-three" />
                    <input class="state" type="radio" title="tab-four" name="tabs-state" id="tab-four" />
                    <input class="state" type="radio" title="tab-five" name="tabs-state" id="tab-five" />
                    <input class="state" type="radio" title="tab-six" name="tabs-state" id="tab-six" />

                    <div class="tabs flex-tabs">
                        <label for="tab-one" id="tab-one-label" class="tab">${pads[0].site_name_long}</label>
                        <label for="tab-two" id="tab-two-label" class="tab">${pads[1].site_name_long}</label>
                        <label for="tab-three" id="tab-three-label" class="tab">${pads[2].site_name_long}</label>
                        <label for="tab-four" id="tab-four-label" class="tab">${pads[3].site_name_long}</label>
                        <label for="tab-five" id="tab-five-label" class="tab">${pads[4].site_name_long}</label>
                        <label for="tab-six" id="tab-six-label" class="tab">${pads[5].site_name_long}</label>


                            <div id="tab-one-panel" class="panel">
                                <div class="row">
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[2]}</strong></div>
                                    <div class="panel-item col-md-2"><strong>${tableHeaders[3]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[4]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[5]}</strong></div>
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[6]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[7]}</strong></div> 
                                    <div class="panel-item col-md-5"><strong>${tableHeaders[8]}</strong></div>
                                    <div class="panel-item col-md-1">${pads[0].status}</div>
                                    <div class="panel-item col-md-2">${pads[0].location.name}</div>
                                    <div class="panel-item col-md-1">${pads[0].vehicles_launched[0]}</div>
                                    <div class="panel-item col-md-1">${pads[0].attempted_launches}</div>
                                    <div class="panel-item col-md-1">${pads[0].successful_launches}</div>
                                    <div class="panel-item col-md-1"><a href="${pads[0].wikipedia}">Click Here!</a></div>
                                    <div class="panel-item col-md-5">${pads[0].details}</div>
                                </div>
                            </div>
                            <div id="tab-two-panel" class="panel">
                                <div class="row">
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[2]}</strong></div>
                                    <div class="panel-item col-md-2"><strong>${tableHeaders[3]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[4]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[5]}</strong></div>
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[6]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[7]}</strong></div> 
                                    <div class="panel-item col-md-5"><strong>${tableHeaders[8]}</strong></div>
                                    <div class="panel-item col-md-1">${pads[1].status}</div>
                                    <div class="panel-item col-md-2">${pads[1].location.name}</div>
                                    <div class="panel-item col-md-1">${pads[1].vehicles_launched[0]}</div>
                                    <div class="panel-item col-md-1">${pads[1].attempted_launches}</div>
                                    <div class="panel-item col-md-1">${pads[1].successful_launches}</div>
                                    <div class="panel-item col-md-1"><a href="${pads[1].wikipedia}">Click Here!</a></div>
                                    <div class="panel-item col-md-5">${pads[1].details}</div>
                                </div>
                            </div>
                            <div id="tab-three-panel" class="panel">
                                <div class="row">
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[2]}</strong></div>
                                    <div class="panel-item col-md-2"><strong>${tableHeaders[3]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[4]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[5]}</strong></div>
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[6]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[7]}</strong></div> 
                                    <div class="panel-item col-md-5"><strong>${tableHeaders[8]}</strong></div>
                                    <div class="panel-item col-md-1">${pads[2].status}</div>
                                    <div class="panel-item col-md-2">${pads[2].location.name}</div>
                                    <div class="panel-item col-md-1">${pads[2].vehicles_launched[0]}</div>
                                    <div class="panel-item col-md-1">${pads[2].attempted_launches}</div>
                                    <div class="panel-item col-md-1">${pads[2].successful_launches}</div>
                                    <div class="panel-item col-md-1"><a href="${pads[2].wikipedia}">Click Here!</a></div>
                                    <div class="panel-item col-md-5">${pads[2].details}</div>
                                </div>
                            </div>
                            <div id="tab-four-panel" class="panel">
                                <div class="row">
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[2]}</strong></div>
                                    <div class="panel-item col-md-2"><strong>${tableHeaders[3]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[4]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[5]}</strong></div>
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[6]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[7]}</strong></div> 
                                    <div class="panel-item col-md-5"><strong>${tableHeaders[8]}</strong></div>
                                    <div class="panel-item col-md-1">${pads[3].status}</div>
                                    <div class="panel-item col-md-2">${pads[3].location.name}</div>
                                    <div class="panel-item col-md-1">${pads[3].vehicles_launched[0]}</div>
                                    <div class="panel-item col-md-1">${pads[3].attempted_launches}</div>
                                    <div class="panel-item col-md-1">${pads[3].successful_launches}</div>
                                    <div class="panel-item col-md-1"><a href="${pads[3].wikipedia}">Click Here!</a></div>
                                    <div class="panel-item col-md-5">${pads[3].details}</div>
                                </div>
                            </div>
                            <div id="tab-five-panel" class="panel">
                                <div class="row">
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[2]}</strong></div>
                                    <div class="panel-item col-md-2"><strong>${tableHeaders[3]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[4]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[5]}</strong></div>
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[6]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[7]}</strong></div> 
                                    <div class="panel-item col-md-5"><strong>${tableHeaders[8]}</strong></div>
                                    <div class="panel-item col-md-1">${pads[4].status}</div>
                                    <div class="panel-item col-md-2">${pads[4].location.name}</div>
                                    <div class="panel-item col-md-1">${pads[4].vehicles_launched[0]}</div>
                                    <div class="panel-item col-md-1">${pads[4].attempted_launches}</div>
                                    <div class="panel-item col-md-1">${pads[4].successful_launches}</div>
                                    <div class="panel-item col-md-1"><a href="${pads[4].wikipedia}">Click Here!</a></div>
                                    <div class="panel-item col-md-5">${pads[4].details}</div>
                                </div>
                            </div>
                            <div id="tab-six-panel" class="panel">
                                <div class="row">
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[2]}</strong></div>
                                    <div class="panel-item col-md-2"><strong>${tableHeaders[3]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[4]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[5]}</strong></div>
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[6]}</strong></div> 
                                    <div class="panel-item col-md-1"><strong>${tableHeaders[7]}</strong></div> 
                                    <div class="panel-item col-md-5"><strong>${tableHeaders[8]}</strong></div>
                                    <div class="panel-item col-md-1">${pads[5].status}</div>
                                    <div class="panel-item col-md-2">${pads[5].location.name}</div>
                                    <div class="panel-item col-md-1">${pads[5].vehicles_launched[0]}</div>
                                    <div class="panel-item col-md-1">${pads[5].attempted_launches}</div>
                                    <div class="panel-item col-md-1">${pads[5].successful_launches}</div>
                                    <div class="panel-item col-md-1"><a href="${pads[5].wikipedia}">Click Here!</a></div>
                                    <div class="panel-item col-md-5">${pads[5].details}</div>
                                </div>
                            </div>
                    </div>

                </div>`
            
        }));
}







