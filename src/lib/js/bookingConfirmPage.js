import { updateUserProfileWithTicketBooking, getUserProfile } from "./cloudFireStore";

let renderBookingConfirmation = () => {

    let confimationDiv = document.createElement("div");
    confimationDiv.className = "successMessage";

    let pTag = document.createElement("p");
    pTag.innerText = "Thank you for your purchase!";
    pTag.style.fontWeight = "900";

    confimationDiv.appendChild(pTag);

    //return confimationDiv;

    let ticketDetails = document.createElement("div");
    ticketDetails.className = "ticket";

    let ticketContent = document.createElement("div");
    ticketContent.className = "ticket-content";

    let pSeats = document.createElement("p");
    pSeats.innerHTML = `
        <span style="black:blue;font-weight:bold">Seats : </span> ${JSON.parse(sessionStorage.getItem("seatSelection"))}
    `;

    let pmovieTitle = document.createElement("p");
    pmovieTitle.innerHTML = `
        <span style="color:black;font-weight:bold">Movie : </span> ${sessionStorage.getItem("movieName")}
    `;

    let pBookingID = document.createElement("p");
    let bookingID = Math.floor(Math.random() * 1000000000);
    pBookingID.innerHTML = `
        <span style="color:black;font-weight:bold">BookingID : </span> ${bookingID}
    `;

    ticketContent.appendChild(pSeats);
    ticketContent.appendChild(pmovieTitle);
    ticketContent.appendChild(pBookingID);

    ticketDetails.appendChild(ticketContent);

    let takeMeBackDiv = document.createElement("div");
    takeMeBackDiv.innerText = "Cool! Take me back.";
    takeMeBackDiv.className = "paymentLink";
    takeMeBackDiv.addEventListener("click", () => {
        location.href = location.origin + location.pathname;
    })


    document.getElementById("bookTickets").innerHTML = null;
    document.getElementById("bookTickets").appendChild(confimationDiv);
    document.getElementById("bookTickets").appendChild(ticketDetails);
    document.getElementById("bookTickets").appendChild(takeMeBackDiv);

    // Add the info to userObject for history
    let bookedTicketHistory = {
        movieName: sessionStorage.getItem("movieName"),
        seats: JSON.parse(sessionStorage.getItem("seatSelection")),
        bookingID: bookingID
    };

    let uid = document.cookie.match(RegExp('(?:^|;\\s*)' + "uid" + '=([^;]*)'));

    getUserProfile(uid[1]).then(data => {
        console.log(data);
        data.bookedTicketHistory.push(bookedTicketHistory)
        updateUserProfileWithTicketBooking(data);
    }).catch(error => {
        console.log(error);
    });
}

export { renderBookingConfirmation };