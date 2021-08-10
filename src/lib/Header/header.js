function invokeLocationSelector() {
    // invoke html for enabling user to select a location.

    var x = document.querySelector(".location-picker-card");
    console.log(x.style.display);
    if (x.style.display === "none" || x.style.display == "") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function changeLocationImage(location) {
    console.log(location);
    location.target.style.fill = 'red';
    console.log("VALUE ------> " + document.getElementsByClassName("dropbtn").value);
    document.querySelector(".dropbtn").innerHTML = "MUMBAI";
    invokeLocationSelector();
}

export { changeLocationImage, invokeLocationSelector };