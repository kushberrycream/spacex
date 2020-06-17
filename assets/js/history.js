callHistory()

// calls spacex History api

function allHistoryCard() {
    $("#data").addClass("container");

    let row1 = document.createElement("div");
    row1.setAttribute("class", "row no-gutters justify-content-center");

    historyReversed.forEach(item => {
        $("#loader").addClass("hide-loader");

        // checks for a url within reddit item.
        let card = document.createElement("div");
        let cardHead = document.createElement("div");
        let cardBody = document.createElement("div");
        let row2 = document.createElement("div");
        let col = document.createElement("div");
        let linkCols1 = document.createElement("div");


        card.setAttribute("class", "card col-lg-6");
        cardHead.setAttribute("class", "card-header");
        cardBody.setAttribute("class", "card-body");
        row2.setAttribute("class", "row");
        col.setAttribute("class", "col");
        linkCols1.setAttribute("class", "col-md-4 history-media-buttons");

        let row3 = row2.cloneNode(false)
        row3.classList.add("historylinks");

        let linkCols2 = linkCols1.cloneNode(false);
        let linkCols3 = linkCols1.cloneNode(false);

        mainContent.appendChild(row1);
        row1.appendChild(card);
        card.appendChild(cardHead);
        card.appendChild(cardBody);
        cardBody.appendChild(row2);
        row2.appendChild(col);
        cardBody.appendChild(row3);
        row3.appendChild(linkCols1);
        row3.appendChild(linkCols2);
        row3.appendChild(linkCols3);

        historyInfo(item, cardHead, col, linkCols1, linkCols2, linkCols3);
    });

}

function historyInfo(item, cardHead, col, linkCols1, linkCols2, linkCols3) {

    let dateFormat = moment.parseZone(item.event_date_utc).utc().format("dddd, MMMM Do YYYY, h:mm:ss a");
    let title = document.createElement("h3");
    let date = document.createElement("h5");
    let flight = document.createElement("p");
    let details = document.createElement("p");
    let reddit = item.links.reddit;

    if (reddit == null) {
        reddit = ``;

    } else {
        reddit = `<a href="${item.links.reddit}" target="_blank"><i class="fab fa-reddit-alien"></i></a>`;
    }

    date.setAttribute("class", "card-title");
    flight.setAttribute("class", "card-title");
    details.setAttribute("class", "card-text");

    cardHead.appendChild(title);
    col.appendChild(date);
    col.appendChild(flight);
    col.appendChild(details);

    title.innerText = item.title;
    date.innerText = dateFormat;
    flight.innerHTML = `Flight No: ${item.flight_number} - ID: ${item.id}`;
    details.innerText = item.details;
    linkCols1.innerHTML = `<a href="${item.links.wikipedia}" target="_blank"><i class="fab fa-wikipedia-w"></i></a>`
    linkCols2.innerHTML = reddit;
    linkCols3.innerHTML = `<a href="${item.links.article}" target="_blank"><i class="far fa-newspaper"></i></a>`;

}

