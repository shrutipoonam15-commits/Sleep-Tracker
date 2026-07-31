let sleepEntries = JSON.parse(localStorage.getItem("sleepEntries")) || [];

let participantID = localStorage.getItem("participantID") || "";


function calculateSleep(){

    // Get participant information
    let participant = document.getElementById("participantID").value;

    localStorage.setItem("participantID", participant);

    participantID = participant;


    // Get sleep inputs
    let bedtime = document.getElementById("bedtime").value;
    let waketime = document.getElementById("waketime").value;
    let quality = document.getElementById("quality").value;
    let entryDate = document.getElementById("entryDate").value;
    let outsideTime = document.getElementById("outsideTime").value;


    // Make sure times are entered
    if (bedtime === "" || waketime === ""){
        alert("Please enter bedtime and wake time.");
        return;
    }


    // Convert times
    let bed = bedtime.split(":");
    let wake = waketime.split(":");


    let bedMinutes = Number(bed[0]) * 60 + Number(bed[1]);
    let wakeMinutes = Number(wake[0]) * 60 + Number(wake[1]);


    // Handle sleeping after midnight
    if (wakeMinutes < bedMinutes){
        wakeMinutes += 24 * 60;
    }


    // Calculate hours slept
    let totalMinutes = wakeMinutes - bedMinutes;

    let hours = (totalMinutes / 60).toFixed(1);


    // Show hours slept
    document.getElementById("hoursSlept").innerHTML =
        "Hours Slept: " + hours;



    // Create entry
    let entry = {

        participant: participantID,
        date: entryDate,
        hours: hours,
        quality: Number(quality),
        outsideTime: outsideTime

    };


    // Save entry
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



    // Average sleep
    let totalHours = 0;


    for(let i = 0; i < sleepEntries.length; i++){

        totalHours += Number(sleepEntries[i].hours);

    }


    let averageSleep = 
    (totalHours / sleepEntries.length).toFixed(1);



    // Average quality
    let totalQuality = 0;


    for(let i = 0; i < sleepEntries.length; i++){

        totalQuality += Number(sleepEntries[i].quality);

    }


    let averageQuality =
    (totalQuality / sleepEntries.length).toFixed(1);



    // Find best sleep night
    let bestNight = sleepEntries[0];


    for(let i = 1; i < sleepEntries.length; i++){

        if(Number(sleepEntries[i].hours) > Number(bestNight.hours)){

            bestNight = sleepEntries[i];

        }

    }



    // Display statistics

    let averageSleepElement =
    document.getElementById("averageSleep");


    if(averageSleepElement){

        averageSleepElement.innerHTML =
        "Average Sleep: " + averageSleep + " hours";

    }



    let averageQualityElement =
    document.getElementById("averageQuality");


    if(averageQualityElement){

        averageQualityElement.innerHTML =
        "Average Sleep Quality: " + averageQuality;

    }



    let bestNightElement =
    document.getElementById("bestNight");


    if(bestNightElement){

        bestNightElement.innerHTML =
        "Best Sleep Night: " + bestNight.date;

    }



    let totalNightsElement =
    document.getElementById("totalNights");


    if(totalNightsElement){

        totalNightsElement.innerHTML =
        "Total Nights Logged: " + sleepEntries.length;

    }

}



// Load previous data when page opens
displayEntries();

updateStats();
