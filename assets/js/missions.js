/**
 * @fileoverview JS file with all functions called on the Missions page,
 * @author Tom Jones <tom@wilson-express.co.uk>
 */

/** 
 * Call callMissions() function from axios.js,
 */

callMissions();

// calls spacex missions api

function eachMissionCard() {

    $("#data").addClass("container");


    missionData.forEach(item => {
        $("#loader").addClass("hide-loader");

        let info = document.createElement("div");
        let cardHead = document.createElement("div");
        let headLink = document.createElement("a");
        let cardBody = document.createElement("div");

        info.setAttribute("class", "card");
        cardHead.setAttribute("class", "card-header");
        headLink.setAttribute("href", item.website);
        headLink.setAttribute("target", "_blank");
        cardBody.setAttribute("class", "card-body");

        MAINCONTENT.appendChild(info);
        info.appendChild(cardHead);
        cardHead.appendChild(headLink);
        info.appendChild(cardBody);

        missionInfo(item, headLink, cardBody);

    });
}

function missionInfo(item, headLink, cardBody) {

    let mission = document.createElement("h5");
    let manufacturers = document.createElement("h6");
    let description = document.createElement("p");
    let row = document.createElement("div");
    let col1 = document.createElement("div");
    let col2 = document.createElement("div");
    let wiki = document.createElement("a");
    let twitter = document.createElement("a");

    mission.setAttribute("class", "card-title");
    description.setAttribute("class", "card-text");
    row.setAttribute("class", "row text-center mission-links");
    col1.setAttribute("class", "col-2");
    col2.setAttribute("class", "col-2");
    wiki.setAttribute("href", item.wikipedia);
    wiki.setAttribute("target", "_blank");
    wiki.setAttribute("class", "hvr-pulse-grow")
    wiki.setAttribute("aria-label", "Wikipedia Link");
    twitter.setAttribute("href", item.twitter);
    twitter.setAttribute("target", "_blank");
    twitter.setAttribute("aria-label", "Twitter Link");
    twitter.setAttribute("class", "hvr-pulse-grow")

    cardBody.appendChild(mission);
    cardBody.appendChild(manufacturers);
    cardBody.appendChild(description);
    cardBody.appendChild(row);
    row.appendChild(col1);
    row.appendChild(col2)
    col1.appendChild(wiki);
    col2.appendChild(twitter);

    headLink.innerHTML = `<h3>${item.mission_name}</h3>`;
    mission.innerText = `Mission ID: ${item.mission_id}`;
    description.innerText = item.description;
    wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;
    twitter.innerHTML = `<i class="fab fa-twitter"></i>`;

    if (item.manufacturers[1] == null) {
        manufacturers.innerText = `Manufacturers: ${item.manufacturers[0]}`;
    } else {
        manufacturers.innerText = `Manufacturers: ${item.manufacturers[0]} - ${item.manufacturers[1]} - ${item.manufacturers[2]}`;
    }
    
}

