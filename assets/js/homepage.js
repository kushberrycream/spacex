// Variables

const app = document.getElementById("data");
const app2 = document.getElementById("data2")
const api = "https://api.spacexdata.com/v3/";
const launchPads = "https://api.spacexdata.com/v3/launchpads";
const landPads = "https://api.spacexdata.com/v3/landpads"




// call spacex api on load 


upcomingLaunch();


// call spacex upcoming launches api

function upcomingLaunch() {

    $("#loader").removeClass("hide-loader");
    axios.all([
        axios.get(api + "launches/upcoming"),
        axios.get(launchPads),
        axios.get(landPads)
    ])
        .then(axios.spread((api, launchPads, landPads) => {
            // call both apis upcoming launches and past launches
            data = api.data;
            launchPads = launchPads.data;
            landPads = landPads.data;

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
            Object.keys(launchPads[1]).forEach(key => {
                let newKey = key.replace(/_/g, " ");
                let upper = newKey.replace(/^\w/, c => c.toUpperCase());

                tableHeaders.push(upper);
            });
            let landHeaders = [];
            Object.keys(landPads[1]).forEach(key => {
                let newKey = key.replace(/_/g, " ");
                let upper = newKey.replace(/^\w/, c => c.toUpperCase());

                landHeaders.push(upper);
            });
            
            app2.innerHTML = `<h2 class="title">Launch Sites</h2>
                <div class="responsive-tabs">

                    <input class="state" type="radio" title="tab-one" name="tabs-state" id="tab-one" />
                    <input class="state" type="radio" title="tab-two" name="tabs-state" id="tab-two" />
                    <input class="state" type="radio" title="tab-three" name="tabs-state" id="tab-three" />
                    <input class="state" type="radio" title="tab-four" name="tabs-state" id="tab-four" />
                    <input class="state" type="radio" title="tab-five" name="tabs-state" id="tab-five" />
                    <input class="state" type="radio" title="tab-six" name="tabs-state" id="tab-six" />

                    <div class="tabs flex-tabs">
                        <label for="tab-one" id="tab-one-label" class="tab">${launchPads[0].site_name_long}</label>
                        <label for="tab-two" id="tab-two-label" class="tab">${launchPads[1].site_name_long}</label>
                        <label for="tab-three" id="tab-three-label" class="tab">${launchPads[2].site_name_long}</label>
                        <label for="tab-four" id="tab-four-label" class="tab">${launchPads[3].site_name_long}</label>
                        <label for="tab-five" id="tab-five-label" class="tab">${launchPads[4].site_name_long}</label>
                        <label for="tab-six" id="tab-six-label" class="tab">${launchPads[5].site_name_long}</label>


                            <div id="tab-one-panel" class="panel">
                                    <table role="table">
                                        <thead role="rowgroup">
                                        <tr role="row">
                                            <th class="launch-head"><strong>${tableHeaders[2]}</strong></th>
                                            <th class="launch-head"><strong>${tableHeaders[3]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[4]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[5]}</strong></th>
                                            <th class="launch-head"><strong>${tableHeaders[6]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[7]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[8]}</strong></th>
                                        </tr>
                                        </thead>
                                        <tbody role="rowgroup">
                                        <tr role="row">
                                            <td class="launch-item">${launchPads[0].status}</td>
                                            <td class="launch-item">${launchPads[0].location.name}</td>
                                            <td class="launch-item">${launchPads[0].vehicles_launched[0]}</td>
                                            <td class="launch-item">${launchPads[0].attempted_launches}</td>
                                            <td class="launch-item">${launchPads[0].successful_launches}</td>
                                            <td class="launch-item"><a href="${launchPads[0].wikipedia}">Click Here!</a></td>
                                            <td class="launch-item">${launchPads[0].details}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                            <div id="tab-two-panel" class="panel">
                                <table role="table">
                                        <thead role="rowgroup">
                                        <tr role="row">
                                            <th class="launch-head"><strong>${tableHeaders[2]}</strong></th>
                                            <th class="launch-head"><strong>${tableHeaders[3]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[4]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[5]}</strong></th>
                                            <th class="launch-head"><strong>${tableHeaders[6]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[7]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[8]}</strong></th>
                                        </tr>
                                        </thead>
                                        <tbody role="rowgroup">
                                        <tr role="row">
                                            <td class="launch-item">${launchPads[1].status}</td>
                                            <td class="launch-item">${launchPads[1].location.name}</td>
                                            <td class="launch-item">${launchPads[1].vehicles_launched[0]}</td>
                                            <td class="launch-item">${launchPads[1].attempted_launches}</td>
                                            <td class="launch-item">${launchPads[1].successful_launches}</td>
                                            <td class="launch-item"><a href="${launchPads[1].wikipedia}">Click Here!</a></td>
                                            <td class="launch-item">${launchPads[1].details}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                            <div id="tab-three-panel" class="panel">
                                <table role="table">
                                        <thead role="rowgroup">
                                        <tr role="row">
                                            <th class="launch-head"><strong>${tableHeaders[2]}</strong></th>
                                            <th class="launch-head"><strong>${tableHeaders[3]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[4]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[5]}</strong></th>
                                            <th class="launch-head"><strong>${tableHeaders[6]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[7]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[8]}</strong></th>
                                        </tr>
                                        </thead>
                                        <tbody role="rowgroup">
                                        <tr role="row">
                                            <td class="launch-item">${launchPads[2].status}</td>
                                            <td class="launch-item">${launchPads[2].location.name}</td>
                                            <td class="launch-item">${launchPads[2].vehicles_launched[0]}</td>
                                            <td class="launch-item">${launchPads[2].attempted_launches}</td>
                                            <td class="launch-item">${launchPads[2].successful_launches}</td>
                                            <td class="launch-item"><a href="${launchPads[2].wikipedia}">Click Here!</a></td>
                                            <td class="launch-item">${launchPads[2].details}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                            <div id="tab-four-panel" class="panel">
                                <table role="table">
                                        <thead role="rowgroup">
                                        <tr role="row">
                                            <th class="launch-head"><strong>${tableHeaders[2]}</strong></th>
                                            <th class="launch-head"><strong>${tableHeaders[3]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[4]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[5]}</strong></th>
                                            <th class="launch-head"><strong>${tableHeaders[6]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[7]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[8]}</strong></th>
                                        </tr>
                                        </thead>
                                        <tbody role="rowgroup">
                                        <tr role="row">
                                            <td class="launch-item">${launchPads[3].status}</td>
                                            <td class="launch-item">${launchPads[3].location.name}</td>
                                            <td class="launch-item">${launchPads[3].vehicles_launched[0]}</td>
                                            <td class="launch-item">${launchPads[3].attempted_launches}</td>
                                            <td class="launch-item">${launchPads[3].successful_launches}</td>
                                            <td class="launch-item"><a href="${launchPads[3].wikipedia}">Click Here!</a></td>
                                            <td class="launch-item">${launchPads[3].details}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                            <div id="tab-five-panel" class="panel">
                                <table role="table">
                                        <thead role="rowgroup">
                                        <tr role="row">
                                            <th class="launch-head"><strong>${tableHeaders[2]}</strong></th>
                                            <th class="launch-head"><strong>${tableHeaders[3]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[4]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[5]}</strong></th>
                                            <th class="launch-head"><strong>${tableHeaders[6]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[7]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[8]}</strong></th>
                                        </tr>
                                        </thead>
                                        <tbody role="rowgroup">
                                        <tr role="row">
                                            <td class="launch-item">${launchPads[4].status}</td>
                                            <td class="launch-item">${launchPads[4].location.name}</td>
                                            <td class="launch-item">${launchPads[4].vehicles_launched[0]}</td>
                                            <td class="launch-item">${launchPads[4].attempted_launches}</td>
                                            <td class="launch-item">${launchPads[4].successful_launches}</td>
                                            <td class="launch-item"><a href="${launchPads[4].wikipedia}">Click Here!</a></td>
                                            <td class="launch-item">${launchPads[4].details}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                            <div id="tab-six-panel" class="panel">
                                <table role="table">
                                        <thead role="rowgroup">
                                        <tr role="row">
                                            <th class="launch-head"><strong>${tableHeaders[2]}</strong></th>
                                            <th class="launch-head"><strong>${tableHeaders[3]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[4]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[5]}</strong></th>
                                            <th class="launch-head"><strong>${tableHeaders[6]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[7]}</strong></th> 
                                            <th class="launch-head"><strong>${tableHeaders[8]}</strong></th>
                                        </tr>
                                        </thead>
                                        <tbody role="rowgroup">
                                        <tr role="row">
                                            <td class="launch-item">${launchPads[5].status}</td>
                                            <td class="launch-item">${launchPads[5].location.name}</td>
                                            <td class="launch-item">${launchPads[5].vehicles_launched[0]}</td>
                                            <td class="launch-item">${launchPads[5].attempted_launches}</td>
                                            <td class="launch-item">${launchPads[5].successful_launches}</td>
                                            <td class="launch-item"><a href="${launchPads[5].wikipedia}">Click Here!</a></td>
                                            <td class="launch-item">${launchPads[5].details}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                    </div>
                </div>
                <h2 class="title">Landing Sites</h2>
                <div class="responsive-tabs">

                    <input class="state" type="radio" title="tab-one-land" name="tabs-state" id="tab-one-land" />
                    <input class="state" type="radio" title="tab-two-land" name="tabs-state" id="tab-two-land" />
                    <input class="state" type="radio" title="tab-three-land" name="tabs-state" id="tab-three-land" />
                    <input class="state" type="radio" title="tab-four-land" name="tabs-state" id="tab-four-land" />
                    <input class="state" type="radio" title="tab-five-land" name="tabs-state" id="tab-five-land" />
                    <input class="state" type="radio" title="tab-six-land" name="tabs-state" id="tab-six-land" />
                    <input class="state" type="radio" title="tab-seven-land" name="tabs-state" id="tab-seven-land" />

                    <div class="tabs flex-tabs">
                        <label for="tab-one-land" id="tab-one-label-land" class="tab">${landPads[0].full_name}</label>
                        <label for="tab-two-land" id="tab-two-label-land" class="tab">${landPads[1].full_name}</label>
                        <label for="tab-three-land" id="tab-three-label-land" class="tab">${landPads[2].full_name}</label>
                        <label for="tab-four-land" id="tab-four-label-land" class="tab">${landPads[3].full_name}</label>
                        <label for="tab-five-land" id="tab-five-label-land" class="tab">${landPads[4].full_name}</label>
                        <label for="tab-six-land" id="tab-six-label-land" class="tab">${landPads[5].full_name}</label>
                        <label for="tab-seven-land" id="tab-seven-label-land" class="tab">${landPads[6].full_name}</label>

                            <div id="tab-one-panel-land" class="panel">
                                <table role="table">
                                        <thead role="rowgroup">
                                        <tr role="row">
                                            <th class="land-head"><strong>${landHeaders[2]}</strong></th>
                                            <th class="land-head"><strong>${landHeaders[3]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[4]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[5]}</strong></th>
                                            <th class="land-head"><strong>${landHeaders[6]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[7]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[8]}</strong></th>
                                        </tr>
                                        </thead>
                                        <tbody role="rowgroup">
                                        <tr role="row">
                                            <td class="land-item">${landPads[0].status}</td>
                                            <td class="land-item">${landPads[0].location.name}</td>
                                            <td class="land-item">${landPads[0].landing_type}</td>
                                            <td class="land-item">${landPads[0].attempted_landings}</td>
                                            <td class="land-item">${landPads[0].successful_landings}</td>
                                            <td class="land-item"><a href="${landPads[0].successful_landings}">Click Here!</a></td>
                                            <td class="land-item">${landPads[0].details}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                            <div id="tab-two-panel-land" class="panel">
                                <table role="table">
                                        <thead role="rowgroup">
                                        <tr role="row">
                                            <th class="land-head"><strong>${landHeaders[2]}</strong></th>
                                            <th class="land-head"><strong>${landHeaders[3]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[4]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[5]}</strong></th>
                                            <th class="land-head"><strong>${landHeaders[6]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[7]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[8]}</strong></th>
                                        </tr>
                                        </thead>
                                        <tbody role="rowgroup">
                                        <tr role="row">
                                            <td class="land-item">${landPads[1].status}</td>
                                            <td class="land-item">${landPads[1].location.name}</td>
                                            <td class="land-item">${landPads[1].landing_type}</td>
                                            <td class="land-item">${landPads[1].attempted_landings}</td>
                                            <td class="land-item">${landPads[1].successful_landings}</td>
                                            <td class="land-item"><a href="${landPads[1].successful_landings}">Click Here!</a></td>
                                            <td class="land-item">${landPads[1].details}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                            <div id="tab-three-panel-land" class="panel">
                                <table role="table">
                                        <thead role="rowgroup">
                                        <tr role="row">
                                            <th class="land-head"><strong>${landHeaders[2]}</strong></th>
                                            <th class="land-head"><strong>${landHeaders[3]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[4]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[5]}</strong></th>
                                            <th class="land-head"><strong>${landHeaders[6]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[7]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[8]}</strong></th>
                                        </tr>
                                        </thead>
                                        <tbody role="rowgroup">
                                        <tr role="row">
                                            <td class="land-item">${landPads[2].status}</td>
                                            <td class="land-item">${landPads[2].location.name}</td>
                                            <td class="land-item">${landPads[2].landing_type}</td>
                                            <td class="land-item">${landPads[2].attempted_landings}</td>
                                            <td class="land-item">${landPads[2].successful_landings}</td>
                                            <td class="land-item"><a href="${landPads[2].successful_landings}">Click Here!</a></td>
                                            <td class="land-item">${landPads[2].details}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                            <div id="tab-four-panel-land" class="panel">
                                <table role="table">
                                        <thead role="rowgroup">
                                        <tr role="row">
                                            <th class="land-head"><strong>${landHeaders[2]}</strong></th>
                                            <th class="land-head"><strong>${landHeaders[3]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[4]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[5]}</strong></th>
                                            <th class="land-head"><strong>${landHeaders[6]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[7]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[8]}</strong></th>
                                        </tr>
                                        </thead>
                                        <tbody role="rowgroup">
                                        <tr role="row">
                                            <td class="land-item">${landPads[3].status}</td>
                                            <td class="land-item">${landPads[3].location.name}</td>
                                            <td class="land-item">${landPads[3].landing_type}</td>
                                            <td class="land-item">${landPads[3].attempted_landings}</td>
                                            <td class="land-item">${landPads[3].successful_landings}</td>
                                            <td class="land-item"><a href="${landPads[3].successful_landings}">Click Here!</a></td>
                                            <td class="land-item">${landPads[3].details}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                            <div id="tab-five-panel-land" class="panel">
                                <table role="table">
                                        <thead role="rowgroup">
                                        <tr role="row">
                                            <th class="land-head"><strong>${landHeaders[2]}</strong></th>
                                            <th class="land-head"><strong>${landHeaders[3]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[4]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[5]}</strong></th>
                                            <th class="land-head"><strong>${landHeaders[6]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[7]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[8]}</strong></th>
                                        </tr>
                                        </thead>
                                        <tbody role="rowgroup">
                                        <tr role="row">
                                            <td class="land-item">${landPads[4].status}</td>
                                            <td class="land-item">${landPads[4].location.name}</td>
                                            <td class="land-item">${landPads[4].landing_type}</td>
                                            <<td class="land-item">${landPads[4].attempted_landings}</td>
                                            <td class="land-item">${landPads[4].successful_landings}</td>
                                            <td class="land-item"><a href="${landPads[4].successful_landings}">Click Here!</a></td>
                                            <td class="land-item">${landPads[4].details}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                            <div id="tab-six-panel-land" class="panel">
                                <table role="table">
                                        <thead role="rowgroup">
                                        <tr role="row">
                                            <th class="land-head"><strong>${landHeaders[2]}</strong></th>
                                            <th class="land-head"><strong>${landHeaders[3]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[4]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[5]}</strong></th>
                                            <th class="land-head"><strong>${landHeaders[6]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[7]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[8]}</strong></th>
                                        </tr>
                                        </thead>
                                        <tbody role="rowgroup">
                                        <tr role="row">
                                            <td class="land-item">${landPads[5].status}</td>
                                            <td class="land-item">${landPads[5].location.name}</td>
                                            <td class="land-item">${landPads[5].landing_type}</td>
                                            <td class="land-item">${landPads[5].attempted_landings}</td>
                                            <td class="land-item">${landPads[5].successful_landings}</td>
                                            <td class="land-item"><a href="${landPads[5].successful_landings}">Click Here!</a></td>
                                            <td class="land-item">${landPads[5].details}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                            <div id="tab-seven-panel-land" class="panel">
                                <table role="table">
                                        <thead role="rowgroup">
                                        <tr role="row">
                                            <th class="land-head"><strong>${landHeaders[2]}</strong></th>
                                            <th class="land-head"><strong>${landHeaders[3]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[4]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[5]}</strong></th>
                                            <th class="land-head"><strong>${landHeaders[6]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[7]}</strong></th> 
                                            <th class="land-head"><strong>${landHeaders[8]}</strong></th>
                                        </tr>
                                        </thead>
                                        <tbody role="rowgroup">
                                        <tr role="row">
                                            <td class="land-item">${landPads[6].status}</td>
                                            <td class="land-item">${landPads[6].location.name}</td>
                                            <td class="land-item">${landPads[6].landing_type}</td>
                                            <td class="land-item">${landPads[6].attempted_landings}</td>
                                            <td class="land-item">${landPads[6].successful_landings}</td>
                                            <td class="land-item"><a href="${landPads[6].successful_landings}">Click Here!</a></td>
                                            <td class="land-item">${landPads[6].details}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                    </div>
                </div>`;
            
        }));
}







