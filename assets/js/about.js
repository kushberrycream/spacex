callAbout();

// calls spacex API & company info API

function aboutPage() {

    $("#data").addClass("container");
    $("#loader").addClass("hide-loader");

    let info = document.createElement("div");
    let card1 = document.createElement("div");
    let card2 = document.createElement("div");
    let card3 = document.createElement("div");
    let cardHead1 = document.createElement("div");
    let cardHead2 = document.createElement("div");
    let cardHead3 = document.createElement("div");
    let cardBody1 = document.createElement("div");
    let cardBody2 = document.createElement("div");
    let cardBody3 = document.createElement("div");
    let row1 = document.createElement("div");
    let row2 = document.createElement("div");
    let col1 = document.createElement("div");
    let col2 = document.createElement("div");
    let col3 = document.createElement("div");
    let col4 = document.createElement("div");

    info.setAttribute("class", "spacex-info");
    card1.setAttribute("class", "card");
    card2.setAttribute("class", "card");
    card3.setAttribute("class", "card");
    cardHead1.setAttribute("class", "card-header");
    cardHead2.setAttribute("class", "card-header");
    cardHead3.setAttribute("class", "card-header");
    cardBody1.setAttribute("class", "card-body");
    cardBody2.setAttribute("class", "card-body");
    cardBody3.setAttribute("class", "card-body");
    row1.setAttribute("class", "row");
    row2.setAttribute("class", "row no-gutters");
    col1.setAttribute("class", "col-md-6");
    col2.setAttribute("class", "col-md-6 center-img");
    col3.setAttribute("class", "col-md-6");
    col4.setAttribute("class", "col-md-6");

    mainContent.appendChild(info);
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

    companyInfo(cardHead1, col1, col2);
    apiInfo(cardHead2, cardBody2);
    aboutMe(cardHead3, cardBody3);
}


function companyInfo(cardHead1, col1, col2) {

    let linkRow = document.createElement("div");
    let linkCol1 = document.createElement("div");
    let valuation = accounting.formatMoney(infoApiData.valuation);
    let name = document.createElement("h3");
    let musk = document.createElement("p");
    let coo = document.createElement("p");
    let value = document.createElement("p");
    let hq = document.createElement("p");
    let details = document.createElement("p");
    let website = document.createElement("a");
    let flickr = document.createElement("a");
    let twitter = document.createElement("a");
    let elonTwitter = document.createElement("a");
    let logo = document.createElement("img");

    linkRow.setAttribute("class", "row text-center about-links");
    linkCol1.setAttribute("class", "col-3");
    website.setAttribute("href", infoApiData.links.website);
    website.setAttribute("target", "_blank");
    website.setAttribute("class", "hvr-pulse-grow");
    flickr.setAttribute("href", infoApiData.links.flickr);
    flickr.setAttribute("target", "_blank");
    flickr.setAttribute("class", "hvr-pulse-grow");
    twitter.setAttribute("href", infoApiData.links.twitter);
    twitter.setAttribute("target", "_blank");
    twitter.setAttribute("class", "hvr-pulse-grow");
    elonTwitter.setAttribute("href", infoApiData.links.elon_twitter);
    elonTwitter.setAttribute("target", "_blank");
    elonTwitter.setAttribute("class", "hvr-pulse-grow");
    logo.setAttribute("class", "spacexwhite");
    logo.setAttribute("src", "assets/images/spacextrans.png");
    logo.setAttribute("alt", "SpaceX");

    let linkCol2 = linkCol1.cloneNode(false);
    let linkCol3 = linkCol1.cloneNode(false);
    let linkCol4 = linkCol1.cloneNode(false);

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

    name.innerText = infoApiData.name;
    musk.innerHTML = `<strong>Founder, CEO & CTO: </strong>${infoApiData.founder}`;
    coo.innerHTML = `<strong>COO: </strong>${infoApiData.coo}`;
    value.innerHTML = `<strong>Valuation: </strong>${valuation}`;
    hq.innerHTML = `<strong>HQ: </strong>${infoApiData.headquarters.address}, ${infoApiData.headquarters.city}, ${infoApiData.headquarters.state}`;
    details.innerText = infoApi.summary;
    website.innerHTML = `<i class="icon fas fa-link"></i>`;
    flickr.innerHTML = `<i class="icon fab fa-flickr"></i>`;
    twitter.innerHTML = `<i class="icon fab fa-twitter-square"></i>`;
    elonTwitter.innerHTML = `<img class="elon icon" src="assets/images/elon.png" alt="elon_twitter">`;
}


function apiInfo(cardHead2, cardBody2) {

    let linkRow = document.createElement("div");
    let linkCol1 = document.createElement("div");
    let link = document.createElement("a");
    let project = document.createElement("h3");
    let disclaimer = document.createElement("p");
    let description = document.createElement("p");
    let version = document.createElement("p");
    let docs1 = document.createElement("a");

    linkRow.setAttribute("class", "row text-center");
    linkCol1.setAttribute("class", "col-6");
    link.setAttribute("href", spacexData.project_link);
    link.setAttribute("target", "_blank");
    link.setAttribute("class", "hvr-pulse-grow");
    docs1.setAttribute("href", spacexData.docs);
    docs1.setAttribute("target", "_blank");
    docs1.setAttribute("class", "hvr-pulse-grow");

    let linkCol2 = linkCol1.cloneNode(false);

    cardHead2.appendChild(project);
    cardBody2.appendChild(disclaimer);
    cardBody2.appendChild(description);
    cardBody2.appendChild(version);
    cardBody2.appendChild(linkRow);
    linkRow.appendChild(linkCol1);
    linkRow.appendChild(linkCol2);
    linkCol1.appendChild(link);
    linkCol2.appendChild(docs1);


    project.innerText = spacexData.project_name;
    disclaimer.innerText = "All Information about SpaceX, Launches, Rockets and Missions are provided by the SpaceX API.";
    description.innerText = spacexData.description;
    version.innerHTML = `<strong>Version: </strong>${spacexData.version}`;
    link.innerHTML = `<img class="github" src="assets/images/octocat.png">GitHub`;
    docs1.innerHTML = `<img class="docs" src="assets/images/postman.png">Documentation`;

}


function aboutMe(cardHead3, cardBody3) {
    let linkRow = document.createElement("div");
    let linkCol1 = document.createElement("div");
    let me = document.createElement("h3");
    let codeInst = document.createElement("p");
    let repo = document.createElement("a");
    let contact = document.createElement("h5");
    let phone = document.createElement("p");
    let email = document.createElement("p");
    let github = document.createElement("a");
    let facebook = document.createElement("a");

    linkRow.setAttribute("class", "row text-center");
    linkCol1.setAttribute("class", "col-6");
    repo.setAttribute("src", "#");
    repo.setAttribute("target", "_blank");
    github.setAttribute("href", "https://github.com/kushberrycream");
    github.setAttribute("target", "_blank");
    github.setAttribute("class", "hvr-pulse-grow");
    facebook.setAttribute("href", "#");
    facebook.setAttribute("target", "_blank");
    facebook.setAttribute("class", "hvr-pulse-grow");

    let linkCol2 = linkCol1.cloneNode(false);

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

    me.innerText = "Created By Tom Jones";
    codeInst.innerText = "This site was created as a Project for the Code Institutes Diploma in Software Development.";
    repo.innerText = "Click Here to see the Repository";
    contact.innerText = "Contact Me";
    phone.innerHTML = `<strong>Phone: </strong>07449 670 750`;
    email.innerHTML = `<strong>Email: </strong>kushberrycream@hotmail.com`;
    github.innerHTML = `<img class="github" src="assets/images/octocat.png" alt="Octocat">Github`;
    facebook.innerHTML = `<img class="facebook" src="assets/images/facebook.png" alt="Facebook">Facebook`;
}