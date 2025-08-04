import { Graph } from "./graph.js";

function findEdges([x, y]) {
    const moves = [
        [1, 2], [-1, 2], [1, -2], [-1, -2],
        [2, 1], [-2, 1], [2, -1], [-2, -1],
    ];

    return moves
        .map(([dx, dy]) => [x + dx, y + dy])
        .filter(([nx, ny]) => nx >= 0 && nx < 8 && ny >= 0 && ny < 8);
}

function eliminateDuplicates(visited, toVisit) {
    return toVisit.filter(([x, y]) =>
        !visited.some(([vx, vy]) => vx === x && vy === y)
    );
}

function findDestination(departure, destination) {
    //Map to store the path and backtrack the shortest one after destination is found
    //key : [neighbour(next)], value : [current(previous)]
    let prev = new Map();

    //Queue Array for BFS and enqueue the departure to begin the algorithm
    let q = [];
    q.push(departure);

    //Using a set for the visited vertices
    let visited = new Set();

    function positionToString(pos) {
        return `${pos[0]},${pos[1]}`;
    }

    function stringToPosition(str) {
        let strArray = str.split(',');
        return [Number(strArray[0]), Number(strArray[1])];
    }

    //Mark the departure as visited
    visited.add(positionToString(departure));

    while (q.length > 0) {
        //Dequeue a vertex and store it for reference
        const current = q.shift();
        const currentStr = positionToString(current);

        //Exit the loop when we find the destination
        if (currentStr === positionToString(destination)) break;

        for (const neighbour of findEdges(current)) {
            const neighbourStr = positionToString(neighbour);
            if (!visited.has(neighbourStr)) {
                visited.add(neighbourStr);
                prev.set(neighbourStr, currentStr);
                q.push(neighbour);
            }
        }
    }

    //Starting a path array at the destination
    const path = [];
    let currentStr = positionToString(destination);

    //Backtrack Algorithm
    while (currentStr !== positionToString(departure)) {
        path.push(stringToPosition(currentStr));
        //key : [neighbour(next)], value : [current(previous)]
        //So we get the previous by getting the value of the current key in the map.
        currentStr = prev.get(currentStr);
        if (!currentStr) return [];
    }

    //Pushing the departure and reversing the array to have an ordered path;
    path.push(departure);
    path.reverse();

    return path;
}

function displayPath(source, target) {
    const path = findDestination(source, target);
    console.log(`Path found in ${path.length - 1} step(s) !`);
    path.forEach(p => console.log(p));
}

displayPath([0, 0], [7, 7]);