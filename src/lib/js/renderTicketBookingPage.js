import { renderBookingConfirmation } from "./bookingConfirmPage";

let ticketPrice;
let totalSeatsSelected = 0;
let seatsDetails = [];

function renderTicketBookingPage(data) {

    seatsDetails.length = 0;

    let theatre = document.createElement("div");
    theatre.className = "theatre";

    // Test displaying movie name and cost of ticket.
    let movieDetailsDiv = document.createElement("div");
    movieDetailsDiv.className = "movie-container";
    movieDetailsDiv.innerText = `Select seats for ${data.title} priced at ${randomTicketPrice(300,400)} INR/- Each.`;
    sessionStorage.setItem("movieName", data.title);
    theatre.appendChild(movieDetailsDiv);

    // Create a div for displaying seat topography
    let showcase = document.createElement("ul");
    showcase.className = "showcase";

    // create list items
    let listItem1 = document.createElement("li");

    let seatSelected = document.createElement("div");
    seatSelected.className = "seat selected";

    let smallItem1 = document.createElement("small");
    smallItem1.innerText = "Selected";

    listItem1.appendChild(seatSelected);
    listItem1.appendChild(smallItem1);

    let listItem2 = document.createElement("li");

    let occupiedSeat = document.createElement("div");
    occupiedSeat.className = "seat occupied";

    let smallItem2 = document.createElement("small");
    smallItem2.innerText = "Occupied";

    listItem2.appendChild(occupiedSeat);
    listItem2.appendChild(smallItem2);

    showcase.appendChild(listItem1);
    showcase.appendChild(listItem2);
    theatre.appendChild(showcase);

    // Layout of seats
    let seatsContainer = document.createElement("div");
    seatsContainer.className = "seatsContainer";

    // Screen
    let screen = document.createElement("div");
    screen.className = "screen";

    seatsContainer.appendChild(screen);


    // Rows of seats
    for (let row = 0; row < 7; row++) {
        let rowDiv = document.createElement("div");
        rowDiv.className = "row";

        // create seats for the rowDiv
        for (let seat = 0; seat < 9; seat++) {
            let seatDiv = document.createElement("div");
            seatDiv.className = "seat";
            seatDiv.id = `row:${row+1}|seat:${seat+1}`;

            // append to row
            rowDiv.appendChild(seatDiv);
        }

        // append to seatsContainer
        seatsContainer.appendChild(rowDiv);

    }

    // append to theatre
    theatre.appendChild(seatsContainer);

    // Text to diplay Price and seats selected
    let pTag = document.createElement("p");
    pTag.className = "text";
    pTag.innerHTML = `You have selected <span id="count">0</span> seats for a price of INR<span id="total">0</span>/-`;

    let paymentTag = document.createElement("a");
    paymentTag.className = "paymentLink";
    paymentTag.innerText = "Proceed to Payment";
    paymentTag.style.display = "none";
    paymentTag.addEventListener("click", (e) => {
        e.preventDefault();
        renderBookingConfirmation();
    })

    // append to theatre.
    theatre.appendChild(pTag);
    theatre.appendChild(paymentTag);

    document.getElementById("bookTickets").appendChild(theatre);

    // add eventListener to each seat to select it.
    document.querySelectorAll(".seat").forEach(seatItem => {
        seatItem.addEventListener("click", handleSeatSelection);
    });

}

function randomTicketPrice(min, max) {
    return ticketPrice = Math.floor(Math.random() * (max - min + 1)) + min;
}

// Handle price of selected seats.
function calculateTotalTicketPrice() {
    let selectedSeats = document.querySelectorAll('.row .seat.selected');
    totalSeatsSelected = selectedSeats.length;
    document.getElementById("count").innerText = selectedSeats.length;
    document.getElementById("total").innerText = selectedSeats.length * ticketPrice;
    getSelectedSeatsDetails(selectedSeats);
    renderLinkForPayment();
}

function handleSeatSelection(event) {
    if (event.target.className == "seat selected") {
        event.target.className = "seat";
    } else {
        event.target.className = "seat selected";
    }
    calculateTotalTicketPrice();
}

function renderLinkForPayment() {
    let paymentLink = document.querySelector(".paymentLink");
    if (totalSeatsSelected > 0) {
        if (paymentLink.style.display == "none") {
            paymentLink.style.display = "block";
        }
    } else {
        paymentLink.style.display = "none"
    }
}

function getSelectedSeatsDetails(seatsArr) {
    let seatsDetails = []
    for (let seat of seatsArr) {
        seatsDetails.push(seat.id);
    }

    sessionStorage.setItem("seatSelection", JSON.stringify(seatsDetails.join(", ")));

}

export { renderTicketBookingPage };