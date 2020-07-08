/**
 * @fileoverview All functions used to display data onto launches.html page
 * @author Tom Jones <tom@wilson-express.co.uk>
 */

 /** Function which calls the main SpaceX API and the launches endpoint passing 0 as the value param */
fetchLaunches("0");
/** Function which displays prev/next buttons */
pagination();

// calls spacex past launches api
function fetchAllLaunchCards() {

    $("#loader").addClass("hide-loader");

    launchData.forEach(item => {
        let launchHead = document.createElement("div"),
            cardBody = document.createElement("div"),
            row = document.createElement("div"),
            column1 = document.createElement("div"),
            column2 = document.createElement("div"),
            launchSuccess = item.launch_success;

        if (launchSuccess == true) {
            launchSuccess = `<div class='card-header green'>
                                <h3>${item.mission_name} <span class="launch-success"><i class="fas fa-check"></i> Launch Successful </span></h3>
                                </div>`;
        } else {
            launchSuccess = `<div class='card-header red'>
                                <h3>${item.mission_name} <span class="launch-success"><i class="fas fa-times"></i> Launch Failed </span></h3>
                                </div>`;
        }

        launchHead.setAttribute("class", "card");
        cardBody.setAttribute("class", "card-body");
        row.setAttribute("class", "row");
        column1.setAttribute("class", "col-md-7");
        column2.setAttribute("class", "col-md-5 text-center");

        MAINCONTENT.appendChild(launchHead);
        launchHead.innerHTML = launchSuccess;
        launchHead.appendChild(cardBody);
        cardBody.appendChild(row);
        row.appendChild(column1);
        row.appendChild(column2);

        launchInfo(item, column1, column2);
    })

}

function launchInfo(item, column1, column2) {
    let date = moment.parseZone(item.launch_date_utc).utc().format("dddd, MMMM Do YYYY, h:mm:ss a");
    let flight = document.createElement("h5");
    let launchDate = document.createElement("p");
    let site = document.createElement("p");
    let details = document.createElement("p");
    let row = document.createElement("div");
    let column3 = document.createElement("div");
    let video = document.createElement("a");
    let wiki = document.createElement("a");
    let patch = document.createElement("img");
    let redditLink = document.createElement("div");
    let presskitLink = document.createElement("div");
    let reddit = item.links.reddit_campaign;
    let presskit = item.links.presskit;


    if (presskit == null) {
        presskit = ``;

    } else {
        presskit = `<a href="${item.links.presskit}" target="_blank" class="hvr-pulse-grow"><i class="far fa-newspaper"></i></a>`;
    }

    if (reddit == null) {
        reddit = ``;
    } else {
        reddit = `<a href="${item.links.reddit_campaign}" target="_blank" class="hvr-pulse-grow"><i class="fab fa-reddit-alien"></i></a>`;
    }


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

    let column4 = column3.cloneNode(false);
    let column5 = column3.cloneNode(false);
    let column6 = column3.cloneNode(false);

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

    flight.innerText = `Flight Number: ${item.flight_number}`;
    launchDate.innerText = `Date: ${date.toString()}`;
    site.innerText = `Site: ${item.launch_site.site_name_long}`;
    details.innerText = item.details;
    video.innerHTML = `<i class="fab fa-youtube"></i>`;
    wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;
    redditLink.innerHTML = reddit;
    presskitLink.innerHTML = presskit;



}


// applys pagination to page
function pagination() {

    let pagination = document.getElementById("prev-next");
    let navMenu = document.createElement("nav");
    let list = document.createElement("ul");
    let listItem1 = document.createElement("li");

    navMenu.setAttribute("aria-label", "Page navigation");
    navMenu.classList.add("container");
    list.classList.add("pagination");
    listItem1.classList.add("w-100")

    let listItem2 = listItem1.cloneNode(true);
    let listItem3 = listItem1.cloneNode(true);

    listItem2.setAttribute("class", "w-25 link-divide")

    pagination.appendChild(navMenu);
    navMenu.appendChild(list);
    list.appendChild(listItem1);
    list.appendChild(listItem2);
    list.appendChild(listItem3);

    listItem1.innerHTML = `<div class="text-right"><button value="0" id="prev" class="hvr-pulse-grow page-link float-right"><i class="fas fa-angle-left"></i> Prev</button></div>`;
    listItem2.innerText = "---"
    listItem3.innerHTML = `<div><button value="0" id="next" class="hvr-pulse-grow page-link">Next <i class="fas fa-angle-right"></i></button></div>`;
    

    /** values of next / prev buttons */
    let next = document.getElementById("next"),
        prev = document.getElementById("prev"),
        offset = 0,
        prevOffset = 0;

    /** onclick event to change value of next and prev buttons when next is pressed */
    document.getElementById("next").onclick = function () {
        value = this.value = offset += 10;
        value = offset;
        prev.value = prevOffset += 10;
        prev.setAttribute("class", "hvr-pulse-grow page-link float-right");
        getValue("launches", value);
    }
    /** onclick event to change value of next and prev buttons when prev is pressed */
    document.getElementById("prev").onclick = function () {
        value = this.value = prevOffset -= 10;
        value = prevOffset;
        next.value = offset -= 10;
        if (prev.value == "0") {
            prev.setAttribute("class", "display-none");
        }
        if (launchData.length <= 11) {
            next.setAttribute("class", "hvr-pulse-grow page-link");
        }

        getValue("launches", value);

    }

    /** removes prev button at start */
    if (prev.value == "0") {
        prev.setAttribute("class", "display-none");
    }

}


$(".page-item").on("click", function () {
    $(".page-item").removeClass("active");
    $(this).addClass("active");
});
