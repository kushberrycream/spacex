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
        title.innerHTML = `<h1><strong>SpaceX Historical Events</strong></h1>`;
        let row = document.createElement("div");
        
        row.setAttribute("class", "row");
        newData.forEach(item => {
            $("#loader").addClass("hide-loader");



            let card = document.createElement("div");
            card.setAttribute("class", "card col-lg-5");
            app.appendChild(row);
            row.appendChild(card);

            let date = moment.parseZone(item.event_date_utc).utc().format("dddd, MMMM Do YYYY, h:mm:ss a");


            card.innerHTML = `
                                <div class="card-header">
                                    <h3>${item.title}</h3>
                                </div>
                                <div class="card-body">
                               
                                        <h5 class="card-title">${date}</h5>
                                        <h6 class="card-title">Flight No: ${item.flight_number} - ID: ${item.id}</h6>
                                        <p class="card-text">${item.details}</p>
                                        Wikipedia: <a href="${item.links.wikipedia}" target="_blank">${item.links.wikipedia}</a>
                                        <br>
                                
                            </div>
                            `;


        });
    });
}