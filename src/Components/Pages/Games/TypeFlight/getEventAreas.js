
export const getEventArea = (eventPosition, eventType) => {
    if (eventType === "bomb") {
        let hitSpots = {
            topLeft: eventPosition - 11,
            topMiddle: eventPosition - 10,
            topRight: eventPosition - 9,
            middleLeft: eventPosition - 1,
            middleMiddle: eventPosition,
            middleRight: eventPosition + 1,
            bottomLeft: eventPosition + 9,
            bottomMiddle: eventPosition + 10,
            bottomRight: eventPosition + 11
        }
        // if event position ends with 9 subtract 9 for the right 3 (instead of adding 1 so actually subtract 10)
        if (eventPosition % 10 === 9) {
            hitSpots.topRight -= 10;
            hitSpots.middleRight -= 10;
            hitSpots.bottomRight -= 10;
        }
        // if event position ends with 0 add 9 (so actually 10) for the left 3
        if (eventPosition % 10 === 0) {
            hitSpots.topLeft += 10;
            hitSpots.middleLeft += 10;
            hitSpots.bottomLeft += 10;
        }
        // if event position starts with 9 subtract 90 (so actually 100) for bottom 3
        if (eventPosition >= 90) {
            hitSpots.bottomLeft -= 100;
            hitSpots.bottomMiddle -= 100;
            hitSpots.bottomRight -= 100;
        }
        // if event position less than 10 add 90 (so actually 100) for top 3
        if (eventPosition < 10) {
            hitSpots.topLeft += 100;
            hitSpots.topMiddle += 100;
            hitSpots.topRight += 100;
        }
        return hitSpots;
    } else {
        return {eventPosition};
    }
}