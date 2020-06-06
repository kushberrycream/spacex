const rocketData = document.getElementById("data");

callRockets();

// calls spacex rocket api - all rockets

function eachRocket() {

    $("#data").addClass("container");

    rockets.forEach(item => {
        $("#loader").addClass("hide-loader");

        let info = document.createElement("div");
        let cardHead = document.createElement("div");
        let cardBody = document.createElement("div");
        let row = document.createElement("div");
        let column1 = document.createElement("div");
        let column2 = document.createElement("div");
        let cardInfo1 = document.createElement("h5");
        let cardInfo2 = document.createElement("p");
        let wiki = document.createElement("a");
        let button = document.createElement("button");
        let image = document.createElement("img");

        info.setAttribute("class", "card");
        cardHead.setAttribute("class", "card-header");
        cardBody.setAttribute("class", "card-body");
        row.setAttribute("class", "row");
        column1.setAttribute("class", "col-md-6");
        column2.setAttribute("class", "col-md-6 text-center");
        cardInfo1.setAttribute("class", "card-title");
        cardInfo2.setAttribute("class", "card-text");
        wiki.setAttribute("href", item.wikipedia);
        wiki.setAttribute("target", "_blank");
        button.setAttribute("onclick", "getValue(value)");
        button.setAttribute("value", `rockets/${item.rocket_id}`)
        button.setAttribute("class", "more btn btn-primary");
        image.setAttribute("class", "rocket-image");
        image.setAttribute("src", item.flickr_images[0]);
        image.setAttribute("alt", "rocket-image");
        image.setAttribute("onerror", "this.onerror=404;this.src='https://hips.hearstapps.com/pop.h-cdn.co/assets/17/30/1501012342-pmx090117-falconheavy01.jpg?crop=1.00xw:0.492xh;0,0.209xh&resize=480:*';")

        rocketData.appendChild(info);
        info.appendChild(cardHead);
        info.appendChild(cardBody);
        cardBody.appendChild(row);
        row.appendChild(column1);
        row.appendChild(column2);
        column1.appendChild(cardInfo1);
        column1.appendChild(cardInfo2);
        column1.appendChild(wiki);
        column1.appendChild(button);
        column2.appendChild(image);


        cardHead.innerHTML = `<h3>${item.rocket_name}</h3>`;
        cardInfo1.innerText = `ID: ${item.id} - Active: ${item.active}`;
        cardInfo2.innerText = item.description;
        wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;
        button.innerText = "More";

        if (item.flickr_images == 404) {
            item.flickr_images = "https://cdn.vox-cdn.com/thumbor/Euf4nr4d-QV5Y8VItx5EfuemW8k=/0x0:640x426/1200x800/filters:focal(285x131:387x233)/cdn.vox-cdn.com/uploads/chorus_image/image/59678097/31463407_209037936363460_7225796096243531776_n.0.jpg"
        }
    });


}

// calls a specific spacex rocket api url

function rocketSpec() {

    $("#loader").addClass("hide-loader");

    let aboutRocket = document.createElement("div");
    let row = document.createElement("div");
    let column1 = document.createElement("div");
    let column2 = document.createElement("div");
    let card = document.createElement("div");
    let card2 = document.createElement("div");
    let cardHeader = document.createElement("div");
    let cardHeader2 = document.createElement("div");
    let cardBody = document.createElement("div");
    let cardBody2 = document.createElement("div");
    let cardText = document.createElement("p");
    let active = document.createElement("h6");
    let flight = document.createElement("h6");
    let costPer = document.createElement("h6");
    let cost = accounting.formatMoney(specificRocket.cost_per_launch);
    let wiki = document.createElement("a");
    let photos = document.createElement("div");
    let carousel = document.createElement("div");
    let flickr = document.createElement("div");
    let prev = document.createElement("a");
    let next = document.createElement("a");

    aboutRocket.setAttribute("class", "about-rockets");
    row.setAttribute("class", "row no-gutters");
    column1.setAttribute("class", "col-md-7");
    column2.setAttribute("class", "col-md-5");
    column2.setAttribute("id", "rocketstats");
    card.setAttribute("class", "card");
    card2.setAttribute("class", "card")
    cardHeader.setAttribute("class", "card-header");
    cardHeader2.setAttribute("class", "card-header");
    cardBody.setAttribute("class", "card-body");
    cardBody2.setAttribute("class", "card-body");
    cardText.setAttribute("class", "card-text");
    wiki.setAttribute("href", specificRocket.wikipedia);
    wiki.setAttribute("target", "_blank");
    photos.setAttribute("id", "photos");
    carousel.setAttribute("id", "carouselExampleIndicators");
    carousel.setAttribute("class", "carousel slide");
    carousel.setAttribute("data-ride", "carousel");
    flickr.setAttribute("id", "flickr-images");
    flickr.setAttribute("class", "carousel-inner");
    prev.setAttribute("class", "carousel-control-prev");
    prev.setAttribute("href", "#carouselExampleIndicators");
    prev.setAttribute("role", "button");
    prev.setAttribute("data-slide", "prev");
    next.setAttribute("class", "carousel-control-next");
    next.setAttribute("href", "#carouselExampleIndicators");
    next.setAttribute("role", "button");
    next.setAttribute("data-slide", "next");

    rocketData.innerHTML = `<h1 class="title">${specificRocket.rocket_name}</h1>`;

    rocketData.appendChild(aboutRocket);
    aboutRocket.appendChild(row);
    row.appendChild(column1);
    row.appendChild(column2);
    column1.appendChild(card);
    card.appendChild(cardHeader);
    cardHeader.innerHTML = `<h4>About</h4>`;

    card.appendChild(cardBody);
    cardBody.appendChild(cardText);
    cardText.innerHTML = `<p class="card-text">${specificRocket.description}</p>`;

    cardBody.appendChild(active);
    active.innerText = `Active: ${specificRocket.active}`;

    cardBody.appendChild(flight);
    flight.innerText = `First Flight: ${specificRocket.first_flight}`;

    cardBody.appendChild(costPer);
    costPer.innerText = `Cost Per Launch: ${cost}`;

    cardBody.appendChild(wiki);
    wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;

    column1.appendChild(photos);
    photos.appendChild(card2);
    card2.appendChild(cardHeader2);
    cardHeader2.innerHTML = `<h4>Photos</h4>`;

    card2.appendChild(cardBody2);
    cardBody2.appendChild(carousel);
    carousel.innerHTML = `<ol id="data-slide" class="carousel-indicators"></ol>`;

    carousel.appendChild(flickr);

    flickr.appendChild(prev);
    prev.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>`
    flickr.appendChild(next);
    next.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
                           <span class="sr-only">Next</span>`;


    specificRocket.flickr_images.forEach(item => {

        let a = specificRocket.flickr_images.indexOf(item);
        let flickrImages = document.getElementById("flickr-images");
        let indicators = document.getElementById("data-slide");
        let images = document.createElement("div");
        let slide = document.createElement("li");

        images.setAttribute("class", "carousel-item");
        slide.setAttribute("data-slide-to", a);
        slide.setAttribute("data-target", "#carouselExampleIndicators");

        flickrImages.appendChild(images);
        indicators.appendChild(slide);

        images.innerHTML = `<img src="${item}" class="d-block w-100" alt="...">`;

        let activeItem = document.getElementsByTagName("div").item(16);
        activeItem.setAttribute("class", "carousel-item active");

        let activePhoto = document.getElementsByTagName("li").item(7);
        activePhoto.setAttribute("class", "active");

    });
    let rocketStats = document.getElementById("rocketstats");
    let card3 = document.createElement("div");
    let cardHeader3 = document.createElement("div");
    let cardBody3 = document.createElement("div");


    card3.setAttribute("class", "card");
    cardHeader3.setAttribute("class", "card-header");
    cardBody3.setAttribute("class", "card-body");


    rocketStats.appendChild(card3);
    card3.appendChild(cardHeader3);
    cardHeader3.innerHTML = `<h4>Statistics</h4>`;

    card3.appendChild(cardBody3);
    cardBody3.innerHTML = `<ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Stages: ${specificRocket.stages}</li>
                                                    <li class="list-group-item">Boosters: ${specificRocket.boosters}</li>
                                                    <li class="list-group-item">Height: ${specificRocket.height.meters}m</li>
                                                    <li class="list-group-item">Diameter: ${specificRocket.diameter.meters}m</li>
                                                    <li class="list-group-item">Mass: ${specificRocket.mass.kg}kg</li>
                                                    <li class="list-group-item">Landing Legs: ${specificRocket.landing_legs.number}</li>
                                                    <li class="list-group-item">Payload:
                                                        <ul>
                                                            <li id="payload-name" class="list-item"></li>
                                                        </ul>
                                                    </li>
                                                    <li class="list-group-item">Engines:
                                                        <ul>
                                                            <li class="list-item">Type: ${specificRocket.engines.type}</li>
                                                            <li class="list-item">No. of Engines: ${specificRocket.engines.number}</li>
                                                            <li class="list-item">Engine Version: ${specificRocket.engines.version}</li>
                                                            <li class="list-item">Layout: ${specificRocket.engines.layout}</li>
                                                            <li class="list-item">Propellants:
                                                                <ul>
                                                                    <li class="list-item">1: ${specificRocket.engines.propellant_1}</li>
                                                                    <li class="list-item">2: ${specificRocket.engines.propellant_2}</li>
                                                                </ul>
                                                            </li>
                                                            <li class="list-item">Thrust at Sea Level: ${specificRocket.engines.thrust_sea_level.kN}kN</li>
                                                            <li class="list-item">Thrust Vaccum: ${specificRocket.engines.thrust_vacuum.kN}kN</li>
                                                        </ul>
                                                    </li>
                                                    <li class="list-group-item">First Stage:
                                                        <ul>
                                                            <li class="list-item">No. of Engines: ${specificRocket.first_stage.engines}</li>
                                                            <li class="list-item">Resuable: ${specificRocket.first_stage.reusable}</li>
                                                            <li class="list-item">Fuel Amount: ${specificRocket.first_stage.fuel_amount_tons}t</li>
                                                            <li class="list-item">Burn Time: ${specificRocket.first_stage.burn_time_sec}secs</li>
                                                        </ul>
                                                    </li>
                                                    <li class="list-group-item">Second Stage:
                                                        <ul>
                                                            <li class="list-item">No. of Engines: ${specificRocket.second_stage.engines}</li>
                                                            <li class="list-item">Resuable: ${specificRocket.second_stage.reusable}</li>
                                                            <li class="list-item">Fuel Amount: ${specificRocket.second_stage.fuel_amount_tons}t</li>
                                                            <li class="list-item">Burn Time: ${specificRocket.second_stage.burn_time_sec}secs</li>
                                                        </ul>
                                                    </li>
                                                </ul>`;
    specificRocket.payload_weights.forEach(item => {

        let payloadName = document.getElementById("payload-name");
        let listitem = document.createElement("li");
        payloadName.appendChild(listitem);

        listitem.innerHTML = `${item.name} - ${item.kg}kg`;
    });

}



