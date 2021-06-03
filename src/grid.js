class Grid {
    constructor(rows, cols, resolution) {
        this.rows = rows / resolution;
        this.cols = cols / resolution;
        this.grid = this.createGrid(this.rows, this.cols);
        this.res = resolution;
    }

    createGrid(rows, cols) {
        let grid = [];

        for (let row = 0; row < rows; row++) {
            grid.push([]);
            for (let col = 0; col < cols; col++) {
                grid[row].push(floor(random(2)));
            }
        }

        return grid;
    }

    drawGrid() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.grid[row][col] == 0) {
                    fill(255);
                } else {
                    fill(0);
                }
                rect(col * this.res, row * this.res, this.res, this.res);
            }
        }
    }

    nextGeneration() {
        let nextGrid = new Grid(this.rows * this.res, this.cols * this.res, this.res);

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                let cell = this.grid[row][col];
                let neighbour = this.countNeighbour(this.grid, row, col);

                if (cell === 0 && neighbour === 3) {
                    nextGrid.grid[row][col] = 1;
                } else if (cell === 1 && (neighbour < 2 || neighbour > 3)) {
                    nextGrid.grid[row][col] = 0;
                } else {
                    nextGrid.grid[row][col] = cell;
                }
            }
        }

        return nextGrid;
    }

    countNeighbour(grid, row, col) {
        let sum = 0;
        
        for (let rowOffset = -1; rowOffset < 2; rowOffset++) {
            for (let colOffset = -1; colOffset < 2; colOffset++) {
                let x = (((row + rowOffset) % this.rows) + this.rows) % this.rows;
                let y = (((col + colOffset) % this.cols) + this.cols) % this.cols;
                sum += grid[x][y];
            }
        }

        sum -= grid[row][col];

        return sum;
    }
}
