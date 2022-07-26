//const { addDestinationInfo } = require("./scriptHelper");


window.addEventListener("load", function() {
    let destination;
    const form = document.getElementById('launchForm');
    let listedPlanets;


    function FormSubmit(event) {
        event.preventDefault();
        getFormData = (selector) => Object.fromEntries(new FormData(document.querySelector(selector)))
        let list = document.getElementById('faultyItems');
        let formData = getFormData('#Form')
        formSubmission(document, list, formData['pilotName'], formData['copilotName'], formData['fuelLevel'], formData['cargoMass'] )
    }

    form.addEventListener('submit', FormSubmit);


    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
    }).then(function () {
        destination = pickPlanet(listedPlanets)
        addDestinationInfo(document, destination.name, destination.diameter, destination.star, destination.distance, destination.moons, destination.image)
    })
   
});