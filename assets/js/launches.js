/**
 * @fileoverview All functions used to display data onto launches.html page
 * @author Tom Jones <tom@wilson-express.co.uk>
 */

/** Function which calls the main SpaceX API and the launches endpoint passing 0 as the value param */
fetchLaunches("0");
/** Function which displays prev/next buttons */
pagination();

/**
 * This function uses the forEach method to loop through the array obtained
 * from the past launches endpoint and create a card for each launch but only display
 * 10 launches. 
 */
function fetchAllLaunchCards() {
  launchData.forEach(item => {

    /** removes loader */
    $("#loader").addClass("hide-loader");

    /** create elements */
    let launchHead = document.createElement("div"),
      cardBody = document.createElement("div"),
      row = document.createElement("div"),
      column1 = document.createElement("div"),
      column2 = document.createElement("div"),
      launchSuccess = item.launch_success;

    /** if / else statement to check if the launch was a success if true then the header will be green */
    if (launchSuccess == true) {
      launchSuccess = `<div class='card-header green'>
                                <h3>${item.mission_name} <span class="launch-success"><i class="fas fa-check"></i> Launch Successful </span></h3>
                                </div>`;
      /** Else it will display a red header */
    } else {
      launchSuccess = `<div class='card-header red'>
                                <h3>${item.mission_name} <span class="launch-success"><i class="fas fa-times"></i> Launch Failed </span></h3>
                                </div>`;
    }

    /** Set Attributes on elements just created */
    launchHead.setAttribute("class", "card");
    cardBody.setAttribute("class", "card-body");
    row.setAttribute("class", "row");
    column1.setAttribute("class", "col-md-7");
    column2.setAttribute("class", "col-md-5 text-center");

    /** Append all elements created */
    MAINCONTENT.appendChild(launchHead);
    launchHead.innerHTML = launchSuccess;
    launchHead.appendChild(cardBody);
    cardBody.appendChild(row);
    row.appendChild(column1);
    row.appendChild(column2);

    /** once all cards are created call function to add data */
    launchInfo(item, column1, column2);
  });

}

/**
 * This Functions uses the data obtained from the Missions endpoint.
 * @param {Array} item Data from the past launches endpoint passed from fetchAllLaunchCards() 
 * @param {HTMLElement} column1 first column in the card, displays all the data and links. passed from fetchAllLaunchCards() 
 * @param {HTMLElement} column2 second column in the card, displays the launch patch. passed from fetchAllLaunchCards() 
 */
function launchInfo(item, column1, column2) {

  /** Date obtained and formatted using moment.js */
  let date = moment.parseZone(item.launch_date_utc).utc().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    /** All elements created */
    flight = document.createElement("h5"),
    launchDate = document.createElement("p"),
    site = document.createElement("p"),
    details = document.createElement("p"),
    row = document.createElement("div"),
    column3 = document.createElement("div"),
    video = document.createElement("a"),
    wiki = document.createElement("a"),
    patch = document.createElement("img"),
    redditLink = document.createElement("div"),
    presskitLink = document.createElement("div"),
    reddit = item.links.reddit_campaign,
    presskit = item.links.presskit;


  /** if statement checking to see if presskit is null if true it will be blank */
  if (presskit == null) {
    presskit = ``;
    /** else a link will display */
  } else {
    presskit = `<a href="${item.links.presskit}" target="_blank" class="hvr-pulse-grow"><i class="far fa-newspaper"></i></a>`;
  }

  /** if statement checking to see if reddit is null if true it will be blank */
  if (reddit == null) {
    reddit = ``;
    /** else a link will display */
  } else {
    reddit = `<a href="${item.links.reddit_campaign}" target="_blank" class="hvr-pulse-grow"><i class="fab fa-reddit-alien"></i></a>`;
  }

  /** Set Attributes on elements just created */
  flight.setAttribute("class", "card-title");
  launchDate.setAttribute("class", "card-text");
  site.setAttribute("class", "card-text");
  details.setAttribute("class", "card-text");
  row.setAttribute("class", "row");
  column3.setAttribute("class", "col-3 text-center launch-links");
  video.setAttribute("href", item.links.video_link);
  video.setAttribute("class", "hvr-pulse-grow");
  video.setAttribute("target", "_blank");
  wiki.setAttribute("href", item.links.wikipedia);
  wiki.setAttribute("target", "_blank");
  wiki.setAttribute("class", "hvr-pulse-grow");
  patch.setAttribute("class", "patch");
  patch.setAttribute("src", item.links.mission_patch_small);
  patch.setAttribute("alt", "Mission Patch");
  patch.setAttribute("onerror", "imgError(this);");

  /** Clone all duplicate elements */
  let column4 = column3.cloneNode(false);
  let column5 = column3.cloneNode(false);
  let column6 = column3.cloneNode(false);

  /** Append all elements created */
  column1.appendChild(flight);
  column1.appendChild(launchDate);
  column1.appendChild(site);
  column1.appendChild(details);
  column1.appendChild(row);
  row.appendChild(column3);
  row.appendChild(column4);
  row.appendChild(column5);
  row.appendChild(column6);
  column3.appendChild(video);
  column4.appendChild(wiki);
  column5.appendChild(redditLink);
  column6.appendChild(presskitLink);
  column2.appendChild(patch);

  /** Set inner text / HTML of elements */
  flight.innerText = `Flight Number: ${item.flight_number}`;
  launchDate.innerText = `Date: ${date.toString()}`;
  site.innerText = `Site: ${item.launch_site.site_name_long}`;
  details.innerText = item.details;
  video.innerHTML = `<i class="fab fa-youtube"></i>`;
  wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;
  redditLink.innerHTML = reddit;
  presskitLink.innerHTML = presskit;
}


/**
 * This Function creates the prev / next buttons below the page title.
 * it also changes the value of the buttons so each time you press a button 
 * it calls a different endpoint.
 */
function pagination() {

  /** Create Elements */
  let pagination = document.getElementById("prev-next"),
    navMenu = document.createElement("nav"),
    list = document.createElement("ul"),
    listItem1 = document.createElement("li");

  /** Set Attributes to created elements */
  navMenu.setAttribute("aria-label", "Page navigation");
  navMenu.classList.add("container");
  list.classList.add("pagination");
  listItem1.classList.add("w-100");

  /** Clone all duplicate elements */
  let listItem2 = listItem1.cloneNode(true);
  let listItem3 = listItem1.cloneNode(true);

  /** Add any extra attributes */
  listItem2.setAttribute("class", "w-25 link-divide");

  /** Append all elements created */
  pagination.appendChild(navMenu);
  navMenu.appendChild(list);
  list.appendChild(listItem1);
  list.appendChild(listItem2);
  list.appendChild(listItem3);

  /** Set inner text / HTML of elements */
  listItem1.innerHTML = `<div class="text-right"><button value="0" id="prev" class="hvr-pulse-grow page-link float-right"><i class="fas fa-angle-left"></i> Prev</button></div>`;
  listItem2.innerText = "---";
  listItem3.innerHTML = `<div><button value="0" id="next" class="hvr-pulse-grow page-link">Next <i class="fas fa-angle-right"></i></button></div>`;

  /** values of next / prev buttons */
  let next = document.getElementById("next"),
    prev = document.getElementById("prev"),
    offset = 0,
    prevOffset = 0;

  /** onclick event to change value of next and prev buttons when next is pressed */
  document.getElementById("next").onclick = function () {
    /** adds 10 to the next value */
    value = this.value = offset += 10;
    value = offset;
    /** also adds 10 to the prev value */
    prev.value = prevOffset += 10;
    prev.setAttribute("class", "hvr-pulse-grow page-link float-right");
    /** uses getValue function to pass the button value over to a new api call */
    getValue("launches", value);
  };
  
  /** onclick event to change value of next and prev buttons when prev is pressed */
  document.getElementById("prev").onclick = function () {
    /** takes 10 to the prev value */
    value = this.value = prevOffset -= 10;
    value = prevOffset;
    /** also takes 10 to the next value */
    next.value = offset -= 10;

    /** if statment checks to see if prev value is 0 if it is true then the button wont display */
    if (prev.value == "0") {
      prev.setAttribute("class", "display-none");
      /** else the prev buttons class will change */
    } else {
      prev.setAttribute("class", "hvr-pulse-grow page-link float-right");
    }

    /** 
     * if statment checks to see if launchData length is less than or = to 11,
     * if so it will redisplay on a prev button click. 
     * for some reason wont work any other way!
     */
    if (launchData.length <= 11) {
      next.setAttribute("class", "hvr-pulse-grow page-link");
    }
    /** uses getValue function to pass the button value over to a new api call */
    getValue("launches", value);
  };

  /** removes prev button at page load*/
  if (prev.value == "0") {
    prev.setAttribute("class", "display-none");
  }
}