/**
 * @fileoverview JS file with all functions called on the Rockets page,
 * @author Tom Jones <tom@wilson-express.co.uk>
 */

/** Call fetchRockets() function from axios.js */
fetchRockets();

/**
 * This function uses the forEach method to loop through the object obtained
 * from the Rockets endpoint and create a card for each different rocket. 
 */
function createRocketCards() {
  rockets.forEach(item => {

    /** removes loader */
    $("#loader").addClass("hide-loader");

    /** create elements */
    let info = document.createElement("div"),
      cardHead = document.createElement("div"),
      cardBody = document.createElement("div"),
      row = document.createElement("div"),
      column1 = document.createElement("div"),
      column2 = document.createElement("div");

    /** Set Attributes on elements just created */
    info.setAttribute("class", "card");
    cardHead.setAttribute("class", "card-header");
    cardBody.setAttribute("class", "card-body");
    row.setAttribute("class", "row");
    column1.setAttribute("class", "col-md-6");
    column2.setAttribute("class", "col-md-6 text-center");

    /** Append all elements created */
    MAINCONTENT.appendChild(info);
    info.appendChild(cardHead);
    info.appendChild(cardBody);
    cardBody.appendChild(row);
    row.appendChild(column1);
    row.appendChild(column2);

    /** once all cards are created call function to add data */
    eachRocketData(item, cardHead, column1, column2);
  });
}

/**
 * This function takes the data obtained from the Rockets endpoint,
 * then displays the data in an individual div for each rocket
 * @param {object} item Data from the Rockets endpoint passed from createRocketCards()
 * @param {HTMLElement} cardHead Passed from createRocketCards() and used to display the name of the rockets
 * @param {HTMLElement} column1 Passed from createRocketCards() and used as a container for the rocket information
 * @param {HTMLElement} column2 Passed from createRocketCards() and used as a container for the rocket image
 */
function eachRocketData(item, cardHead, column1, column2) {

  /** create elements */
  let cardInfo1 = document.createElement("h5"),
    cardInfo2 = document.createElement("p"),
    linkRow = document.createElement("div"),
    linkCol1 = document.createElement("div"),
    wiki = document.createElement("a"),
    button = document.createElement("button"),
    image = document.createElement("img");

  /** Set Attributes on elements just created */
  cardInfo1.setAttribute("class", "card-title");
  cardInfo2.setAttribute("class", "card-text");
  linkRow.setAttribute("class", "row text-center rocket-dragon-links");
  linkCol1.setAttribute("class", "col-6");
  wiki.setAttribute("href", item.wikipedia);
  wiki.setAttribute("target", "_blank");
  wiki.setAttribute("class", "hvr-pulse-grow");
  wiki.setAttribute("aria-label", "Wikipedia Link");
  button.setAttribute(`onclick`, `getValue("rocket", value)`);
  button.setAttribute("value", `rockets/${item.rocket_id}`);
  button.setAttribute("class", "more btn btn-primary");
  button.setAttribute("aria-label", "More Button");
  image.setAttribute("class", "rocket-image");
  image.setAttribute("src", item.flickr_images[0]);
  image.setAttribute("alt", "rocket-image");
  image.setAttribute("onerror", "imgError(this);");

  /** clone any duplicate elements */
  let linkCol2 = linkCol1.cloneNode(false);

  /** Append all elements created */
  column1.appendChild(cardInfo1);
  column1.appendChild(cardInfo2);
  column1.appendChild(linkRow);
  linkRow.appendChild(linkCol1);
  linkRow.appendChild(linkCol2);
  linkCol1.appendChild(wiki);
  linkCol2.appendChild(button);
  column2.appendChild(image);

  /** Set inner text / HTML of elements */
  cardHead.innerHTML = `<h3>${item.rocket_name}</h3>`;
  cardInfo1.innerText = `ID: ${item.id} - Active: ${item.active}`;
  cardInfo2.innerText = item.description;
  wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;
  button.innerHTML = `More about the ${item.rocket_name} <i class="fas fa-space-shuttle"></i>`;
}

/**
 * This function is called within fetchSpecificRocket(value) function, 
 * it is called when the more buttons are selected the getValue() function changes the value parameter.
 * This function only creates the cards used to display the data.
 */
function rocketSpecCard() {

  /** using the history API I add a new url to the history of the browser */
  window.history.pushState('', null, specificRocket.rocket_id + ".html");
  /** when the back button is pressed the page reloads to refresh to the original state */
  $(window).on('popstate', function () {

    location.reload(true);
  });

  /** removes loader */
  $("#loader").addClass("hide-loader");

  /** create elements */
  let aboutRocket = document.createElement("div"),
    row = document.createElement("div"),
    column1 = document.createElement("div"),
    column2 = document.createElement("div"),
    card = document.createElement("div"),
    cardHeader = document.createElement("div"),
    cardBody = document.createElement("div"),
    photos = document.createElement("div");

  /** Set Attributes on elements just created */
  aboutRocket.className = "about-rockets";
  row.className = "row no-gutters";
  column1.className = "col-md-7";
  column2.className = "col-md-5"; 
  column2.setAttribute("id", "rocketstats");
  card.className = "card";
  cardHeader.className = "card-header";
  cardBody.className = "card-body";
  photos.setAttribute("id", "photos");

  /** Clone all duplicate elements */
  let card2 = card.cloneNode(false),
    card3 = card.cloneNode(false),
    cardHeader2 = cardHeader.cloneNode(false),
    cardHeader3 = cardHeader.cloneNode(false),
    cardBody2 = cardBody.cloneNode(false),
    cardBody3 = cardBody.cloneNode(false);

  /** set the main page title before appending the main content */
  MAINCONTENT.innerHTML = `<h1 class="title">${specificRocket.rocket_name}</h1>`;

  /** Append some of the elements created */
  MAINCONTENT.appendChild(aboutRocket);
  aboutRocket.appendChild(row);
  row.appendChild(column1);
  row.appendChild(column2);

  /** select element just appended to be used to appended more elements  */
  let rocketStats = document.getElementById("rocketstats");

  /** Appened the rest of the elements */
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

  /** call all the functions to display data on the page once cards are created */
  rocketInfo(cardHeader, cardBody);
  rocketCarousel(cardHeader2, cardBody2);
  rocketStatistics(cardHeader3, cardBody3);
}

/**
 * This function add rocket information to the first card.
 * @param {HTMLElements} cardHeader passed from rocketSpecCard() and used to display the name of the rocket.
 * @param {HTMLElements} cardBody passed from rocketSpecCard() and used to display the data.
 */
function rocketInfo(cardHeader, cardBody) {

  /** create elements */
  let cardText = document.createElement("p"),
    active = document.createElement("h6"),
    flight = document.createElement("h6"),
    costPer = document.createElement("h6"),
    cost = accounting.formatMoney(specificRocket.cost_per_launch),
    wiki = document.createElement("a");

  /** Set Attributes on elements just created */
  cardText.className = "card-text";
  wiki.setAttribute("href", specificRocket.wikipedia);
  wiki.setAttribute("target", "_blank");
  wiki.setAttribute("class", "rocket-dragon-links hvr-pulse-grow");

  /** Append the rest of the elements */
  cardBody.appendChild(cardText);
  cardBody.appendChild(active);
  cardBody.appendChild(flight);
  cardBody.appendChild(costPer);
  cardBody.appendChild(wiki);

  /** Set inner text / HTML of elements */
  cardHeader.innerHTML = `<h4>About</h4>`;
  cardText.innerHTML = `<p class="card-text">${specificRocket.description}</p>`;
  active.innerText = `Active: ${specificRocket.active}`;
  flight.innerText = `First Flight: ${specificRocket.first_flight}`;
  costPer.innerText = `Cost Per Launch: ${cost}`;
  wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;
}

/**
 * This function creates the carousel to house the images.
 * @param {HTMLElement} cardHeader2 passed from rocketSpecCard() and used to add a title to the card.
 * @param {HTMLElement} cardBody2 passed from rocketSpecCard() and used to house the carousel.
 */
function rocketCarousel(cardHeader2, cardBody2) {

  /** create elements */
  let carousel = document.createElement("div"),
    flickr = document.createElement("div"),
    prev = document.createElement("a"),
    next = document.createElement("a");

  /** Set Attributes on elements just created */
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

  /** Set Card Header */
  cardHeader2.innerHTML = `<h4>Photos</h4>`;

  /** append indicators to card and carousel */
  cardBody2.appendChild(carousel);
  carousel.innerHTML = `<ol id="data-slide" class="carousel-indicators"></ol>`;

  /** append all the other elements */
  carousel.appendChild(flickr);
  flickr.appendChild(prev);
  flickr.appendChild(next);

  /** adds previous and next buttons to carousel */
  prev.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>`;
  next.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
                           <span class="sr-only">Next</span>`;
}

/**
 * This function uses the forEach method 
 * it loops through all the images on a specific rockets endpoint.
 */
function rocketImages() {
  specificRocket.flickr_images.forEach(item => {

    /** Create Elements */
    let imgIndex = specificRocket.flickr_images.indexOf(item),
      flickrImages = document.getElementById("flickr-images"),
      indicators = document.getElementById("data-slide"),
      images = document.createElement("div"),
      slide = document.createElement("li");

    /** Set Attributes on elements just created */
    images.setAttribute("class", "carousel-item");
    slide.setAttribute("data-slide-to", imgIndex);
    slide.setAttribute("data-target", "#carouselExampleIndicators");

    /** Append elements created */
    flickrImages.appendChild(images);
    indicators.appendChild(slide);

    /** set inner HTML of elements */
    images.innerHTML = `<img src="${item}" class="d-block w-100" alt="Space X Rocket" onerror="imgError(this);"/>`;

    /** Grab the 15th div and 7th li and set attributes of specific elements */
    let activeItem = document.getElementsByTagName("div").item(15),
        activePhoto = document.getElementsByTagName("li").item(7);

    activeItem.setAttribute("class", "carousel-item active");
    activePhoto.setAttribute("class", "active");

  });

}

/**
 * This function displays all the statistics of the specific rocket.
 * @param {HTMLElement} cardHeader3 passed from rocketSpecCard() and used to add a title to the card.
 * @param {HTMLElement} cardBody3 passed from rocketSpecCard() and used to contain all the data for the rocket.
 */
function rocketStatistics(cardHeader3, cardBody3) {

  /** Create Elements */
  let statsList = document.createElement("ul"),
    listGroupItem1 = document.createElement("li"),
    listItem1 = document.createElement("li"),
    subList1 = document.createElement("ul");

  /** Set attributes to elements creates */
  statsList.className = "list-group list-group-flush";
  listGroupItem1.className = "list-group-item";
  listItem1.className = "list-item";

  /** Clone any Duplicate Elements */
  let listGroupItem2 = listGroupItem1.cloneNode(false),
    listGroupItem3 = listGroupItem1.cloneNode(false),
    listGroupItem4 = listGroupItem1.cloneNode(false),
    listGroupItem5 = listGroupItem1.cloneNode(false),
    listGroupItem6 = listGroupItem1.cloneNode(false),
    listGroupItem7 = listGroupItem1.cloneNode(false),
    listGroupItem8 = listGroupItem1.cloneNode(false),
    listGroupItem9 = listGroupItem1.cloneNode(false),
    listGroupItem10 = listGroupItem1.cloneNode(false),
    listItem2 = listItem1.cloneNode(false),
    listItem3 = listItem1.cloneNode(false),
    listItem4 = listItem1.cloneNode(false),
    listItem5 = listItem1.cloneNode(false),
    listItem6 = listItem1.cloneNode(false),
    listItem7 = listItem1.cloneNode(false),
    listItem8 = listItem1.cloneNode(false),
    listItem9 = listItem1.cloneNode(false),
    listItem10 = listItem1.cloneNode(false),
    listItem11 = listItem1.cloneNode(false),
    listItem12 = listItem1.cloneNode(false),
    listItem13 = listItem1.cloneNode(false),
    listItem14 = listItem1.cloneNode(false),
    listItem15 = listItem1.cloneNode(false),
    listItem16 = listItem1.cloneNode(false),
    listItem17 = listItem1.cloneNode(false),
    subList2 = subList1.cloneNode(false),
    subList3 = subList1.cloneNode(false),
    subList4 = subList1.cloneNode(false);

  /** Append first set of elements / list group items */
  cardBody3.appendChild(statsList);
  statsList.appendChild(listGroupItem1);
  statsList.appendChild(listGroupItem2);
  statsList.appendChild(listGroupItem3);
  statsList.appendChild(listGroupItem4);
  statsList.appendChild(listGroupItem5);
  statsList.appendChild(listGroupItem6);
  statsList.appendChild(listGroupItem7);
  statsList.appendChild(listGroupItem8);

  /** set card header */
  cardHeader3.innerHTML = `<h4>Statistics</h4>`;

  /** Set inner text / HTML of list group items */
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

  /** append first sublist and set of list items */
  listGroupItem8.appendChild(subList1);
  subList1.appendChild(listItem1);
  subList1.appendChild(listItem2);
  subList1.appendChild(listItem3);
  subList1.appendChild(listItem4);
  subList1.appendChild(listItem5);
  subList1.appendChild(listItem6);

  /** Set inner text / HTML of list items */
  listItem1.innerText = `Type: ${specificRocket.engines.type}`;
  listItem2.innerText = `No. of Engines: ${specificRocket.engines.number}`;
  listItem3.innerText = `Engine Version: ${specificRocket.engines.version}`;
  listItem4.innerText = `Layout: ${specificRocket.engines.layout}`;
  listItem5.innerText = "Propellants:";

  /** Append second sublist and set of list items */
  listItem5.appendChild(subList2);
  subList2.appendChild(listItem6);
  subList2.appendChild(listItem7);

  /** Set inner text / HTML of list items */
  listItem6.innerText = `1: ${specificRocket.engines.propellant_1}`;
  listItem7.innerText = `2: ${specificRocket.engines.propellant_2}`;

  /** Append 2nd set of list items to 1st sublist */
  subList1.appendChild(listItem8);
  subList1.appendChild(listItem9);

  /** Set inner text of list items */
  listItem8.innerText = `Thrust at Sea Level: ${specificRocket.engines.thrust_sea_level.kN}kN`;
  listItem9.innerText = `Thrust Vaccum: ${specificRocket.engines.thrust_vacuum.kN}kN`;

  /** Append another List group item */
  statsList.appendChild(listGroupItem9);

  /** Set inner text of list group item */
  listGroupItem9.innerText = "First Stage:";

  /** append 3rd sublist and set of list items */
  listGroupItem9.appendChild(subList3);
  subList3.appendChild(listItem10);
  subList3.appendChild(listItem11);
  subList3.appendChild(listItem12);
  subList3.appendChild(listItem13);

  /** Set inner text of list group item */
  listItem10.innerText = `No. of Engines: ${specificRocket.first_stage.engines}`;
  listItem11.innerText = `Resuable: ${specificRocket.first_stage.reusable}`;
  listItem12.innerText = `Fuel Amount: ${specificRocket.first_stage.fuel_amount_tons}t`;
  listItem13.innerText = `Burn Time: ${specificRocket.first_stage.burn_time_sec}secs`;

  /** Append final list group item */
  statsList.appendChild(listGroupItem10);

  /** Set inner text of list group item */
  listGroupItem10.innerText = "Second Stage:";

  /** Append final sublist and set of list items */
  listGroupItem10.appendChild(subList4);
  subList4.appendChild(listItem14);
  subList4.appendChild(listItem15);
  subList4.appendChild(listItem16);
  subList4.appendChild(listItem17);

  /** Set inner text of list items */
  listItem14.innerText = `No. of Engines: ${specificRocket.second_stage.engines}`;
  listItem15.innerText = `Resuable: ${specificRocket.second_stage.reusable}`;
  listItem16.innerText = `Fuel Amount: ${specificRocket.second_stage.fuel_amount_tons}t`;
  listItem17.innerText = `Burn Time: ${specificRocket.second_stage.burn_time_sec}secs`;

  /** forEach method to loop through payload_weight data and create a list item for each */
  specificRocket.payload_weights.forEach(item => {

    /** get list group item with id of payload-name and create a list  */
    let payloadName = document.getElementById("payload-name"),
      listitem = document.createElement("li");
    /** append lists */
    payloadName.appendChild(listitem);

    /** list inner HTML */
    listitem.innerText = `${item.name} - ${item.kg}kg`;
  });

}

