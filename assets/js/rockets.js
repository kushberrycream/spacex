callRockets();

// calls spacex rocket api - all rockets

function eachRocketCard() {

    $("#data").addClass("container");

    rockets.forEach(item => {
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

        mainContent.appendChild(info);
        info.appendChild(cardHead);
        info.appendChild(cardBody);
        cardBody.appendChild(row);
        row.appendChild(column1);
        row.appendChild(column2);

        eachRocketData(item, cardHead, column1, column2);
    });
}

function eachRocketData(item, cardHead, column1, column2) {
    let cardInfo1 = document.createElement("h5");
    let cardInfo2 = document.createElement("p");
    let wiki = document.createElement("a");
    let button = document.createElement("button");
    let image = document.createElement("img");

    cardInfo1.setAttribute("class", "card-title");
    cardInfo2.setAttribute("class", "card-text");
    wiki.setAttribute("href", item.wikipedia);
    wiki.setAttribute("target", "_blank");
    wiki.setAttribute("aria-label", "Wikipedia Link");
    button.setAttribute("onclick", "getValue(value)");
    button.setAttribute("value", `rockets/${item.rocket_id}`);
    button.setAttribute("class", "more btn btn-primary");
    button.setAttribute("aria-label", "More Button");
    image.setAttribute("class", "rocket-image");
    image.setAttribute("src", item.flickr_images[0]);
    image.setAttribute("alt", "rocket-image");
    image.setAttribute("onerror", "imgError(this);");

    column1.appendChild(cardInfo1);
    column1.appendChild(cardInfo2);
    column1.appendChild(wiki);
    column1.appendChild(button);
    column2.appendChild(image);

    cardHead.innerHTML = `<h3>${item.rocket_name}</h3>`;
    cardInfo1.innerText = `ID: ${item.id} - Active: ${item.active}`;
    cardInfo2.innerText = item.description;
    wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;
    button.innerText = `More about the ${item.rocket_name}`;
}

// calls a specific spacex rocket api url

function rocketSpecCard() {

    $("#loader").addClass("hide-loader");

    let aboutRocket = document.createElement("div");
    let row = document.createElement("div");
    let column1 = document.createElement("div");
    let column2 = document.createElement("div");
    let card = document.createElement("div");
    let cardHeader = document.createElement("div");
    let cardBody = document.createElement("div");
    let photos = document.createElement("div");

    aboutRocket.className = "about-rockets";
    row.className = "row no-gutters";
    column1.className = "col-md-7";
    column2.className = "col-md-5";
    column2.setAttribute("id", "rocketstats");
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

    mainContent.innerHTML = `<h1 class="title">${specificRocket.rocket_name}</h1>`;

    mainContent.appendChild(aboutRocket);
    aboutRocket.appendChild(row);
    row.appendChild(column1);
    row.appendChild(column2);

    let rocketStats = document.getElementById("rocketstats");

    column1.appendChild(card);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    column1.appendChild(photos);
    photos.appendChild(card2);
    card2.appendChild(cardHeader2);
    card2.appendChild(cardBody2);
    rocketStats.appendChild(card3);
    card3.appendChild(cardHeader3);
    card3.appendChild(cardBody3);

    cardHeader.innerHTML = `<h4>About</h4>`;
    cardHeader2.innerHTML = `<h4>Photos</h4>`;
    cardHeader3.innerHTML = `<h4>Statistics</h4>`;

    rocketInfo(cardBody);
    rocketCarousel(cardBody2);
    rocketStatistics(cardBody3);
}

function rocketInfo(cardBody) {

    let cardText = document.createElement("p");
    let active = document.createElement("h6");
    let flight = document.createElement("h6");
    let costPer = document.createElement("h6");
    let cost = accounting.formatMoney(specificRocket.cost_per_launch);
    let wiki = document.createElement("a");

    cardText.className = "card-text";
    wiki.setAttribute("href", specificRocket.wikipedia);
    wiki.setAttribute("target", "_blank");

    cardBody.appendChild(cardText);
    cardBody.appendChild(active);
    cardBody.appendChild(flight);
    cardBody.appendChild(costPer);
    cardBody.appendChild(wiki);

    cardText.innerHTML = `<p class="card-text">${specificRocket.description}</p>`;
    active.innerText = `Active: ${specificRocket.active}`;
    flight.innerText = `First Flight: ${specificRocket.first_flight}`;
    costPer.innerText = `Cost Per Launch: ${cost}`;
    wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;
}

function rocketCarousel(cardBody2) {
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
                            <span class="sr-only">Previous</span>`;
    flickr.appendChild(next);
    next.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
                           <span class="sr-only">Next</span>`;

}

function rocketImages() {
    specificRocket.flickr_images.forEach(item => {

        let imgIndex = specificRocket.flickr_images.indexOf(item);
        let flickrImages = document.getElementById("flickr-images");
        let indicators = document.getElementById("data-slide");
        let images = document.createElement("div");
        let slide = document.createElement("li");

        images.setAttribute("class", "carousel-item");
        slide.setAttribute("data-slide-to", imgIndex);
        slide.setAttribute("data-target", "#carouselExampleIndicators");

        flickrImages.appendChild(images);
        indicators.appendChild(slide);

        images.innerHTML = `<img src="${item}" class="d-block w-100" alt="Space X Rocket" onerror="imgError(this);"/>`;

        let activeItem = document.getElementsByTagName("div").item(16);
        activeItem.setAttribute("class", "carousel-item active");

        let activePhoto = document.getElementsByTagName("li").item(7);
        activePhoto.setAttribute("class", "active");

    });

}

function rocketStatistics(cardBody3) {
    let statsList = document.createElement("ul");
    let listGroupItem1 = document.createElement("li");
    let listItem1 = document.createElement("li");
    let subList1 = document.createElement("ul");
    let subList2 = document.createElement("ul");
    let subList3 = document.createElement("ul");
    let subList4 = document.createElement("ul");

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
    let listItem2 = listItem1.cloneNode(false);
    let listItem3 = listItem1.cloneNode(false);
    let listItem4 = listItem1.cloneNode(false);
    let listItem5 = listItem1.cloneNode(false);
    let listItem6 = listItem1.cloneNode(false);
    let listItem7 = listItem1.cloneNode(false);
    let listItem8 = listItem1.cloneNode(false);
    let listItem9 = listItem1.cloneNode(false);
    let listItem10 = listItem1.cloneNode(false);
    let listItem11 = listItem1.cloneNode(false);
    let listItem12 = listItem1.cloneNode(false);
    let listItem13 = listItem1.cloneNode(false);
    let listItem14 = listItem1.cloneNode(false);
    let listItem15 = listItem1.cloneNode(false);
    let listItem16 = listItem1.cloneNode(false);
    let listItem17 = listItem1.cloneNode(false);


    cardBody3.appendChild(statsList);
    statsList.appendChild(listGroupItem1);
    statsList.appendChild(listGroupItem2);
    statsList.appendChild(listGroupItem3);
    statsList.appendChild(listGroupItem4);
    statsList.appendChild(listGroupItem5);
    statsList.appendChild(listGroupItem6);
    statsList.appendChild(listGroupItem7);
    statsList.appendChild(listGroupItem8);

    listGroupItem1.innerText = `Stages: ${specificRocket.stages}`;
    listGroupItem2.innerText = `Boosters: ${specificRocket.boosters}`;
    listGroupItem3.innerText = `Height: ${specificRocket.height.meters}m`;
    listGroupItem4.innerText = `Diameter: ${specificRocket.diameter.meters}m`;
    listGroupItem5.innerText = `Mass: ${specificRocket.mass.kg}kg`;
    listGroupItem6.innerText = `Landing Legs: ${specificRocket.landing_legs.number}`;
    listGroupItem7.innerHTML = `Payload:
                                    <ul>
                                        <li id="payload-name" class="list-item"></li>
                                    </ul>`;
    listGroupItem8.innerText = "Engines:";

    listGroupItem8.appendChild(subList1);
    subList1.appendChild(listItem1);
    subList1.appendChild(listItem2);
    subList1.appendChild(listItem3);
    subList1.appendChild(listItem4);
    subList1.appendChild(listItem5);
    subList1.appendChild(listItem6);

    listItem1.innerText = `Type: ${specificRocket.engines.type}`;
    listItem2.innerText = `No. of Engines: ${specificRocket.engines.number}`;
    listItem3.innerText = `Engine Version: ${specificRocket.engines.version}`;
    listItem4.innerText = `Layout: ${specificRocket.engines.layout}`;
    listItem5.innerText = "Propellants:";

    listItem5.appendChild(subList2);
    subList2.appendChild(listItem6);
    subList2.appendChild(listItem7);

    listItem6.innerText = `1: ${specificRocket.engines.propellant_1}`;
    listItem7.innerText = `2: ${specificRocket.engines.propellant_2}`;

    subList1.appendChild(listItem8);
    subList1.appendChild(listItem9);

    listItem8.innerText = `Thrust at Sea Level: ${specificRocket.engines.thrust_sea_level.kN}kN`;
    listItem9.innerText = `Thrust Vaccum: ${specificRocket.engines.thrust_vacuum.kN}kN`;

    statsList.appendChild(listGroupItem9);

    listGroupItem9.innerText = "First Stage:";

    listGroupItem9.appendChild(subList3);
    subList3.appendChild(listItem10);
    subList3.appendChild(listItem11);
    subList3.appendChild(listItem12);
    subList3.appendChild(listItem13);

    listItem10.innerText = `No. of Engines: ${specificRocket.first_stage.engines}`;
    listItem11.innerText = `Resuable: ${specificRocket.first_stage.reusable}`;
    listItem12.innerText = `Fuel Amount: ${specificRocket.first_stage.fuel_amount_tons}t`;
    listItem13.innerText = `Burn Time: ${specificRocket.first_stage.burn_time_sec}secs`;

    statsList.appendChild(listGroupItem10);

    listGroupItem10.innerText = "Second Stage:";

    listGroupItem10.appendChild(subList4);
    subList4.appendChild(listItem14);
    subList4.appendChild(listItem15);
    subList4.appendChild(listItem16);
    subList4.appendChild(listItem17);

    listItem14.innerText = `No. of Engines: ${specificRocket.second_stage.engines}`;
    listItem15.innerText = `Resuable: ${specificRocket.second_stage.reusable}`;
    listItem16.innerText = `Fuel Amount: ${specificRocket.second_stage.fuel_amount_tons}t`;
    listItem17.innerText = `Burn Time: ${specificRocket.second_stage.burn_time_sec}secs`;

    specificRocket.payload_weights.forEach(item => {

        let payloadName = document.getElementById("payload-name");
        let listitem = document.createElement("li");
        payloadName.appendChild(listitem);

        listitem.innerText = `${item.name} - ${item.kg}kg`;
    });

}


function imgError(image) {
    image.onerror = "";
    image.src = "assets/images/image-unavailable.jpg";
    return;
}











