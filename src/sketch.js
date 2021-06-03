let firstGrid, nextGrid;

function setup() {
    let res = 10;
    createCanvas(800, 400);
    firstGrid = new Grid(height, width, res);
    frameRate(20);
}

function draw() {
    background(200);
    nextGrid = firstGrid.nextGeneration();
    nextGrid.drawGrid();
    firstGrid = nextGrid;
}
