let sleepEntries = JSON.parse(localStorage.getItem("sleepEntries")) || [];

let participantID = localStorage.getItem("participantID") || "";



function calculateSleep(){

    // Save participant ID
    let participant = document.getElementById("participantID").value;

    localStorage.setItem("participantID", participant);

    participantID = participant;


    // Get inputs
    let bedtime = document.getElementById("bedtime").value;
    let waketime = document.getElementById("waketime").value;
    let quality = document.getElementById("quality").value;
    let entryDate = document.getElementById("entryDate").value;
    let outsideTime = document.getElementById("outsideTime").value;


    if(bedtime === "" || waketime === ""){
        alert("Please enter bedtime and wake time.");
        return;
    }


    // Split time
    let bed = bedtime.split(":");
    let wake = waketime.split(":");


    // Convert to minutes
    let bedMinutes = Number(bed[0]) * 60 + Number(bed[1]);
    let wakeMinutes = Number(wake[0]) * 60 + Number(wake[1]);


    // Handle midnight
    if(wakeMinutes < bedMinutes){
        wakeMinutes += 24 * 60;
    }


    // Calculate hours
    let totalMinutes = wakeMinutes - bedMinutes;

    let hours = (totalMinutes / 60).toFixed(1);



    // Show result
    document.getElementById("hoursSlept").innerHTML =
        "Hours Slept: " + hours;



    // Create entry
    let entry = {

        participant: participantID,
        date: entryDate,
        hours: Number(hours),
        quality: Number(quality),
        outsideTime: Number(outsideTime)

    };



    // Add entry
    sleepEntries.push(entry);



    // Save entries
    localStorage.setItem(
        "sleepEntries",
        JSON.stringify(sleepEntries)
    );


    displayEntries();

    updateReport();

}





function displayEntries(){

    let log = "";


    for(let i = 0; i < sleepEntries.length; i++){

        log +=
        "<p>" +
        "Date: " + sleepEntries[i].date +
        "<br>Hours Slept: " + sleepEntries[i].hours +
        "<br>Sleep Quality: " + sleepEntries[i].quality +
        "<br>Outside Time: " + sleepEntries[i].outsideTime + " minutes" +
        "</p>";

    }


    if(log === ""){
        log = "No entries yet.";
    }


    document.getElementById("sleepLog").innerHTML = log;

}





function updateReport(){

    if(sleepEntries.length === 0){
        return;
    }



    let totalSleep = 0;
    let totalQuality = 0;


    for(let i = 0; i < sleepEntries.length; i++){

        totalSleep += Number(sleepEntries[i].hours);

        totalQuality += Number(sleepEntries[i].quality);

    }



    let averageSleep =
    (totalSleep / sleepEntries.length).toFixed(1);



    let averageQuality =
    (totalQuality / sleepEntries.length).toFixed(1);



    let bestNight = sleepEntries[0];


    for(let i = 1; i < sleepEntries.length; i++){

        if(Number(sleepEntries[i].hours) > Number(bestNight.hours)){

            bestNight = sleepEntries[i];

        }

    }



    document.getElementById("reportAverageSleep").innerHTML =
        "Average Sleep: " + averageSleep + " hours";


    document.getElementById("reportAverageQuality").innerHTML =
        "Average Sleep Quality: " + averageQuality + "/10";


    document.getElementById("reportBestNight").innerHTML =
        "Best Sleep Night: " + bestNight.date +
        " (" + bestNight.hours + " hours)";


    document.getElementById("reportTotalNights").innerHTML =
        "Total Nights Logged: " + sleepEntries.length;


    // Also update the extra statistics at bottom
    document.getElementById("averageSleep").innerHTML =
        "Average Sleep: " + averageSleep + " hours";


    document.getElementById("averageQuality").innerHTML =
        "Average Quality: " + averageQuality;

}





function exportReport(){

    if(sleepEntries.length === 0){

        alert("No sleep data available to export.");

        return;

    }



    let report = JSON.stringify(
        sleepEntries,
        null,
        2
    );



    let file = new Blob(
        [report],
        {
            type: "application/json"
        }
    );



    let link = document.createElement("a");

    link.href = URL.createObjectURL(file);

    link.download = "Sleep_Tracker_Report.json";

    link.click();

}





function resetData(){

    let confirmReset = confirm(
        "Are you sure you want to delete all sleep data?"
    );


    if(confirmReset){

        sleepEntries = [];


        localStorage.removeItem("sleepEntries");


        displayEntries();

        updateReport();


        document.getElementById("hoursSlept").innerHTML =
        "Hours Slept:";


        alert("Sleep data has been reset.");

    }

}





// Load saved information when opening website
displayEntries();

updateReport();
