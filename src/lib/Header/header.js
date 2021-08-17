function invokeLocationSelector() {
    // invoke html for enabling user to select a location.

    var x = document.querySelector(".location-picker-card");
    if (x.style.display === "none" || x.style.display == "") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function changeLocationImage(location) {
    location.target.style.fill = 'red';
    document.querySelector(".dropbtn").innerHTML = "MUMBAI";
    invokeLocationSelector();
}

export { changeLocationImage, invokeLocationSelector };