/**
 * @fileoverview JS file with all functions used within the missions page,
 * @author Tom Jones <tom@wilson-express.co.uk>
 */

/** Call callMissions() function from axios.js */
fetchMissions();

/**
 * This function uses the forEach method to loop through the array obtained
 * from the Missions endpoint and create a card for each mission. 
 */
function createMissionCards() {
  missionData.forEach(item => {

    /** removes loader */
    $("#loader").addClass("hide-loader");

    /** create elements */
    let info = document.createElement("div"),
      cardHead = document.createElement("div"),
      headLink = document.createElement("a"),
      cardBody = document.createElement("div");

    /** Set Attributes on elements just created */
    info.setAttribute("class", "card");
    cardHead.setAttribute("class", "card-header");
    headLink.setAttribute("href", item.website);
    headLink.setAttribute("target", "_blank");
    cardBody.setAttribute("class", "card-body");

    /** Append all elements created */
    MAINCONTENT.appendChild(info);
    info.appendChild(cardHead);
    cardHead.appendChild(headLink);
    info.appendChild(cardBody);

    /** once all cards are created call function to add data */
    missionInfo(item, headLink, cardBody);
  });
}

/**
 * This Functions uses the data obtained from the Missions endpoint.
 * @param {Array} item Data from the missions endpoint passed from createMissionCard() 
 * @param {HTMLElement} headLink Passed from the createMissionCard() function, used to display mission name.
 * @param {HTMLElement} cardBody Passed from the createMissionCard() function and used to display mission data.
 */
function missionInfo(item, headLink, cardBody) {

  /** Create Elements */
  let mission = document.createElement("h5"),
    manufacturers = document.createElement("h6"),
    description = document.createElement("p"),
    row = document.createElement("div"),
    col1 = document.createElement("div"),
    wiki = document.createElement("a");

  /** Set Attributes to created elements */
  mission.setAttribute("class", "card-title");
  description.setAttribute("class", "card-text");
  row.setAttribute("class", "row text-center mission-links");
  col1.setAttribute("class", "col-2");
  wiki.setAttribute("target", "_blank");
  wiki.setAttribute("class", "hvr-pulse-grow");

  /** Clone all duplicate elements */
  let col2 = col1.cloneNode(false),
    twitter = wiki.cloneNode(false);

  /** Add any extra attributes */
  wiki.setAttribute("href", item.wikipedia);
  wiki.setAttribute("aria-label", "Wikipedia Link");
  twitter.setAttribute("href", item.twitter);
  twitter.setAttribute("aria-label", "Twitter Link");

  /** Append all elements created */
  cardBody.appendChild(mission);
  cardBody.appendChild(manufacturers);
  cardBody.appendChild(description);
  cardBody.appendChild(row);
  row.appendChild(col1);
  row.appendChild(col2);
  col1.appendChild(wiki);
  col2.appendChild(twitter);

  /** Set inner text / HTML of elements */
  headLink.innerHTML = `<h3>${item.mission_name}</h3>`;
  mission.innerText = `Mission ID: ${item.mission_id}`;
  description.innerText = item.description;
  wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;
  twitter.innerHTML = `<i class="fab fa-twitter"></i>`;

  /** If else statement to check to see if item.manufacturers is null  */
  if (item.manufacturers[1] == null) {
    manufacturers.innerText = `Manufacturers: ${item.manufacturers[0]}`;
  } else {
    manufacturers.innerText = `Manufacturers: ${item.manufacturers[0]} - ${item.manufacturers[1]} - ${item.manufacturers[2]}`;
  }
}