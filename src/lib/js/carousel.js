let carouselInterval = null;
let getCarouselDiv = (carouselBackDrops) => {

    let carouselDiv = document.createElement("div");
    carouselDiv.className = "carousel";

    carouselBackDrops.forEach((backDrop, i) => {
        let img = document.createElement("img");
        if (i == 0) {
            img.className = "carousel__photo initial";
        } else {
            img.className = "carousel__photo"
        }
        img.src = "https://image.tmdb.org/t/p/original" + backDrop;

        carouselDiv.appendChild(img);
    });

    return carouselDiv;
}

let initializeCarousel = () => {

    let itemClassName = "carousel__photo";
    let items = document.getElementsByClassName(itemClassName);
    let totalItems = items.length;
    let slide = 0;
    let moving = false;

    function setInitialClasses() {
        // Targets the previous, current, and next items
        // This assumes there are at least three items.
        items[totalItems - 1].classList.add("prev");
        items[0].classList.add("active");
        items[1].classList.add("next");
    }


    function moveCarouselTo() {
        // Check if carousel is moving, if not, allow interaction
        if (!moving) {
            // Update the "old" adjacent slides with "new" ones
            var newPrevious = slide - 1,
                newNext = slide + 1,
                oldPrevious = slide - 2,
                oldNext = slide + 2;
            // Test if carousel has more than three items
            if ((totalItems - 1) > 3) {
                // Checks and updates if the new slides are out of bounds
                if (newPrevious <= 0) {
                    oldPrevious = (totalItems - 1);
                } else if (newNext >= (totalItems - 1)) {
                    oldNext = 0;
                }
                // Checks and updates if slide is at the beginning/end
                if (slide === 0) {
                    newPrevious = (totalItems - 1);
                    oldPrevious = (totalItems - 2);
                    oldNext = (slide + 1);
                } else if (slide === (totalItems - 1)) {
                    newPrevious = (slide - 1);
                    newNext = 0;
                    oldNext = 1;
                }

                items[oldPrevious].className = itemClassName;
                items[oldNext].className = itemClassName;
                // Add new classes
                items[newPrevious].className = itemClassName + " prev";
                items[slide].className = itemClassName + " active";
                items[newNext].className = itemClassName + " next";
            }
        }
    }

    // Next navigation handler
    function moveNext() {
        // Check if moving
        if (!moving) {
            // If it's the last slide, reset to 0, else +1
            if (slide === (totalItems - 1)) {
                slide = 0;
            } else {
                slide++;
            }
            // Move carousel to updated slide
            moveCarouselTo(slide);
        }
    }

    setInitialClasses();
    carouselInterval = setInterval(moveNext, 6000);

}

export { getCarouselDiv, initializeCarousel, carouselInterval };