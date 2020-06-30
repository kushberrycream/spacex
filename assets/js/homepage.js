/**
 * @fileoverview JS file with all functions called on the homepage,
 * @author Tom Jones <tom@wilson-express.co.uk>
 */

/**
 * Call homepageData() function from axios.js,
 */
homepageData();

/**
 * This functions creates the Carousel on the homepage.
 * Using the forEach() method I create a seperate carousel-item
 * for all the upcoming launches.
 */
function carousel() {
  /** hides loader once data is obtained */
  $("#loader").addClass("hide-loader");
  upcoming.forEach(item => {

    /** All Variables used to create carousel elements */
    let a = upcoming.indexOf(item),
      indicators = document.getElementById("data-slide"),
      slide = document.createElement("li"),
      upcomingLaunch = document.getElementById("upcoming-launch"),
      launches = document.createElement("div"),
      countdown = document.createElement("div"),
      container = document.createElement("div"),
      caption = document.createElement("div"),
      column = document.createElement("div"),
      column2 = document.createElement("div"),
      patch = document.createElement("img"),
      flight = document.createElement("h4"),
      name = document.createElement("h4"),
      type = document.createElement("h4"),
      site = document.createElement("h4"),
      details = document.createElement("p"),
      siteName = item.launch_site.site_name_long;

    /** Sets attributes for all elements created */
    slide.setAttribute("data-slide-to", a);
    slide.setAttribute("data-target", "#carouselExampleIndicators");
    launches.setAttribute("class", "carousel-item");
    countdown.setAttribute("class", "countdown");
    container.setAttribute("class", "details-container");
    caption.setAttribute("class", "carousel-caption row justify-content-center");
    patch.setAttribute("src", item.links.mission_patch_small ? item.links.mission_patch_small : "assets/images/spacexcircle.png");
    patch.setAttribute("alt", "mission patch");

    /** appends all elements to the DOM */
    indicators.appendChild(slide);
    upcomingLaunch.appendChild(launches);
    launches.appendChild(countdown);
    launches.appendChild(container);
    container.appendChild(caption);
    caption.appendChild(column);
    column.appendChild(patch);
    column.appendChild(flight);
    column.appendChild(name);
    column.appendChild(type);
    column.appendChild(site);

    if (siteName == null) {
      /** if null then site name will be tbc */
      siteName = `<span class="site">Site:</span> TBC`;
    } else {
      /** else site name will display the full name  */
      siteName = `<span class="site">Site:</span> ${item.launch_site.site_name_long}`;
    }

    /** Set the HTML content of some of the elements */
    flight.innerHTML = `<span class="flight">Flight No:</span> ${item.flight_number}`;
    name.innerHTML = `<span class="rocket">Rocket:</span> ${item.rocket.rocket_name}`;
    type.innerHTML = `<span class="type">Rocket Type:</span> ${item.rocket.rocket_type}`;
    site.innerHTML = siteName;

    /**
     * if / else statement to see if item.details exists.
     * if it doesnt then it sets only one column with launch information.
     * if it does exist then it sets another column with the details / desription
     * of the upcoming launch.
     */
    if (item.details == null) {

      column.setAttribute("class", "col-md-7 text-right");

    } else {

      column.setAttribute("class", "col-md-5 text-right");
      column2.setAttribute("class", "col-md-6 d-md-block d-none launch-details")

      caption.appendChild(column2);
      column2.appendChild(details);

      details.innerText = item.details;
    }

    /** call the countdown function to display countdown for each upcoming launch. */
    countdownTimer(item, countdown);
  });

}

/**
 * This function creates a countdown for each upcoming launch!
 * This function uses the moument.js libary to format the date displayed.
 * @param {object} item
 * @param {HTMLElement} countdowm
 */
function countdownTimer(item, countdown) {

  /**
   * End Date for the countdowns. Then using the setInterval() method
   * I create my countdown by subtracting my deadline with the date now.
   * then using math.floor I am able to work out the remaining days, hours, minutes and seconds.
   */
  let deadline = new Date(item.launch_date_utc).getTime(),
    x = setInterval(function() {
      let now = new Date().getTime(),
        t = deadline - now,
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor(
          (t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((t % (1000 * 60)) / 1000),
        date,

        /** if / else statement to display long date or short date depending on media screen size. */
        launchDate = window.matchMedia("screen and (min-width: 800px)");
      if (launchDate.matches) {
        date = moment.parseZone(item.launch_date_utc).utc().format("dddd Do MMMM YYYY, h:mm a");
      } else {
        date = moment.parseZone(item.launch_date_utc).utc().format("D / M / YYYY, h:mm a");
      };

      /** using innerHTML I display my countdowns */
      countdown.innerHTML = `<h1><span class="mission-name">Mission Name:</span> ${item.mission_name}</h1>
        <h2>${days}d ${hours}h ${minutes}m ${seconds}s</h2>
        <h3>${date}</h3>`;

      /** if the countdown is over then display placeholder message using clearInterval() */
      if (t < 0) {
        clearInterval(x);
        countdown.innerHTML = `<h1><span class="mission-name">Mission Name:</span> ${item.mission_name}</h1>
            <h2>Date To Be Confirmed!</h2>`;
      }

      /** Interval of 1 second */
    }, 1000);

}

/** This function add an active class to the carousel-item and also the carousel-indicators */
function active() {

  let activeItem = document.getElementsByTagName("div").item(8),
    activeLaunch = document.getElementsByTagName("li").item(7);
    activeItem.setAttribute("class", "carousel-item active")
    activeLaunch.setAttribute("class", "active");
}

/** This function creates labels for both launch and land sites. */
function siteLabels() {

  /** launch site labels */
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

  /** Landing site labels */
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

/** Here I have created the headers for both Landing and launch sites */
function headers() {

  /** first i create an empty array and use the Object.keys() method to get the enumberable property names*/
  let tableHeaders = [];
  Object.keys(launchData[1]).forEach(key => {
    let newKey = key.replace(/_/g, " "),
      upper = newKey.replace(/^\w/, c => c.toUpperCase());

    /** Push headers to the empty array */
    tableHeaders.push(upper);
  });

  /** repeated the above but for landing sites! */
  let landHeaders = [];
  Object.keys(landData[1]).forEach(key => {
    let newKey = key.replace(/_/g, " "),
      upper = newKey.replace(/^\w/, c => c.toUpperCase());

    landHeaders.push(upper);
  });

  // Launch Site Table Headers

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

  // Landing Site Table Headers

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

/** This Function adds data to the launch site table */
function launchSiteData() {

  /**
   * first i access the table "bodys" i.e the area the info will be displayed.
   * Then i create a table row and clone 5 times so each body has its own row.
   */
  let launchBody1 = document.getElementById("tab-one-body"),
    launchBody2 = document.getElementById("tab-two-body"),
    launchBody3 = document.getElementById("tab-three-body"),
    launchBody4 = document.getElementById("tab-four-body"),
    launchBody5 = document.getElementById("tab-five-body"),
    launchBody6 = document.getElementById("tab-six-body"),
    tableRow1 = document.createElement("tr"),
    tableRow2 = tableRow1.cloneNode(false),
    tableRow3 = tableRow1.cloneNode(false),
    tableRow4 = tableRow1.cloneNode(false),
    tableRow5 = tableRow1.cloneNode(false),
    tableRow6 = tableRow1.cloneNode(false);

  /** append all rows to the table body */
  launchBody1.appendChild(tableRow1);
  launchBody2.appendChild(tableRow2);
  launchBody3.appendChild(tableRow3);
  launchBody4.appendChild(tableRow4);
  launchBody5.appendChild(tableRow5);
  launchBody6.appendChild(tableRow6);

  /** HTML content for each launch site */
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

/** This Function adds data to the landing site table */
function landSiteData() {

  /**
   * first i access the table "bodys" i.e the area the info will be displayed.
   * Then i create a table row and clone 6 times so each body has its own row.
   */
  let landBody1 = document.getElementById("tab-one-body-land");
  landBody2 = document.getElementById("tab-two-body-land"),
    landBody3 = document.getElementById("tab-three-body-land"),
    landBody4 = document.getElementById("tab-four-body-land"),
    landBody5 = document.getElementById("tab-five-body-land"),
    landBody6 = document.getElementById("tab-six-body-land"),
    landBody7 = document.getElementById("tab-seven-body-land"),
    landRow1 = document.createElement("tr"),
    landRow2 = landRow1.cloneNode(landRow1),
    landRow3 = landRow1.cloneNode(landRow1),
    landRow4 = landRow1.cloneNode(landRow1),
    landRow5 = landRow1.cloneNode(landRow1),
    landRow6 = landRow1.cloneNode(landRow1),
    landRow7 = landRow1.cloneNode(landRow1);

  /** append all rows to table body */
  landBody1.appendChild(landRow1);
  landBody2.appendChild(landRow2);
  landBody3.appendChild(landRow3);
  landBody4.appendChild(landRow4);
  landBody5.appendChild(landRow5);
  landBody6.appendChild(landRow6);
  landBody7.appendChild(landRow7);

  /** HTML content for each land site */
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