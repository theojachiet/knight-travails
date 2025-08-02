function findEdges(departure) {
    let destinations = [];
    let x = departure[0];
    let y = departure[1];

    destinations.push([x + 1, y + 2]);
    destinations.push([x - 1, y + 2]);
    destinations.push([x + 1, y - 2]);
    destinations.push([x - 1, y - 2]);
    destinations.push([x + 2, y + 1]);
    destinations.push([x - 2, y + 1]);
    destinations.push([x + 2, y - 1]);
    destinations.push([x - 2, y - 1]);

    destinations = destinations.filter(([x, y]) => (x > 0 && x < 7 && y > 0 && y < 7));

    return destinations;
}

console.log(findEdges([0, 0]));