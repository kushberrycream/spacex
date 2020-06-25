
callLaunches();
pagination();

// calls spacex past launches api
function allLaunches() {
   

    let title = document.createElement("h1");

    title.setAttribute("class", "title");

    MAINCONTENT.appendChild(title);

    title.innerText = "SpaceX Launches";

    launchReversed.forEach(item => {
        $("#loader").addClass("hide-loader");



        let launchHead = document.createElement("div");
        let cardBody = document.createElement("div");
        let row = document.createElement("div");
        let column1 = document.createElement("div");
        let column2 = document.createElement("div");
        let launchSuccess = item.launch_success;

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

    });
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

    let pagination = document.getElementById("btm-pagination");
    let navMenu = document.createElement("nav");
    let list = document.createElement("ul");
    let listItem1 = document.createElement("li");

    navMenu.setAttribute("aria-label", "Page navigation");
    navMenu.classList.add("container");
    list.classList.add("pagination", "justify-content-center");
    listItem1.classList.add("page-item", "active");

    let listItem2 = listItem1.cloneNode(true);
    listItem2.classList.remove("active");
    let listItem3 = listItem2.cloneNode(true);
    let listItem4 = listItem3.cloneNode(true);
    let listItem5 = listItem4.cloneNode(true);
    let listItem6 = listItem5.cloneNode(true);
    let listItem7 = listItem6.cloneNode(true);
    let listItem8 = listItem7.cloneNode(true);
    let listItem9 = listItem8.cloneNode(true);
    let listItem10 = listItem9.cloneNode(true);

    pagination.appendChild(navMenu);
    navMenu.appendChild(list);
    list.appendChild(listItem1);
    list.appendChild(listItem2);
    list.appendChild(listItem3);
    list.appendChild(listItem4);
    list.appendChild(listItem5);
    list.appendChild(listItem6);
    list.appendChild(listItem7);
    list.appendChild(listItem8);
    list.appendChild(listItem9);
    list.appendChild(listItem10);

    listItem1.innerHTML = `<option class="page-link" onclick="getPagination(value)" value="?limit=10&offset=86">1</option>`;
    listItem2.innerHTML = `<option onclick="getPagination(value)" value="?limit=10&offset=76" class="page-link">2</option>`;
    listItem3.innerHTML = `<option onclick="getPagination(value)" value="?limit=10&offset=66" class="page-link">3</option>`;
    listItem4.innerHTML = `<option onclick="getPagination(value)" value="?limit=10&offset=56" class="page-link">4</option>`;
    listItem5.innerHTML = `<option onclick="getPagination(value)" value="?limit=10&offset=46" class="page-link">5</option>`;
    listItem6.innerHTML = `<option onclick="getPagination(value)" value="?limit=10&offset=36" class="page-link">6</option>`;
    listItem7.innerHTML = `<option onclick="getPagination(value)" value="?limit=10&offset=26" class="page-link">7</option>`;
    listItem8.innerHTML = `<option onclick="getPagination(value)" value="?limit=10&offset=16" class="page-link">8</option>`;
    listItem9.innerHTML = `<option onclick="getPagination(value)" value="?limit=10&offset=06" class="page-link">9</option>`;
    listItem10.innerHTML = `<option onclick="getPagination(value)" value="?limit=6&offset=0" class="page-link">10</option>`;




}


$(".page-item").on("click", function () {
    $(".page-item").removeClass("active");
    $(this).addClass("active");
});