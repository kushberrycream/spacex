// Variables
const app = document.getElementById("data");
const api = "https://api.spacexdata.com/v3/";


callDragons()


// calls spacex dragons api

function callDragons() {
    $("#loader").removeClass("hide-loader");
    $("#data").addClass("container");

    axios.get(api + "history").then(response => {
        let data = response.data;
        let newData = data.slice().reverse();
        console.log(newData);
        let title = document.createElement("div");
        title.setAttribute("class", "title");
        app.appendChild(title);
        title.innerHTML = `<h1 class="title">SpaceX Historical Events</h1>`;
        let row = document.createElement("div");

        row.setAttribute("class", "row no-gutters");
        newData.forEach(item => {
            $("#loader").addClass("hide-loader");



            let card = document.createElement("div");
            card.setAttribute("class", "card col-lg-5");
            app.appendChild(row);
            row.appendChild(card);

            let date = moment.parseZone(item.event_date_utc).utc().format("dddd, MMMM Do YYYY, h:mm:ss a");

            // checks for a url within reddit item.

            let reddit = item.links.reddit;

            if (reddit == null) {
                reddit = `<i class="fab fa-reddit-alien"></i>`;

            } else {
                reddit = `<a href="${item.links.reddit}" target="_blank"><i class="fab fa-reddit-alien"></i></a>`;
            }

            // checks for a url within article item.

            let article = item.links.article;

            if (article == null) {
                article = `<i class="far fa-newspaper"></i>`;

            } else {
                article = `<a href="${item.links.article}" target="_blank"><i class="far fa-newspaper"></i></a>`;
            }

            card.innerHTML = `
                            <div class="card-header">
                                <h3>${item.title}</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                    <h5 class="card-title">${date}</h5>
                                    <p class="card-title">Flight No: ${item.flight_number} - ID: ${item.id} 
                                        <span class="history-media-buttons"><a href="${item.links.wikipedia}" target="_blank"><i class="fab fa-wikipedia-w"></i></a> &nbsp; ${reddit} &nbsp; ${article}</span>
                                    </p>
                                    <p class="card-text">${item.details}</p>
                                    </div>
                                </div>
                            </div>`;
        });
    });
}