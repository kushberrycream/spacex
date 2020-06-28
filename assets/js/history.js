/**
 * @fileoverview All functions used to display data onto history.html page
 * @author Tom Jones <tom@wilson-express.co.uk>
 */

/** Function which calls the history endpoint */
callHistory();

/**
 * This Function creates the cards on the history.html page
 * using the forEach method, this will not load any data just the cards! 
 */
function allHistoryCard() {

  /** create a single row outside of the forEach method */
  let row1 = document.createElement("div");
  row1.setAttribute("class", "row no-gutters justify-content-center");

  historyData.forEach(item => {

    /** removes loader */
    $("#loader").addClass("hide-loader");

    /** create elements */
    let card = document.createElement("div"),
      cardHead = document.createElement("div"),
      cardBody = document.createElement("div"),
      row2 = document.createElement("div"),
      col = document.createElement("div"),
      linkCols1 = document.createElement("div");

    /** Set Attributes on elements just created */
    card.setAttribute("class", "card col-lg-6");
    cardHead.setAttribute("class", "card-header");
    cardBody.setAttribute("class", "card-body");
    row2.setAttribute("class", "row");
    col.setAttribute("class", "col");
    linkCols1.setAttribute("class", "col-md-4 history-media-buttons");

    /** clone all duplicate elements */
    let row3 = row2.cloneNode(false),
      linkCols2 = linkCols1.cloneNode(false),
      linkCols3 = linkCols1.cloneNode(false);

    /** Append all elements created */
    MAINCONTENT.appendChild(row1);
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

/**
 * This function uses the data obtained from the history enpoint and appends them
 * to there own individual cards created in allHistoryCards().
 * @param {object} item Data from the history endpoint passed from eachHistoryCard()
 * @param {HTMLElement} cardHead Passed from eachHistoryCard() and displays the title of the history item
 * @param {HTMLElement} col Passed from eachHistoryCard() and is the container for all the data.
 * @param {HTMLElement} linkCols1 Passed from eachHistoryCard() and is a container for the wikipedia link.
 * @param {HTMLElement} linkCols2 Passed from eachHistoryCard() and is a container for the reddit link.
 * @param {HTMLElement} linkCols3 Passed from eachHistoryCard() and is a container for the article link.
 */
function historyInfo(item, cardHead, col, linkCols1, linkCols2, linkCols3) {

  /** variable which contains utc date formatted with moment.js */
  let dateFormat = moment.parseZone(item.event_date_utc).utc().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    /** Elements created */
    title = document.createElement("h3"),
    date = document.createElement("h5"),
    flight = document.createElement("p"),
    details = document.createElement("p");
  /** reddit variable to use in if/else statement */
  reddit = item.links.reddit;

  /** Set Attributes on elements just created */
  date.setAttribute("class", "card-title");
  flight.setAttribute("class", "card-title");
  details.setAttribute("class", "card-text");

  /** Append all elements created */
  cardHead.appendChild(title);
  col.appendChild(date);
  col.appendChild(flight);
  col.appendChild(details);

  /** If/else statement to check if reddit has a null value */
  if (reddit == null) {
    /** if null then reddit is an empty string */
    reddit = ``;
  } else {
    /** else reddit will be a link element  */
    reddit = `<a href="${item.links.reddit}" target="_blank" class="hvr-pulse-grow"><i class="fab fa-reddit-alien"></i></a>`;
  }

  /** Set inner text / HTML of elements */
  title.innerText = item.title;
  date.innerText = dateFormat;
  flight.innerHTML = `Flight No: ${item.flight_number} - ID: ${item.id}`;
  details.innerText = item.details;
  linkCols1.innerHTML = `<a href="${item.links.wikipedia}" target="_blank" class="hvr-pulse-grow"><i class="fab fa-wikipedia-w"></i></a>`
  linkCols2.innerHTML = reddit;
  linkCols3.innerHTML = `<a href="${item.links.article}" target="_blank" class="hvr-pulse-grow"><i class="far fa-newspaper"></i></a>`;

}