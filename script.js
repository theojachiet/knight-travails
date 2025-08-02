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

function eliminateDuplicates(visited, toVisit) {
    return toVisit.filter(([x, y]) => 
        !visited.some(([vx, vy]) => vx === x && vy === y)
    );
}

function findDestination(departure, destination) {
    let queue = [];
    let visited = [];
    let steps = 0;
    queue.push(departure);

    while(queue.length > 0) {
        let current = queue[0];
        steps++;

        //Find all possible paths and relive duplicates
        let toVisit = findEdges(current);
        toVisit = eliminateDuplicates(visited, toVisit);

        //Check if the destination is encountered
        if (toVisit.some(([x, y]) => x === destination[0] && y === destination[1])) {
            return `Destination found in ${steps} steps`;
        }

        //Update queue and visited arrays
        visited = visited.concat(toVisit);
        queue = queue.concat(toVisit);

        queue.shift();
    }
}

console.log(findDestination([3, 3], [4, 3]));