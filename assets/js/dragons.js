/**
 * @fileoverview JS file with all functions called on the Dragons page,
 * @author Tom Jones <tom@wilson-express.co.uk>
 */

/** Call fetchDragons() function from axios.js */
fetchDragons();

/**
 * This function uses the forEach method to loop through the object obtained
 * from the Dragons endpoint and create a card for each different dragon. 
 */
function createDragonCards() {
  dragons.forEach(item => {

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
    eachDragonData(item, cardHead, column1, column2);
  });
}

/**
 * This function takes the data obtained from the dragons endpoint
 * it then displays the data in an individual div for each Dragon.
 * @param {object} item Data from the dragons endpoint passed from createDragonCards()
 * @param {HTMLElement} cardHead Passed from createDragonCards() and used to display the name of the Dragons
 * @param {HTMLElement} column1 Passed from createDragonCards() and used as a container for the dragon information
 * @param {HTMLElement} column2 Passed from createDragonCards() and used as a container for the dragon image
 */
function eachDragonData(item, cardHead, column1, column2) {

  /** create elements */
  let cardInfo1 = document.createElement("h5"),
    cardInfo2 = document.createElement("h6"),
    cardInfo3 = document.createElement("h6"),
    linkRow = document.createElement("div"),
    linkCol1 = document.createElement("div"),
    linkCol2 = document.createElement("div"),
    wiki = document.createElement("a"),
    button = document.createElement("button"),
    image = document.createElement("img");

  /** Set Attributes on elements just created */
  cardInfo1.setAttribute("class", "card-title");
  cardInfo2.setAttribute("class", "card-title");
  cardInfo3.setAttribute("class", "card-text");
  linkRow.setAttribute("class", "row text-center rocket-dragon-links");
  linkCol1.setAttribute("class", "col-4");
  linkCol2.setAttribute("class", "col-8");
  wiki.setAttribute("href", item.wikipedia);
  wiki.setAttribute("class", "hvr-pulse-grow");
  wiki.setAttribute("target", "_blank");
  button.setAttribute(`onclick`, `getValue("dragon", value)`);
  button.setAttribute("value", `dragons/${item.id}`);
  button.setAttribute("class", "more btn btn-primary");
  image.setAttribute("class", "rocket-image");
  image.setAttribute("src", item.flickr_images[2]);
  image.setAttribute("alt", "dragon-image");
  image.setAttribute("onerror", "imgError(this);");
  
  /** Append all elements created */
  column1.appendChild(cardInfo1);
  column1.appendChild(cardInfo2);
  column1.appendChild(cardInfo3);
  column1.appendChild(linkRow);
  linkRow.appendChild(linkCol1);
  linkRow.appendChild(linkCol2);
  linkCol1.appendChild(wiki);
  linkCol2.appendChild(button);
  column2.appendChild(image);

  /** Set inner text / HTML of elements */
  cardHead.innerHTML = `<h3>${item.name}</h3>`;
  cardInfo1.innerText = `Type: ${item.type} - Active: ${item.active}`;
  cardInfo2.innerText = `First Flight: ${item.first_flight}`;
  cardInfo3.innerText = item.description;
  wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;
  button.innerHTML = `More about the ${item.name} <i class="fas fa-space-shuttle"></i>`;
}

/**
 * This function is called within fetchSpecificDragon(value) function, 
 * it is called when the more buttons are selected the getValue() function changes the value parameter.
 * This function only creates the cards used to display the data.
 */
function dragonSpecCard() {

  /** using the history API I add a new url to the history of the browser */
  window.history.pushState('', null, "dragons.html");
  /** when the back button is pressed the page reloads to refresh to the original state */
  $(window).on('popstate', function () {
    location.reload(true);
  });

  /** removes loader */
  $("#loader").addClass("hide-loader");
  
  /** create elements */
  let aboutDragon = document.createElement("div"),
    row = document.createElement("div"),
    column1 = document.createElement("div"),
    column2 = document.createElement("div"),
    card = document.createElement("div"),
    cardHeader = document.createElement("div"),
    cardBody = document.createElement("div"),
    photos = document.createElement("div");

  /** Set Attributes on elements just created */  
  aboutDragon.className = "about-rockets";
  row.className = "row no-gutters";
  column1.className = "col-md-7";
  column2.className = "col-md-5";
  column2.setAttribute("id", "dragonstats");
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
  MAINCONTENT.innerHTML = `<h1 class="title">${specificDragon.name}</h1>`;

  /** Append some of the elements created */
  MAINCONTENT.appendChild(aboutDragon);
  aboutDragon.appendChild(row);
  row.appendChild(column1);
  row.appendChild(column2);

  /** select element just appended to be used to appended more elements  */
  let dragonStats = document.getElementById("dragonstats");

  /** Appened the rest of the elements */
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

  
  
  /** call all the functions to display data on the page once cards are created */
  dragonInfo(cardHeader, cardBody);
  dragonCarousel(cardHeader2, cardBody2);
  dragonStatistics(cardHeader3, cardBody3);
}

/**
 * This function add the dragon information to the first card.
 * @param {HTMLElement} cardHeader this is passed from the dragonSpecCard() function and used to display Dragon name.
 * @param {HTMLElement} cardBody this is passed from the dragonSpecCard() function and used to display the dragon information.
 */
function dragonInfo(cardHeader, cardBody) {

  /** create elements */
  let cardText = document.createElement("p"),
    active = document.createElement("h6"),
    type = document.createElement("h6"),
    crewCapacity = document.createElement("h6"),
    orbit = document.createElement("h6"),
    wiki = document.createElement("a");

  /** Set Attributes on elements just created */
  cardText.className = "card-text";
  wiki.setAttribute("href", specificDragon.wikipedia);
  wiki.setAttribute("target", "_blank");
  wiki.setAttribute("class", "rocket-dragon-links hvr-pulse-grow");

  /** Append the rest of the elements */
  cardBody.appendChild(cardText);
  cardBody.appendChild(active);
  cardBody.appendChild(type);
  cardBody.appendChild(crewCapacity);
  cardBody.appendChild(orbit);
  cardBody.appendChild(wiki);

  /** Set inner text / HTML of elements */
  cardHeader.innerHTML = `<h4>About</h4>`;
  cardText.innerHTML = `<p class="card-text">${specificDragon.description}</p>`;
  active.innerText = `Active: ${specificDragon.active}`;
  type.innerText = `Type: ${specificDragon.type}`;
  crewCapacity.innerText = `Crew Capacity: ${specificDragon.crew_capacity}`;
  orbit.innerText = `Orbit Duration: ${specificDragon.orbit_duration_yr} Yrs`;
  wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;
}

/**
 * This function creates the carousel to house the images.
 * @param {HTMLElement} cardHeader2 passed from dragonSpecCard() and used to add a title to the card.
 * @param {HTMLElement} cardBody2 passed from dragonSpecCard() and used to house the carousel.
 */
function dragonCarousel(cardHeader2, cardBody2) {

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
 * it loops through all the images on a specific dragons endpoint.
 */
function dragonImages() {
  specificDragon.flickr_images.forEach(item => {

    /** Create Elements */
    let imgIndex = specificDragon.flickr_images.indexOf(item),
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
    images.innerHTML = `<img src="${item}" class="d-block w-100" alt="..." onerror="imgError(this);"/>`;

    /** Grab the 15th div and 7th li and set attributes of specific elements */
    let activeItem = document.getElementsByTagName("div").item(15),
      activePhoto = document.getElementsByTagName("li").item(7);

    activeItem.setAttribute("class", "carousel-item active");
    activePhoto.setAttribute("class", "active");
  });
}

/**
 * This function displays all the statistics of the specific dragon.
 * @param {HTMLElement} cardHeader3 passed from dragonSpecCard() and used to add a title to the card.
 * @param {HTMLElement} cardBody3 passed from dragonSpecCard() and used to contain all the data for the dragon.
 */
function dragonStatistics(cardHeader3, cardBody3) {

  /** Create Elements */
  let statsList = document.createElement("ul"),
    listGroupItem1 = document.createElement("li"),
    listItem1 = document.createElement("li"),
    subList1 = document.createElement("ul"),
    subList2 = document.createElement("ul"),
    subList3 = document.createElement("ul");

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
    listGroupItem11 = listGroupItem1.cloneNode(false),
    listItem2 = listItem1.cloneNode(false),
    listItem3 = listItem1.cloneNode(false),
    listItem4 = listItem1.cloneNode(false),
    listItem5 = listItem1.cloneNode(false),
    listItem6 = listItem1.cloneNode(false),
    listItem7 = listItem1.cloneNode(false),
    listItem8 = listItem1.cloneNode(false);

  /** Append first set of elements / list group items */
  cardBody3.appendChild(statsList);
  statsList.appendChild(listGroupItem1);
  statsList.appendChild(listGroupItem2);
  statsList.appendChild(listGroupItem3);
  statsList.appendChild(listGroupItem4);
  statsList.appendChild(listGroupItem5);

  /** set card header */
  cardHeader3.innerHTML = `<h4>Statistics</h4>`;

  /** Set inner text / HTML of list group items */
  listGroupItem1.innerText = `Diameter: ${specificDragon.diameter.meters}m`;
  listGroupItem2.innerText = `Height With Trunk: ${specificDragon.height_w_trunk.meters}m`;
  listGroupItem3.innerHTML = `Trunk Volume: ${specificDragon.trunk.trunk_volume.cubic_meters}㎥`;
  listGroupItem4.innerText = `Dry Mass: ${specificDragon.dry_mass_kg}kg`;
  listGroupItem5.innerText = "Launch Payload:";

  /** append first sublist and set of list items */
  listGroupItem5.appendChild(subList1);
  subList1.appendChild(listItem1);
  subList1.appendChild(listItem2);

  /** Set inner text / HTML of list items */
  listItem1.innerText = `Mass: ${specificDragon.launch_payload_mass.kg}kg`;
  listItem2.innerHTML = `Volume: ${specificDragon.launch_payload_vol.cubic_meters} ㎥`;

  /** append next List Group item */
  statsList.appendChild(listGroupItem6);

  /** Set inner text of list group item */
  listGroupItem6.innerText = "Return Payload:";

  /** Append second sublist and set of list items */
  listGroupItem6.appendChild(subList2);
  subList2.appendChild(listItem3);
  subList2.appendChild(listItem4);

  /** Set inner text / HTML of list items */
  listItem3.innerText = `Mass: ${specificDragon.return_payload_mass.kg}kg`;
  listItem4.innerHTML = `Volume: ${specificDragon.return_payload_vol.cubic_meters} ㎥`;

  /** append next set of list group items */
  statsList.appendChild(listGroupItem7);
  statsList.appendChild(listGroupItem8);
  statsList.appendChild(listGroupItem9);
  statsList.appendChild(listGroupItem10);

  /** Set inner text of list group items */
  listGroupItem7.innerHTML = `Pressurized Capsule Payload Volume: ${specificDragon.pressurized_capsule.payload_volume.cubic_meters} ㎥`;
  listGroupItem8.innerText = `Solar Arrays: ${specificDragon.trunk.cargo.solar_array}`;
  listGroupItem9.innerHTML = `Sidewall Angle: ${specificDragon.sidewall_angle_deg}°`;
  listGroupItem10.innerText = "Heat Shield:";

  /** appened 3rd sublist and set of list items */
  listGroupItem10.appendChild(subList3);
  subList3.appendChild(listItem5);
  subList3.appendChild(listItem6);
  subList3.appendChild(listItem7);
  subList3.appendChild(listItem8);

  /** Set inner text of list items */
  listItem5.innerText = `Development Partner: ${specificDragon.heat_shield.dev_partner}`;
  listItem6.innerText = `Material: ${specificDragon.heat_shield.material}`;
  listItem7.innerText = `Size: ${specificDragon.heat_shield.size_meters}m`;
  listItem8.innerHTML = `Temperature: ${specificDragon.heat_shield.temp_degrees}°`;

  /** Append final list group item */
  statsList.appendChild(listGroupItem11);

  /** Set inner text of list group item */
  listGroupItem11.innerHTML = `<li id="thrusters" class="list-group-item">Thrusters:</li>`;

  /** forEach method to loop through thrusters data and create a set of list item for each */
  specificDragon.thrusters.forEach(item => {

    /** get list group item with id of thrusters and create a list  */
    let payloadName = document.getElementById("thrusters"),
      unorderedList1 = document.createElement("ul"),
      listItem1 = document.createElement("li");

    listItem1.setAttribute("class", "list-item");

    let unorderedList2 = unorderedList1.cloneNode(false),
      unorderedList3 = unorderedList1.cloneNode(false),
      listItem2 = listItem1.cloneNode(false),
      listItem3 = listItem1.cloneNode(false),
      listItem4 = listItem1.cloneNode(false),
      listItem5 = listItem1.cloneNode(false),
      listItem6 = listItem1.cloneNode(false);
    listItem7 = listItem1.cloneNode(false);

    /** append 1st unordered list and list-item */
    payloadName.appendChild(unorderedList1);
    unorderedList1.appendChild(listItem1);

    /** list item 1 inner text */
    listItem1.innerText = `${item.type}:`;

    /** append 2nd unordered list and set of list-items */
    listItem1.appendChild(unorderedList2);
    unorderedList2.appendChild(listItem2);
    unorderedList2.appendChild(listItem3);
    unorderedList2.appendChild(listItem4);
    unorderedList2.appendChild(listItem5);

    /** 2nd set of list items inner text */
    listItem2.innerText = `${item.thrust.kN}kN Thrust`;
    listItem3.innerText = `${item.amount} Thrusters`;
    listItem4.innerText = `${item.pods} Pods`;
    listItem5.innerText = "Fuel:";

    /** append 3rd unordered list and set of list-items */
    listItem5.appendChild(unorderedList3);
    unorderedList3.appendChild(listItem6);
    unorderedList3.appendChild(listItem7);

    /** 3rd set of list items inner text */
    listItem6.innerText = item.fuel_1;
    listItem7.innerText = item.fuel_2;
  });

}

/**
 * This is a function to apply an error image if any image responds with an error.
 * created due to spaceX API breaking and some image links not working.
 * @param {string} image applys a placeholder image to any images that respond with an error
 */
function imgError(image) {
  image.onerror = "";
  image.src = "assets/images/image-unavailable.jpg";
}