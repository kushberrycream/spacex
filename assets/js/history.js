// Variables
const history = document.getElementById("data");


callHistory()

// calls spacex History api

function allHistory() {
    $("#data").addClass("container");

    let row1 = document.createElement("div");
    row1.setAttribute("class", "row no-gutters justify-content-center");

    historyReversed.forEach(item => {
        $("#loader").addClass("hide-loader");

        // checks for a url within reddit item.
        let reddit = item.links.reddit;

        if (reddit == null) {
            reddit = `<span class="no-link"><i class="fab fa-reddit-alien"></i></span>`;

        } else {
            reddit = `<a href="${item.links.reddit}" target="_blank"><i class="fab fa-reddit-alien"></i></a>`;
        }

        // checks for a url within article item.
        let article = item.links.article;

        if (article == null) {
            article = `<span class="no-link"><i class="far fa-newspaper"></i></span>`;

        } else {
            article = `<a href="${item.links.article}" target="_blank"><i class="far fa-newspaper"></i></a>`;
        }

        let dateFormat = moment.parseZone(item.event_date_utc).utc().format("dddd, MMMM Do YYYY, h:mm:ss a");
        let card = document.createElement("div");
        let cardHead = document.createElement("div");
        let title = document.createElement("h3");
        let cardBody = document.createElement("div");
        let row2 = document.createElement("div");
        let col = document.createElement("div");
        let date = document.createElement("h5");
        let flight = document.createElement("p");
        let details = document.createElement("p");

        card.setAttribute("class", "card col-lg-5");
        cardHead.setAttribute("class", "card-header");
        cardBody.setAttribute("class", "card-body");
        row2.setAttribute("class", "row");
        col.setAttribute("class", "col");
        date.setAttribute("class", "card-title");
        flight.setAttribute("class", "card-title");
        details.setAttribute("class", "card-text");

        history.appendChild(row1);
        row1.appendChild(card);
        card.appendChild(cardHead);
        cardHead.appendChild(title);
        card.appendChild(cardBody);
        cardBody.appendChild(row2);
        row2.appendChild(col);
        col.appendChild(date);
        col.appendChild(flight);
        col.appendChild(details);

        title.innerText = item.title;
        date.innerText = dateFormat;
        flight.innerHTML = `Flight No: ${item.flight_number} - ID: ${item.id} <span class="history-media-buttons"><a href="${item.links.wikipedia}" target="_blank"><i class="fab fa-wikipedia-w"></i></a> &nbsp; ${reddit} &nbsp; ${article}</span>`;
        details.innerText = item.details;
    });

}