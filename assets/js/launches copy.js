
callLaunches("?order=desc");

// calls spacex past launches api
function allLaunches() {

    $("#loader").addClass("hide-loader");
    let title = document.createElement("h1");

    title.setAttribute("class", "title");

    MAINCONTENT.appendChild(title);

    title.innerText = "SpaceX Launches";

    launchCards()
}

function launchCards() {
    
    for (i=0; i < launchData.length; i++) {
        let item = launchData[i],
            launchHead = document.createElement("div"),
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


        if (i > 8) {
            break;
        }


    }

}

