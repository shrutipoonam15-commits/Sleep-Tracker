let sleepEntries = JSON.parse(localStorage.getItem("sleepEntries")) || [];

let participantID = localStorage.getItem("participantID") || "";



function calculateSleep(){

    let participant = document.getElementById("participantID").value;

    localStorage.setItem("participantID", participant);

    participantID = participant;


    let bedtime = document.getElementById("bedtime").value;
    let waketime = document.getElementById("waketime").value;
    let quality = document.getElementById("quality").value;
    let entryDate = document.getElementById("entryDate").value;
    let outsideTime = document.getElementById("outsideTime").value;


    if (bedtime === "" || waketime === ""){
        alert("Please enter bedtime and wake time.");
        return;
    }


    let bed = bedtime.split(":");
    let wake = waketime.split(":");


    let bedMinutes = Number(bed[0]) * 60 + Number(bed[1]);
    let wakeMinutes = Number(wake[0]) * 60 + Number(wake[1]);


    if (wakeMinutes < bedMinutes){
        wakeMinutes += 24 * 60;
    }


    let totalMinutes = wakeMinutes - bedMinutes;

    let hours = (totalMinutes / 60).toFixed(1);


    document.getElementById("hoursSlept").innerHTML =
        "Hours Slept: " + hours;



    let entry = {

        participant: participantID,
        date: entryDate,
        hours: Number(hours),
        quality: Number(quality),
        outsideTime: outsideTime

    };


    sleepEntries.push(entry);


    localStorage.setItem(
        "sleepEntries",
        JSON.stringify(sleepEntries)
    );


    displayEntries();

    updateStats();

}





function displayEntries(){

    let log = "";


    for(let i = 0; i < sleepEntries.length; i++){

        log +=
        "<p>" +
        "Date: " + sleepEntries[i].date +
        "<br>Hours Slept: " + sleepEntries[i].hours +
        "<br>Sleep Quality: " + sleepEntries[i].quality +
        "<br>Outside Time: " + sleepEntries[i].outsideTime +
        "</p>";

    }


    let sleepLog = document.getElementById("sleepLog");


    if(sleepLog){

        sleepLog.innerHTML = log;

    }

}





function updateStats(){

    if(sleepEntries.length === 0){
        return;
    }



    let totalHours = 0;

    let totalQuality = 0;


    for(let i = 0; i < sleepEntries.length; i++){

        totalHours += Number(sleepEntries[i].hours);

        totalQuality += Number(sleepEntries[i].quality);

    }



    let averageSleep =
    (totalHours / sleepEntries.length).toFixed(1);



    let averageQuality =
    (totalQuality / sleepEntries.length).toFixed(1);



    let bestNight = sleepEntries[0];


    for(let i = 1; i < sleepEntries.length; i++){

        if(Number(sleepEntries[i].hours) > Number(bestNight.hours)){

            bestNight = sleepEntries[i];

        }

    }



    let averageSleepBox =
    document.getElementById("averageSleep");


    if(averageSleepBox){

        averageSleepBox.innerHTML =
        "Average Sleep: " + averageSleep + " hours";

    }



    let averageQualityBox =
    document.getElementById("averageQuality");


    if(averageQualityBox){

        averageQualityBox.innerHTML =
        "Average Sleep Quality: " + averageQuality;

    }



    let bestNightBox =
    document.getElementById("bestNight");


    if(bestNightBox){

        bestNightBox.innerHTML =
        "Best Sleep Night: " + bestNight.date;

    }



    let totalNightsBox =
    document.getElementById("totalNights");


    if(totalNightsBox){

        totalNightsBox.innerHTML =
        "Total Nights Logged: " + sleepEntries.length;

    }

}





function exportData(){

    if(sleepEntries.length === 0){

        alert("No sleep data to export.");

        return;

    }


    let data = JSON.stringify(
        sleepEntries,
        null,
        2
    );


    let blob = new Blob(
        [data],
        {
            type: "application/json"
        }
    );


    let link = document.createElement("a");


    link.href = URL.createObjectURL(blob);


    link.download = "sleep_data.json";


    link.click();

}





function resetData(){

    let answer = confirm(
        "Are you sure you want to delete all sleep data?"
    );


    if(answer){

        sleepEntries = [];


        localStorage.removeItem("sleepEntries");


        displayEntries();


        updateStats();


        document.getElementById("hoursSlept").innerHTML =
        "Hours Slept:";


        alert("All sleep data has been deleted.");

    }

}





// Load saved information when website opens

displayEntries();

updateStats();
