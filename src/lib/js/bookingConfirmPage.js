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

    let pBookingID = document.createElement("p");
    pBookingID.innerHTML = `
        <span style="color:black;font-weight:bold">BookingID : </span> ${Math.floor(Math.random() * 1000000000)}
    `;

    ticketContent.appendChild(pSeats);
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

}

export { renderBookingConfirmation };