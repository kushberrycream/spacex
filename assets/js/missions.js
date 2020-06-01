// Variables
const missions = document.getElementById("data");
const api = "https://api.spacexdata.com/v3/";

callMissions();

// calls spacex missions api

function callMissions() {
    
    $("#loader").removeClass("hide-loader");
    $("#data").addClass("container");

    axios.get(api + "missions").then(response => {
        let data = response.data;

        data.forEach(item => {
            $("#loader").addClass("hide-loader");

            let info = document.createElement("div");
            let cardHead = document.createElement("div");
            let headLink = document.createElement("a");
            let cardBody = document.createElement("div");
            let mission = document.createElement("h5");
            let manufacturers = document.createElement("h6");
            let description = document.createElement("p");
            let wiki = document.createElement("a");
            let twitter = document.createElement("a");

            info.setAttribute("class", "card");
            cardHead.setAttribute("class", "card-header");
            headLink.setAttribute("href", item.website);
            headLink.setAttribute("target", "_blank");
            cardBody.setAttribute("class", "card-body");
            mission.setAttribute("class", "card-title");
            description.setAttribute("class", "card-text");
            wiki.setAttribute("href", item.wikipedia);
            wiki.setAttribute("target", "_blank");
            twitter.setAttribute("href", item.twitter);
            twitter.setAttribute("target", "_blank");

            missions.appendChild(info);
            info.appendChild(cardHead);
            cardHead.appendChild(headLink);
            info.appendChild(cardBody);
            cardBody.appendChild(mission);
            cardBody.appendChild(manufacturers);
            cardBody.appendChild(description);
            cardBody.appendChild(wiki);
            cardBody.appendChild(twitter);

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

        });


    });
}

