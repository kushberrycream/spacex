/**
 * @fileoverview All functions used to display data onto about.html page
 * @author Tom Jones <tom@wilson-express.co.uk>
 */

/** Function which calls the main SpaceX API and the company info endpoint */
callAbout();

/**
 * This Function creates the cards on the about.html page
 * it will not load any data just the cards! 
 */
function aboutPage() {

  /** removes loader */
  $("#loader").addClass("hide-loader");

  /** create elements */
  let info = document.createElement("div"),
    card1 = document.createElement("div"),
    cardHead1 = document.createElement("div"),
    cardBody1 = document.createElement("div"),
    row1 = document.createElement("div"),
    col1 = document.createElement("div");

  /** Set Attributes on elements just created */
  info.setAttribute("class", "spacex-info");
  card1.setAttribute("class", "card");
  cardHead1.setAttribute("class", "card-header");
  cardBody1.setAttribute("class", "card-body");
  row1.setAttribute("class", "row");
  col1.setAttribute("class", "col-md-6");

  /** clone all duplicate elements */
  let card2 = card1.cloneNode(false),
    card3 = card1.cloneNode(false),
    cardHead2 = cardHead1.cloneNode(false),
    cardHead3 = cardHead1.cloneNode(false),
    cardBody2 = cardBody1.cloneNode(false),
    cardBody3 = cardBody1.cloneNode(false),
    row2 = row1.cloneNode(false),
    col2 = col1.cloneNode(false),
    col3 = col1.cloneNode(false),
    col4 = col1.cloneNode(false);

  /** Add extra classes to elements */
  row2.classList.add("no-gutters");
  col2.classList.add("center-img");

  /** Append all elements created */
  MAINCONTENT.appendChild(info);
  info.appendChild(card1);
  card1.appendChild(cardHead1);
  card1.appendChild(cardBody1);
  cardBody1.appendChild(row1);
  row1.appendChild(col1);
  row1.appendChild(col2);
  info.appendChild(row2);
  row2.appendChild(col3);
  row2.appendChild(col4);
  col3.appendChild(card2);
  card2.appendChild(cardHead2);
  card2.appendChild(cardBody2);
  col4.appendChild(card3);
  card3.appendChild(cardHead3);
  card3.appendChild(cardBody3);

  /** once all cards are created call functions to add data */
  companyInfo(cardHead1, col1, col2);
  apiInfo(cardHead2, cardBody2);
  aboutMe(cardHead3, cardBody3);
}

/**
 * This function uses data obtained from the Company Info endpoint
 * then appends to the first card.
 * @param {HTMLElement} cardHead1 Passed from aboutPage() function and used to append company name to card header
 * @param {HTMLElement} col1 Passed from aboutPage() function and this has all the data from the API
 * @param {HTMLElement} col2 Passed from aboutPage() function and contains the company logo.
 */
function companyInfo(cardHead1, col1, col2) {

  /** create elements */
  let linkRow = document.createElement("div"),
    linkCol1 = document.createElement("div"),
    valuation = accounting.formatMoney(infoApiData.valuation),
    name = document.createElement("h3"),
    musk = document.createElement("p"),
    coo = document.createElement("p"),
    value = document.createElement("p"),
    hq = document.createElement("p"),
    details = document.createElement("p"),
    website = document.createElement("a"),
    logo = document.createElement("img");

  /** Set Attributes on elements just created */
  linkRow.setAttribute("class", "row text-center about-links");
  linkCol1.setAttribute("class", "col-3");
  website.setAttribute("target", "_blank");
  website.setAttribute("class", "hvr-pulse-grow");
  logo.setAttribute("class", "spacexwhite");
  logo.setAttribute("src", "assets/images/spacextrans.png");
  logo.setAttribute("alt", "SpaceX");

  /** clone all duplicate elements */
  let linkCol2 = linkCol1.cloneNode(false),
    linkCol3 = linkCol1.cloneNode(false),
    linkCol4 = linkCol1.cloneNode(false),
    flickr = website.cloneNode(false),
    twitter = website.cloneNode(false),
    elonTwitter = website.cloneNode(false);

  /** Add extra classes to elements */
  website.setAttribute("href", infoApiData.links.website);
  flickr.setAttribute("href", infoApiData.links.flickr);
  twitter.setAttribute("href", infoApiData.links.twitter);
  elonTwitter.setAttribute("href", infoApiData.links.elon_twitter);

  /** Append all elements created */
  cardHead1.appendChild(name);
  col1.appendChild(musk);
  col1.appendChild(coo);
  col1.appendChild(hq);
  col1.appendChild(details);
  col1.appendChild(value);
  col1.appendChild(linkRow);
  linkRow.appendChild(linkCol1);
  linkRow.appendChild(linkCol2);
  linkRow.appendChild(linkCol3);
  linkRow.appendChild(linkCol4);
  linkCol1.appendChild(website);
  linkCol2.appendChild(flickr);
  linkCol3.appendChild(twitter);
  linkCol4.appendChild(elonTwitter);
  col2.appendChild(logo);

  /** Set inner text / HTML of elements */
  name.innerText = infoApiData.name;
  musk.innerHTML = `<strong>Founder, CEO & CTO: </strong>${infoApiData.founder}`;
  coo.innerHTML = `<strong>COO: </strong>${infoApiData.coo}`;
  value.innerHTML = `<strong>Valuation: </strong>${valuation}`;
  hq.innerHTML = `<strong>HQ: </strong>${infoApiData.headquarters.address}, ${infoApiData.headquarters.city}, ${infoApiData.headquarters.state}`;
  details.innerText = infoApiData.summary;
  website.innerHTML = `<i class="icon fas fa-link"></i>`;
  flickr.innerHTML = `<i class="icon fab fa-flickr"></i>`;
  twitter.innerHTML = `<i class="icon fab fa-twitter-square"></i>`;
  elonTwitter.innerHTML = `<img class="elon icon" src="assets/images/elon.png" alt="elon_twitter">`;
}

/**
 * This function uses the main API endpoint
 * then displays the data in the second card.
 * @param {HTMLElement} cardHead2 Passed from aboutPage() function and used to display the name of the API.
 * @param {HTMLElement} cardBody2 Passed from aboutPage() function and used to display the data within it.
 */
function apiInfo(cardHead2, cardBody2) {

  /** Create Elements */
  let linkRow = document.createElement("div"),
    linkCol1 = document.createElement("div"),
    project = document.createElement("h3"),
    disclaimer = document.createElement("p"),
    description = document.createElement("p"),
    version = document.createElement("p"),
    link = document.createElement("a");

  /** Set Attributes to created elements */
  linkRow.setAttribute("class", "row text-center");
  linkCol1.setAttribute("class", "col-6");
  link.setAttribute("target", "_blank");
  link.setAttribute("class", "hvr-pulse-grow");

  /** Clone all duplicate elements */
  let linkCol2 = linkCol1.cloneNode(false),
    docs1 = link.cloneNode(false);

  /** Add any extra attributes */
  link.setAttribute("href", spacexData.project_link);
  docs1.setAttribute("href", spacexData.docs);

  /** Append all elements created */
  cardHead2.appendChild(project);
  cardBody2.appendChild(disclaimer);
  cardBody2.appendChild(description);
  cardBody2.appendChild(version);
  cardBody2.appendChild(linkRow);
  linkRow.appendChild(linkCol1);
  linkRow.appendChild(linkCol2);
  linkCol1.appendChild(link);
  linkCol2.appendChild(docs1);

  /** Set inner text / HTML of elements */
  project.innerText = spacexData.project_name;
  disclaimer.innerText = "All Information about SpaceX, Launches, Rockets and Missions are provided by the SpaceX API.";
  description.innerText = spacexData.description;
  version.innerHTML = `<strong>Version: </strong>${spacexData.version}`;
  link.innerHTML = `<img class="github" src="assets/images/octocat.png">GitHub`;
  docs1.innerHTML = `<img class="docs" src="assets/images/postman.png">Documentation`;

}

/**
 * This Function displays information about me in the final card.
 * @param {HTMLElement} cardHead3 Passed from aboutPage() function and used to display my name as the header.
 * @param {HTMLElement} cardBody3 Passed from aboutPage() function and used to diplay my info on the cardbody.
 */
function aboutMe(cardHead3, cardBody3) {

  /** Create Elements */
  let linkRow = document.createElement("div"),
    linkCol1 = document.createElement("div"),
    me = document.createElement("h3"),
    codeInst = document.createElement("p"),
    contact = document.createElement("h5"),
    phone = document.createElement("p"),
    email = document.createElement("p"),
    github = document.createElement("a");

  /** Set Attributes to created elements */
  linkRow.setAttribute("class", "row text-center");
  linkCol1.setAttribute("class", "col-6");
  github.setAttribute("target", "_blank");
  github.setAttribute("class", "hvr-pulse-grow");

  /** Clone all duplicate elements */
  let linkCol2 = linkCol1.cloneNode(false),
    facebook = github.cloneNode(false),
    repo = github.cloneNode(false);

  /** Add any extra attributes */
  github.setAttribute("href", "https://github.com/kushberrycream");
  facebook.setAttribute("href", "https://www.facebook.com/profile.php?id=555815524");
  repo.setAttribute("href", "https://github.com/kushberrycream/spacex");

  /** Append all elements created */
  cardHead3.appendChild(me);
  cardBody3.appendChild(codeInst);
  cardBody3.appendChild(repo);
  cardBody3.appendChild(contact);
  cardBody3.appendChild(phone);
  cardBody3.appendChild(email);
  cardBody3.appendChild(linkRow);
  linkRow.appendChild(linkCol1);
  linkRow.appendChild(linkCol2);
  linkCol1.appendChild(github);
  linkCol2.appendChild(facebook);

  /** set inner text / HTML of elements */
  me.innerText = "Created By Tom Jones";
  codeInst.innerText = "This site was created as a Project for the Code Institutes Diploma in Software Development.";
  repo.innerText = "Click Here to see the Repository";
  contact.innerText = "Contact Me";
  phone.innerHTML = `<strong>Phone: </strong>07449 670 750`;
  email.innerHTML = `<strong>Email: </strong>kushberrycream@hotmail.com`;
  github.innerHTML = `<img class="github" src="assets/images/octocat.png" alt="Octocat">Github`;
  facebook.innerHTML = `<img class="facebook" src="assets/images/facebook.png" alt="Facebook">Facebook`;
}