/**
 * @fileoverview JS file with all functions called on the Dragons page,
 * @author Tom Jones <tom@wilson-express.co.uk>
 */

/** 
 * Call callDragons() function from axios.js,
 */

fetchDragons();

// calls spacex dragons api

function createDragonCards() {

    $("#data").addClass("container");

    dragons.forEach(item => {
        $("#loader").addClass("hide-loader");

        let info = document.createElement("div");
        let cardHead = document.createElement("div");
        let cardBody = document.createElement("div");
        let row = document.createElement("div");
        let column1 = document.createElement("div");
        let column2 = document.createElement("div");

        info.setAttribute("class", "card");
        cardHead.setAttribute("class", "card-header");
        cardBody.setAttribute("class", "card-body");
        row.setAttribute("class", "row");
        column1.setAttribute("class", "col-md-6");
        column2.setAttribute("class", "col-md-6 text-center");

        MAINCONTENT.appendChild(info);
        info.appendChild(cardHead);
        info.appendChild(cardBody);
        cardBody.appendChild(row);
        row.appendChild(column1);
        row.appendChild(column2);

        cardHead.innerHTML = `<h3>${item.name}</h3>`;

        eachDragonData(item, column1, column2);
    });
}

function eachDragonData(item, column1, column2) {
    let cardInfo1 = document.createElement("h5");
    let cardInfo2 = document.createElement("h6");
    let cardInfo3 = document.createElement("h6");
    let linkRow = document.createElement("div");
    let linkCol1 = document.createElement("div");
    let linkCol2 = document.createElement("div");
    let wiki = document.createElement("a");
    let button = document.createElement("button");
    let image = document.createElement("img");

    cardInfo1.setAttribute("class", "card-title");
    cardInfo2.setAttribute("class", "card-title");
    cardInfo3.setAttribute("class", "card-text");
    linkRow.setAttribute("class", "row text-center rocket-dragon-links");
    linkCol1.setAttribute("class", "col-6");
    linkCol2.setAttribute("class", "col-6");
    wiki.setAttribute("href", item.wikipedia);
    wiki.setAttribute("class", "hvr-pulse-grow");
    wiki.setAttribute("target", "_blank");
    button.setAttribute(`onclick`, `getValue("dragon", value)`);
    button.setAttribute("value", `dragons/${item.id}`)
    button.setAttribute("class", "more btn btn-primary");
    image.setAttribute("class", "rocket-image");
    image.setAttribute("src", item.flickr_images[2]);
    image.setAttribute("alt", "dragon-image");
    image.setAttribute("onerror", "imgError(this);");

    column1.appendChild(cardInfo1);
    column1.appendChild(cardInfo2);
    column1.appendChild(cardInfo3);
    column1.appendChild(linkRow);
    linkRow.appendChild(linkCol1);
    linkRow.appendChild(linkCol2);
    linkCol1.appendChild(wiki);
    linkCol2.appendChild(button);
    column2.appendChild(image);

    cardInfo1.innerText = `Type: ${item.type} - Active: ${item.active}`;
    cardInfo2.innerText = `First Flight: ${item.first_flight}`;
    cardInfo3.innerText = item.description;
    wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;
    button.innerHTML = `More about the ${item.name} <i class="fas fa-space-shuttle"></i>`;

    

}

function dragonSpecCard() {

    window.history.pushState('', null, specificDragon.id + ".html");
    $(window).on('popstate', function () {
        location.reload(true);
    });

    $("#loader").addClass("hide-loader");

    let aboutDragon = document.createElement("div");
    let row = document.createElement("div");
    let column1 = document.createElement("div");
    let column2 = document.createElement("div");
    let card = document.createElement("div");
    let cardHeader = document.createElement("div");
    let cardBody = document.createElement("div");
    let photos = document.createElement("div");

    aboutDragon.className = "about-rockets";
    row.className = "row no-gutters";
    column1.className = "col-md-7";
    column2.className = "col-md-5";
    column2.setAttribute("id", "dragonstats");
    card.className = "card";
    cardHeader.className = "card-header";
    cardBody.className = "card-body";
    photos.setAttribute("id", "photos");

    let card2 = card.cloneNode(false);
    let card3 = card.cloneNode(false);
    let cardHeader2 = cardHeader.cloneNode(false);
    let cardHeader3 = cardHeader.cloneNode(false);
    let cardBody2 = cardBody.cloneNode(false);
    let cardBody3 = cardBody.cloneNode(false);

    MAINCONTENT.innerHTML = `<h1 class="title">${specificDragon.name}</h1>`;

    MAINCONTENT.appendChild(aboutDragon);
    aboutDragon.appendChild(row);
    row.appendChild(column1);
    row.appendChild(column2);

    let dragonStats = document.getElementById("dragonstats");

    column1.appendChild(card);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    column1.appendChild(photos);
    photos.appendChild(card2);
    card2.appendChild(cardHeader2);
    card2.appendChild(cardBody2);
    dragonStats.appendChild(card3);
    card3.appendChild(cardHeader3);
    card3.appendChild(cardBody3);

    cardHeader.innerHTML = `<h4>About</h4>`;
    cardHeader2.innerHTML = `<h4>Photos</h4>`;
    cardHeader3.innerHTML = `<h4>Statistics</h4>`;

    dragonInfo(cardBody);
    dragonCarousel(cardBody2);
    dragonStatistics(cardBody3);
}

function dragonInfo(cardBody) {
    let cardText = document.createElement("p");
    let active = document.createElement("h6");
    let type = document.createElement("h6");
    let crewCapacity = document.createElement("h6");
    let orbit = document.createElement("h6");
    let wiki = document.createElement("a");

    cardText.className = "card-text";
    wiki.setAttribute("href", specificDragon.wikipedia);
    wiki.setAttribute("target", "_blank");
    wiki.setAttribute("class", "rocket-dragon-links hvr-pulse-grow");

    cardBody.appendChild(cardText);
    cardBody.appendChild(active);
    cardBody.appendChild(type);
    cardBody.appendChild(crewCapacity);
    cardBody.appendChild(orbit);
    cardBody.appendChild(wiki);

    cardText.innerHTML = `<p class="card-text">${specificDragon.description}</p>`;
    active.innerText = `Active: ${specificDragon.active}`;
    type.innerText = `Type: ${specificDragon.type}`;
    crewCapacity.innerText = `Crew Capacity: ${specificDragon.crew_capacity}`;
    orbit.innerText = `Orbit Duration: ${specificDragon.orbit_duration_yr} Yrs`;
    wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;
}

function dragonCarousel(cardBody2) {
    let carousel = document.createElement("div");
    let flickr = document.createElement("div");
    let prev = document.createElement("a");
    let next = document.createElement("a");

    carousel.setAttribute("id", "carouselExampleIndicators");
    carousel.className = "carousel slide";
    carousel.setAttribute("data-ride", "carousel");
    flickr.setAttribute("id", "flickr-images");
    flickr.className = "carousel-inner";
    prev.className = "carousel-control-prev";
    prev.setAttribute("href", "#carouselExampleIndicators");
    prev.setAttribute("role", "button");
    prev.setAttribute("data-slide", "prev");
    next.className = "carousel-control-next";
    next.setAttribute("href", "#carouselExampleIndicators");
    next.setAttribute("role", "button");
    next.setAttribute("data-slide", "next");

    cardBody2.appendChild(carousel);
    carousel.innerHTML = `<ol id="data-slide" class="carousel-indicators"></ol>`;

    carousel.appendChild(flickr);

    flickr.appendChild(prev);
    prev.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>`
    flickr.appendChild(next);
    next.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
                           <span class="sr-only">Next</span>`;
}

function dragonImages() {
    specificDragon.flickr_images.forEach(item => {

        let imgIndex = specificDragon.flickr_images.indexOf(item);
        let flickrImages = document.getElementById("flickr-images");
        let indicators = document.getElementById("data-slide");
        let images = document.createElement("div");
        let slide = document.createElement("li");

        images.setAttribute("class", "carousel-item");
        slide.setAttribute("data-slide-to", imgIndex);
        slide.setAttribute("data-target", "#carouselExampleIndicators");

        flickrImages.appendChild(images);
        indicators.appendChild(slide);

        images.innerHTML = `<img src="${item}" class="d-block w-100" alt="..." onerror="imgError(this);"/>`;

        let activeItem = document.getElementsByTagName("div").item(15);
        activeItem.setAttribute("class", "carousel-item active");

        let activePhoto = document.getElementsByTagName("li").item(7);
        activePhoto.setAttribute("class", "active");
    });
}

function dragonStatistics(cardBody3) {
    let statsList = document.createElement("ul");
    let listGroupItem1 = document.createElement("li");
    let listItem1 = document.createElement("li");
    let subList1 = document.createElement("ul");
    let subList2 = document.createElement("ul");
    let subList3 = document.createElement("ul");

    statsList.className = "list-group list-group-flush";
    listGroupItem1.className = "list-group-item";
    listItem1.className = "list-item";

    let listGroupItem2 = listGroupItem1.cloneNode(false);
    let listGroupItem3 = listGroupItem1.cloneNode(false);
    let listGroupItem4 = listGroupItem1.cloneNode(false);
    let listGroupItem5 = listGroupItem1.cloneNode(false);
    let listGroupItem6 = listGroupItem1.cloneNode(false);
    let listGroupItem7 = listGroupItem1.cloneNode(false);
    let listGroupItem8 = listGroupItem1.cloneNode(false);
    let listGroupItem9 = listGroupItem1.cloneNode(false);
    let listGroupItem10 = listGroupItem1.cloneNode(false);
    let listGroupItem11 = listGroupItem1.cloneNode(false);
    let listItem2 = listItem1.cloneNode(false);
    let listItem3 = listItem1.cloneNode(false);
    let listItem4 = listItem1.cloneNode(false);
    let listItem5 = listItem1.cloneNode(false);
    let listItem6 = listItem1.cloneNode(false);
    let listItem7 = listItem1.cloneNode(false);
    let listItem8 = listItem1.cloneNode(false);

    cardBody3.appendChild(statsList);
    statsList.appendChild(listGroupItem1);
    statsList.appendChild(listGroupItem2);
    statsList.appendChild(listGroupItem3);
    statsList.appendChild(listGroupItem4);
    statsList.appendChild(listGroupItem5);

    listGroupItem1.innerText = `Diameter: ${specificDragon.diameter.meters}m`;
    listGroupItem2.innerText = `Height With Trunk: ${specificDragon.height_w_trunk.meters}m`;
    listGroupItem3.innerHTML = `Trunk Volume: ${specificDragon.trunk.trunk_volume.cubic_meters}&#x33a5;`;
    listGroupItem4.innerText = `Dry Mass: ${specificDragon.dry_mass_kg}kg`;
    listGroupItem5.innerText = "Launch Payload:"

    listGroupItem5.appendChild(subList1);
    subList1.appendChild(listItem1);
    subList1.appendChild(listItem2);

    listItem1.innerText = `Mass: ${specificDragon.launch_payload_mass.kg}kg`;
    listItem2.innerHTML = `Volume: ${specificDragon.launch_payload_vol.cubic_meters} &#x33a5;`;

    statsList.appendChild(listGroupItem6);

    listGroupItem6.innerText = "Return Payload:";

    listGroupItem6.appendChild(subList2);
    subList2.appendChild(listItem3);
    subList2.appendChild(listItem4);

    listItem3.innerText = `Mass: ${specificDragon.return_payload_mass.kg}kg`;
    listItem4.innerHTML = `Volume: ${specificDragon.return_payload_vol.cubic_meters} &#x33a5;`;

    statsList.appendChild(listGroupItem7);
    statsList.appendChild(listGroupItem8);
    statsList.appendChild(listGroupItem9);
    statsList.appendChild(listGroupItem10);

    listGroupItem7.innerHTML = `Pressurized Capsule Payload Volume: ${specificDragon.pressurized_capsule.payload_volume.cubic_meters} &#x33a5;`;
    listGroupItem8.innerText = `Solar Arrays: ${specificDragon.trunk.cargo.solar_array}`;
    listGroupItem9.innerHTML = `Sidewall Angle: ${specificDragon.sidewall_angle_deg}&deg;`;
    listGroupItem10.innerText = "Heat Shield:";

    listGroupItem10.appendChild(subList3);
    subList3.appendChild(listItem5);
    subList3.appendChild(listItem6);
    subList3.appendChild(listItem7);
    subList3.appendChild(listItem8);

    listItem5.innerText = `Development Partner: ${specificDragon.heat_shield.dev_partner}`;
    listItem6.innerText = `Material: ${specificDragon.heat_shield.material}`;
    listItem7.innerText = `Size: ${specificDragon.heat_shield.size_meters}m`;
    listItem8.innerHTML = `Temperature: ${specificDragon.heat_shield.temp_degrees}&deg;`;

    statsList.appendChild(listGroupItem11);

    listGroupItem11.innerHTML = `<li id="thrusters" class="list-group-item">Thrusters:</li>`;

    specificDragon.thrusters.forEach(item => {

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

}


function imgError(img) {
    img.onerror = "";
    img.src = "assets/images/image-unavailable.jpg";
    return;
}



