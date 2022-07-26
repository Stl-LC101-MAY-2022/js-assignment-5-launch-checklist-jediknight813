require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    console.log(imageUrl)
    let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
            <ol>
                <li>Name: ${name}</li>
                <li>Diameter: ${diameter}</li>
                <li>Star: ${star}</li>
                <li>Distance from Earth: ${distance}</li>
                <li>Number of Moons: ${moons}</li>
            </ol>
        <img src=${imageUrl}>
        `
}


function validateInput(testInput) {
   if (testInput === undefined || testInput == ""){ 
        return "Empty"
   }
   if (isNaN(testInput) === true) { 
        return "Not a Number"
    }
    else {
        return "Is a Number"
    }
}


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let form_input_passed = true
    let launchStatus = document.getElementById("launchStatus")
    let pilotStatus = document.getElementById("pilotStatus")
    let copilotStatus = document.getElementById("copilotStatus")
    let fuelStatus = document.getElementById("fuelStatus")
    let cargoStatus = document.getElementById("cargoStatus")
    list.style.visibility = 'hidden';

    if (validateInput(pilot) == "Empty" || validateInput(pilot) == "Is a Number") {
        alert("incorrect pilot name input")
        form_input_passed = false
    }


    if (validateInput(copilot) == "Empty" || validateInput(copilot) == "Is a Number") {
        alert("incorrect copilot name input")
        form_input_passed = false
    }


    if (validateInput(fuelLevel) == "Empty" || validateInput(fuelLevel) == "Not a Number") {
        alert("incorrect fuelLevel input")
        form_input_passed = false
    }


    if (validateInput(cargoLevel) == "Empty" || validateInput(cargoLevel) == "Not a Number") {
        alert("incorrect fuelLevel input")
        form_input_passed = false
    }


    let launch_checks_passed = true
    if (form_input_passed == true) {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`

        if (fuelLevel < 10000) {
            list.style.visibility = 'visible';
            launchStatus.style.color = `red`;
            fuelStatus.innerHTML = `Not enough fuel for journey.`;
            launchStatus.innerHTML = `Shuttle not ready for launch.`;
            launch_checks_passed = false
        }

        if (cargoLevel > 10000) {
            console.log(cargoLevel)
            list.style.visibility = 'visible';
            launchStatus.style.color = `red`;
            launchStatus.innerHTML = `Shuttle not ready for launch.`;
            cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
            launch_checks_passed = false
        }

    }

    if (launch_checks_passed = true && form_input_passed == true) {
        launchStatus.innerHTML = "Shuttle is ready for launch"
        launchStatus.style.color = 'green'
    }
}


async function myFetch() {
    let planetsReturned;
    planetsReturned = fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        planetsReturned = response.json()
        return planetsReturned
    });
    return planetsReturned
}

function pickPlanet(planets) {
    if (planets !== undefined) {
        return planets[Math.floor(Math.random()*planets.length)];
    }
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;