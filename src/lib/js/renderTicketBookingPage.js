function renderTicketBookingPage(data) {
    console.log("BOOK TICKETS FOR ~~~~~~~~~~~ " + data.title);

    let theatre = document.createElement("div");
    theatre.className = "theatre";

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
    pTag.innerHTML = `You have selected <span id="count">0</span> seats for a price of $<span id="total">0</span>`;

    // append to theatre.
    theatre.appendChild(pTag);

    document.getElementById("bookTickets").appendChild(theatre)

}

export { renderTicketBookingPage };