/**
 * @fileoverview JS file with all Axios XMLHttpRequests,
 * Axios transforms JSON Data Automatically.
 * @author Tom Jones <tom@wilson-express.co.uk>
 */

homepageData();

function carousel() {
    $("#loader").addClass("hide-loader");
    upcoming.forEach(item => {

        let a = upcoming.indexOf(item);
        let indicators = document.getElementById("data-slide");
        let slide = document.createElement("li");
        let upcomingLaunch = document.getElementById("upcoming-launch");
        let launches = document.createElement("div");
        let info = document.createElement("div");

        slide.setAttribute("data-slide-to", a);
        slide.setAttribute("data-target", "#carouselExampleIndicators");
        launches.setAttribute("class", "carousel-item");
        info.setAttribute("class", "countdown");

        indicators.appendChild(slide);
        upcomingLaunch.appendChild(launches);
        launches.appendChild(info);

        if (item.details == null) {
            let container = document.createElement("div");
            let caption = document.createElement("div");
            let column = document.createElement("div");
            let patch = document.createElement("img");
            let flight = document.createElement("h4");
            let name = document.createElement("h4");
            let type = document.createElement("h4");
            let site = document.createElement("h4");

            container.setAttribute("class", "details-container");
            caption.setAttribute("class", "carousel-caption row justify-content-center");
            column.setAttribute("class", "col-md-7 text-right");
            patch.setAttribute("src", item.links.mission_patch_small ? item.links.mission_patch_small : "assets/images/spacexcircle.png");


            launches.appendChild(container);
            container.appendChild(caption);
            caption.appendChild(column);
            column.appendChild(patch);
            column.appendChild(flight);
            column.appendChild(name);
            column.appendChild(type);
            column.appendChild(site);

            flight.innerHTML = `<span class="flight">Flight No:</span> ${item.flight_number}`;
            name.innerHTML = `<span class="rocket">Rocket:</span> ${item.rocket.rocket_name}`;
            type.innerHTML = `<span class="type">Rocket Type:</span> ${item.rocket.rocket_type}`;
            site.innerHTML = `<h4><span class="site">Site:</span> ${item.launch_site.site_name_long}</h4>`;
        } else {
            let container = document.createElement("div");
            let caption = document.createElement("div");
            let column = document.createElement("div");
            let column2 = document.createElement("div");
            let patch = document.createElement("img");
            let flight = document.createElement("h4");
            let name = document.createElement("h4");
            let type = document.createElement("h4");
            let site = document.createElement("h4");
            let details = document.createElement("p");

            container.setAttribute("class", "details-container");
            caption.setAttribute("class", "carousel-caption row justify-content-center");
            column.setAttribute("class", "col-md-5 text-right");
            column2.setAttribute("class", "col-md-6 d-md-block d-none launch-details")
            patch.setAttribute("src", item.links.mission_patch_small ? item.links.mission_patch_small : "assets/images/spacexcircle.png");

            launches.appendChild(container);
            container.appendChild(caption);
            caption.appendChild(column);
            caption.appendChild(column2);
            column.appendChild(patch);
            column.appendChild(flight);
            column.appendChild(name);
            column.appendChild(type);
            column.appendChild(site);
            column2.appendChild(details);

            flight.innerHTML = `<span class="flight">Flight No:</span> ${item.flight_number}`;
            name.innerHTML = `<span class="rocket">Rocket:</span> ${item.rocket.rocket_name}`;
            type.innerHTML = `<span class="type">Rocket Type:</span> ${item.rocket.rocket_type}`;
            site.innerHTML = `<h4><span class="site">Site:</span> ${item.launch_site.site_name_long}</h4>`
            details.innerText = item.details;
        }

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


            info.innerHTML = `<h1><span class="mission-name">Mission Name:</span> ${item.mission_name}</h1>
                                    <h2>${days}d ${hours}h ${minutes}m ${seconds}s</h2>
                                    <h3>${date}</h3>`;

            if (t < 0) {
                clearInterval(x);
                info.innerHTML = `<h1><span class="mission-name">Mission Name:</span> ${item.mission_name}</h1>
                                        <h2>Date To Be Confirmed!</h2>`;
            }
        }, 1000);

    });

};


function active() {

    let activeItem = document.getElementsByTagName("div").item(8);
    activeItem.setAttribute("class", "carousel-item active");

    let activeLaunch = document.getElementsByTagName("li").item(7);
    activeLaunch.setAttribute("class", "active");
}

function siteLabels() {

    //     Launch site labels

    launchLabel1 = document.getElementById("tab-one-label");
    launchLabel1.innerText = launchData[0].site_name_long;

    launchLabel2 = document.getElementById("tab-two-label");
    launchLabel2.innerText = launchData[1].site_name_long;

    launchLabel3 = document.getElementById("tab-three-label");
    launchLabel3.innerText = launchData[2].site_name_long;

    launchLabel4 = document.getElementById("tab-four-label");
    launchLabel4.innerText = launchData[3].site_name_long;

    launchLabel5 = document.getElementById("tab-five-label");
    launchLabel5.innerText = launchData[4].site_name_long;

    launchLabel6 = document.getElementById("tab-six-label");
    launchLabel6.innerText = launchData[5].site_name_long;

    //      Landing site labels

    landingLabel1 = document.getElementById("tab-one-label-land");
    landingLabel1.innerText = landData[0].full_name;

    landingLabel2 = document.getElementById("tab-two-label-land");
    landingLabel2.innerText = landData[1].full_name;

    landingLabel3 = document.getElementById("tab-three-label-land");
    landingLabel3.innerText = landData[2].full_name;

    landingLabel4 = document.getElementById("tab-four-label-land");
    landingLabel4.innerText = landData[3].full_name;

    landingLabel5 = document.getElementById("tab-five-label-land");
    landingLabel5.innerText = landData[4].full_name;

    landingLabel6 = document.getElementById("tab-six-label-land");
    landingLabel6.innerText = landData[5].full_name;

    landingLabel7 = document.getElementById("tab-seven-label-land");
    landingLabel7.innerText = landData[6].full_name;


}


function headers() {

    let tableHeaders = [];
    Object.keys(launchData[1]).forEach(key => {
        let newKey = key.replace(/_/g, " ");
        let upper = newKey.replace(/^\w/, c => c.toUpperCase());

        tableHeaders.push(upper);
    });
    let landHeaders = [];
    Object.keys(landData[1]).forEach(key => {
        let newKey = key.replace(/_/g, " ");
        let upper = newKey.replace(/^\w/, c => c.toUpperCase());

        landHeaders.push(upper);
    });

    //       Launch Site Table Headers 

    launchHeaders = `<tr role="row">
								<th class="launch-head"><strong>${tableHeaders[2]}</strong></th>
								<th class="launch-head"><strong>${tableHeaders[3]}</strong></th>
								<th class="launch-head"><strong>${tableHeaders[4]}</strong></th>
								<th class="launch-head"><strong>${tableHeaders[5]}</strong></th>
								<th class="launch-head"><strong>${tableHeaders[6]}</strong></th>
								<th class="launch-head"><strong>${tableHeaders[7]}</strong></th>
								<th class="launch-head"><strong>${tableHeaders[8]}</strong></th>
                            </tr>`;

    launchHead1 = document.getElementById("tab-one-head");
    launchHead1.innerHTML = launchHeaders;

    launchHead2 = document.getElementById("tab-two-head");
    launchHead2.innerHTML = launchHeaders;

    launchHead3 = document.getElementById("tab-three-head");
    launchHead3.innerHTML = launchHeaders;

    launchHead4 = document.getElementById("tab-four-head");
    launchHead4.innerHTML = launchHeaders;

    launchHead5 = document.getElementById("tab-five-head");
    launchHead5.innerHTML = launchHeaders;

    launchHead6 = document.getElementById("tab-six-head");
    launchHead6.innerHTML = launchHeaders;

    //       Landing Site Table Headers 

    landingHeaders = `<tr role="row">
									<th class="land-head"><strong>${landHeaders[2]}</strong></th>
									<th class="land-head"><strong>${landHeaders[3]}</strong></th>
									<th class="land-head"><strong>${landHeaders[4]}</strong></th>
									<th class="land-head"><strong>${landHeaders[5]}</strong></th>
									<th class="land-head"><strong>${landHeaders[6]}</strong></th>
									<th class="land-head"><strong>${landHeaders[7]}</strong></th>
									<th class="land-head"><strong>${landHeaders[8]}</strong></th>
                                </tr>`;

    landHead1 = document.getElementById("tab-one-head-land");
    landHead1.innerHTML = landingHeaders;

    landHead2 = document.getElementById("tab-two-head-land");
    landHead2.innerHTML = landingHeaders;

    landHead3 = document.getElementById("tab-three-head-land");
    landHead3.innerHTML = landingHeaders;

    landHead4 = document.getElementById("tab-four-head-land");
    landHead4.innerHTML = landingHeaders;

    landHead5 = document.getElementById("tab-five-head-land");
    landHead5.innerHTML = landingHeaders;

    landHead6 = document.getElementById("tab-six-head-land");
    landHead6.innerHTML = landingHeaders;

    landHead7 = document.getElementById("tab-seven-head-land");
    landHead7.innerHTML = landingHeaders;

}

function launchSiteData() {
    //       Launch Site Table Data 

    let launchBody1 = document.getElementById("tab-one-body");
    let launchBody2 = document.getElementById("tab-two-body");
    let launchBody3 = document.getElementById("tab-three-body");
    let launchBody4 = document.getElementById("tab-four-body");
    let launchBody5 = document.getElementById("tab-five-body");
    let launchBody6 = document.getElementById("tab-six-body");
    let tableRow1 = document.createElement("tr");
    let tableRow2 = document.createElement("tr");
    let tableRow3 = document.createElement("tr");
    let tableRow4 = document.createElement("tr");
    let tableRow5 = document.createElement("tr");
    let tableRow6 = document.createElement("tr");


    tableRow1.setAttribute("role", "row");
    tableRow2.setAttribute("role", "row");
    tableRow3.setAttribute("role", "row");
    tableRow4.setAttribute("role", "row");
    tableRow5.setAttribute("role", "row");
    tableRow6.setAttribute("role", "row");

    launchBody1.appendChild(tableRow1);
    launchBody2.appendChild(tableRow2);
    launchBody3.appendChild(tableRow3);
    launchBody4.appendChild(tableRow4);
    launchBody5.appendChild(tableRow5);
    launchBody6.appendChild(tableRow6);

    tableRow1.innerHTML = `<td class="launch-item">${launchData[0].status}</td>
								        <td class="launch-item">${launchData[0].location.name}</td>
								        <td class="launch-item">${launchData[0].vehicles_launched[0]}</td>
								        <td class="launch-item">${launchData[0].attempted_launches}</td>
								        <td class="launch-item">${launchData[0].successful_launches}</td>
								        <td class="launch-item"><a href="${launchData[0].wikipedia}" target="_blank">Click Here!</a></td>
								        <td class="launch-item">${launchData[0].details}</td>`;



    tableRow2.innerHTML = `<td class="launch-item">${launchData[1].status}</td>
								        <td class="launch-item">${launchData[1].location.name}</td>
								        <td class="launch-item">${launchData[1].vehicles_launched[0]}</td>
								        <td class="launch-item">${launchData[1].attempted_launches}</td>
								        <td class="launch-item">${launchData[1].successful_launches}</td>
								        <td class="launch-item"><a href="${launchData[1].wikipedia}" target="_blank">Click Here!</a></td>
								        <td class="launch-item">${launchData[1].details}</td>`;


    tableRow3.innerHTML = `<td class="launch-item">${launchData[2].status}</td>
								        <td class="launch-item">${launchData[2].location.name}</td>
								        <td class="launch-item">${launchData[2].vehicles_launched[0]}</td>
								        <td class="launch-item">${launchData[2].attempted_launches}</td>
								        <td class="launch-item">${launchData[2].successful_launches}</td>
								        <td class="launch-item"><a href="${launchData[2].wikipedia}" target="_blank">Click Here!</a></td>
								        <td class="launch-item">${launchData[2].details}</td>`;


    tableRow4.innerHTML = `<td class="launch-item">${launchData[3].status}</td>
								        <td class="launch-item">${launchData[3].location.name}</td>
								        <td class="launch-item">${launchData[3].vehicles_launched[0]}</td>
								        <td class="launch-item">${launchData[3].attempted_launches}</td>
								        <td class="launch-item">${launchData[3].successful_launches}</td>
								        <td class="launch-item"><a href="${launchData[3].wikipedia}" target="_blank">Click Here!</a></td>
								        <td class="launch-item">${launchData[3].details}</td>`;

    tableRow5.innerHTML = `<td class="launch-item">${launchData[4].status}</td>
								        <td class="launch-item">${launchData[4].location.name}</td>
								        <td class="launch-item">${launchData[4].vehicles_launched[0]}</td>
								        <td class="launch-item">${launchData[4].attempted_launches}</td>
								        <td class="launch-item">${launchData[4].successful_launches}</td>
								        <td class="launch-item"><a href="${launchData[4].wikipedia}" target="_blank">Click Here!</a></td>
								        <td class="launch-item">${launchData[4].details}</td>`;

    tableRow6.innerHTML = `<td class="launch-item">${launchData[5].status}</td>
								        <td class="launch-item">${launchData[5].location.name}</td>
								        <td class="launch-item">${launchData[5].vehicles_launched[0]}</td>
								        <td class="launch-item">${launchData[5].attempted_launches}</td>
								        <td class="launch-item">${launchData[5].successful_launches}</td>
								        <td class="launch-item"><a href="${launchData[5].wikipedia}" target="_blank">Click Here!</a></td>
								        <td class="launch-item">${launchData[5].details}</td>`;

}

function landSiteData() {
    //       Landing Site Table Data 

    let landBody1 = document.getElementById("tab-one-body-land");
    let landBody2 = document.getElementById("tab-two-body-land");
    let landBody3 = document.getElementById("tab-three-body-land");
    let landBody4 = document.getElementById("tab-four-body-land");
    let landBody5 = document.getElementById("tab-five-body-land");
    let landBody6 = document.getElementById("tab-six-body-land");
    let landBody7 = document.getElementById("tab-seven-body-land");
    let landRow1 = document.createElement("tr");
    let landRow2 = document.createElement("tr");
    let landRow3 = document.createElement("tr");
    let landRow4 = document.createElement("tr");
    let landRow5 = document.createElement("tr");
    let landRow6 = document.createElement("tr");
    let landRow7 = document.createElement("tr");

    landRow1.setAttribute("role", "row");
    landRow2.setAttribute("role", "row");
    landRow3.setAttribute("role", "row");
    landRow4.setAttribute("role", "row");
    landRow5.setAttribute("role", "row");
    landRow6.setAttribute("role", "row");
    landRow7.setAttribute("role", "row");

    landBody1.appendChild(landRow1);
    landBody2.appendChild(landRow2);
    landBody3.appendChild(landRow3);
    landBody4.appendChild(landRow4);
    landBody5.appendChild(landRow5);
    landBody6.appendChild(landRow6);
    landBody7.appendChild(landRow7);


    landRow1.innerHTML = `<td class="land-item">${landData[0].status}</td>
									    <td class="land-item">${landData[0].location.name}</td>
									    <td class="land-item">${landData[0].landing_type}</td>
									    <td class="land-item">${landData[0].attempted_landings}</td>
									    <td class="land-item">${landData[0].successful_landings}</td>
									    <td class="land-item"><a href="${landData[0].wikipedia}" target="_blank">Click Here!</a></td>
									    <td class="land-item">${landData[0].details}</td>`;


    landRow2.innerHTML = `<td class="land-item">${landData[1].status}</td>
									    <td class="land-item">${landData[1].location.name}</td>
									    <td class="land-item">${landData[1].landing_type}</td>
									    <td class="land-item">${landData[1].attempted_landings}</td>
									    <td class="land-item">${landData[1].successful_landings}</td>
									    <td class="land-item"><a href="${landData[1].wikipedia}" target="_blank">Click Here!</a></td>
									    <td class="land-item">${landData[1].details}</td>`;


    landRow3.innerHTML = `<td class="land-item">${landData[2].status}</td>
									    <td class="land-item">${landData[2].location.name}</td>
									    <td class="land-item">${landData[2].landing_type}</td>
									    <td class="land-item">${landData[2].attempted_landings}</td>
									    <td class="land-item">${landData[2].successful_landings}</td>
									    <td class="land-item"><a href="${landData[2].wikipedia}" target="_blank">Click Here!</a></td>
									    <td class="land-item">${landData[2].details}</td>`;


    landRow4.innerHTML = `<td class="land-item">${landData[3].status}</td>
									    <td class="land-item">${landData[3].location.name}</td>
									    <td class="land-item">${landData[3].landing_type}</td>
									    <td class="land-item">${landData[3].attempted_landings}</td>
									    <td class="land-item">${landData[3].successful_landings}</td>
									    <td class="land-item"><a href="${landData[3].wikipedia}" target="_blank">Click Here!</a></td>
									    <td class="land-item">${landData[3].details}</td>`;

    landRow5.innerHTML = `<td class="land-item">${landData[4].status}</td>
									    <td class="land-item">${landData[4].location.name}</td>
									    <td class="land-item">${landData[4].landing_type}</td>
									    <td class="land-item">${landData[4].attempted_landings}</td>
									    <td class="land-item">${landData[4].successful_landings}</td>
									    <td class="land-item"><a href="${landData[4].wikipedia}" target="_blank">Click Here!</a></td>
									    <td class="land-item">${landData[4].details}</td>`;


    landRow6.innerHTML = `<td class="land-item">${landData[5].status}</td>
									    <td class="land-item">${landData[5].location.name}</td>
									    <td class="land-item">${landData[5].landing_type}</td>
									    <td class="land-item">${landData[5].attempted_landings}</td>
									    <td class="land-item">${landData[5].successful_landings}</td>
									    <td class="land-item"><a href="${landData[5].wikipedia}" target="_blank">Click Here!</a></td>
									    <td class="land-item">${landData[5].details}</td>`;


    landRow7.innerHTML = `<td class="land-item">${landData[6].status}</td>
									    <td class="land-item">${landData[6].location.name}</td>
									    <td class="land-item">${landData[6].landing_type}</td>
									    <td class="land-item">${landData[6].attempted_landings}</td>
									    <td class="land-item">${landData[6].successful_landings}</td>
									    <td class="land-item"><a href="${landData[6].wikipedia}" target="_blank">Click Here!</a></td>
                                        <td class="land-item">${landData[6].details}</td>`;

}



