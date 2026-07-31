let sleepEntries = JSON.parse(localStorage.getItem("sleepEntries")) || [];

let participantID = localStorage.getItem("participantID") || "";


function calculateSleep(){

    // Save participant ID
    let participant = document.getElementById("participantID").value;

    localStorage.setItem("participantID", participant);

    participantID = participant;


    // Get sleep information
    let bedtime = document.getElementById("bedtime").value;
    let waketime = document.getElementById("waketime").value;
    let quality = document.getElementById("quality").value;
    let entryDate = document.getElementById("entryDate").value;
    let outsideTime = document.getElementById("outsideTime").value;


    // Check that times were entered
    if (bedtime === "" || waketime === "") {
        alert("Please enter your bedtime and wake time.");
        return;
    }


    // Split times
    let bed = bedtime.split(":");
    let wake = waketime.split(":");


    // Convert times to minutes
    let bedMinutes = Number(bed[0]) * 60 + Number(bed[1]);
    let wakeMinutes = Number(wake[0]) * 60 + Number(wake[1]);


    // Handle sleeping past midnight
    if (wakeMinutes < bedMinutes) {
        wakeMinutes += 24 * 60;
    }


    // Calculate hours slept
    let totalMinutes = wakeMinutes - bedMinutes;

    let hours = (totalMinutes / 60).toFixed(1);


    // Display result
    document.getElementById("hoursSlept").innerHTML =
        "Hours Slept: " + hours;


    // Create sleep entry
    let entry = {
        participant: participantID,
        date: entryDate,
        hours: hours,
        quality: quality,
        outsideTime: outsideTime
    };


    // Add entry to list
    sleepEntries.push(entry);


    // Save entries
    localStorage.setItem(
        "sleepEntries",
        JSON.stringify(sleepEntries)
    );


    // Update display
    displayEntries();

}



function displayEntries(){

    let log = "";


    for (let i = 0; i < sleepEntries.length; i++) {

        log += 
        "<p>" +
        "Participant: " + sleepEntries[i].participant +
        "<br>Date: " + sleepEntries[i].date +
        "<br>Hours Slept: " + sleepEntries[i].hours +
        "<br>Sleep Quality: " + sleepEntries[i].quality +
        "<br>Outside Time: " + sleepEntries[i].outsideTime +
        "</p>";
    }


    let sleepLog = document.getElementById("sleepLog");

    if (sleepLog) {
        sleepLog.innerHTML = log;
    }

}


// Load saved entries when page opens
displayEntries();
