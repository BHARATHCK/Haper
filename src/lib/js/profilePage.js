import { deleteCookie } from "./authGuard";

let renderProfilePage = (user) => {

    let mainDiv = document.createElement("div");
    mainDiv.className = "profileWrapper";

    let profilePicture = document.createElement("img");
    profilePicture.className = "profile-picture";
    profilePicture.src = "https://i.ibb.co/270h1Qd/unknown.jpg";


    let profileInfo = document.createElement("div");
    profileInfo.className = "profile-data"

    let logoutButton = document.createElement("button");
    logoutButton.className = "log-out-button";
    logoutButton.innerText = "Log Out";

    logoutButton.addEventListener("click", () => {
        deleteCookie("auth");
        document.location.hash = "routechange-trending";
    })

    let pTag1 = document.createElement("p");
    pTag1.innerHTML = `<span style="color:black;font-weight:bold" >Name : </span>${user.displayName}`

    let pTag2 = document.createElement("p");
    pTag2.innerHTML = `<span style="color:black;font-weight:bold">Email : </span>${user.email}`

    let pTag3 = document.createElement("p");
    pTag3.innerHTML = `<span style="color:black;font-weight:bold">Tickets Booked : </span>${user.bookedTicketHistory.length}`

    profileInfo.appendChild(pTag1);
    profileInfo.appendChild(pTag2);
    profileInfo.appendChild(pTag3);

    mainDiv.appendChild(profilePicture);
    mainDiv.appendChild(profileInfo);
    mainDiv.appendChild(logoutButton);

    for (let i = 0; i < user.bookedTicketHistory.length; i++) {
        let ticketDiv = document.createElement("div");
        ticketDiv.className = "ticket"

        let ticketContent = document.createElement("div");
        ticketContent.className = "ticket-content";

        let pSeats = document.createElement("p");
        pSeats.innerHTML = `<span style="black:blue;font-weight:bold">Seats : </span> ${user.bookedTicketHistory[i].seats}`;

        let pMovieName = document.createElement("p");
        pMovieName.innerHTML = `<span style="black:blue;font-weight:bold">Movie : </span> ${user.bookedTicketHistory[i].movieName}`;

        let pookingId = document.createElement("p");
        pookingId.innerHTML = `<span style="black:blue;font-weight:bold">BookingID : </span> ${user.bookedTicketHistory[i].bookingID}`;

        ticketContent.appendChild(pSeats);
        ticketContent.appendChild(pMovieName);
        ticketContent.appendChild(pookingId);


        ticketDiv.appendChild(ticketContent);
        mainDiv.appendChild(ticketDiv);
    }

    return mainDiv;
}

export { renderProfilePage }