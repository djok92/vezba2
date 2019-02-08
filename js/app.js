class Matrix {

    static generateMatrix() {
        const matrixStart = [
            [0,0,0,1,0,0,1,0,0,0],
            [0,5,0,1,0,0,1,1,1,0],
            [0,0,1,1,0,1,0,3,1,0],
            [0,0,0,2,0,1,0,0,0,0],
            [0,0,1,0,0,1,0,0,0,0],
            [0,2,1,0,0,1,3,0,0,0],
            [0,1,1,1,1,1,0,1,0,1],
            [0,0,1,0,1,0,0,1,0,0],
            [0,0,1,3,1,0,0,0,1,0],
            [0,0,0,0,0,0,0,1,0,4]
        ];
        return matrixStart;
    }

    static generateTable(generatedMatrix) {
        const matrix = generatedMatrix;
        const table = document.createElement("table");
        const tableContainer = document.querySelector(".table-container");
        for(let i = 0; i < matrix.length; i++) {
           const row = document.createElement("tr");
           for(let j = 0; j < matrix[i].length; j++) {
                const field = document.createElement("td");
                switch(matrix[i][j]) {
                    case 1: 
                        field.classList.remove("wall", "boost", "enemy", "goal", "player");
                        field.classList.add("wall");
                        break
                    case 2: 
                        field.classList.remove("wall", "boost", "enemy", "goal", "player");
                        field.innerHTML = ""
                        field.classList.add("boost");
                        field.innerHTML = `<img src="/img/boost.jpg"></img>`;
                        break
                    case 3:
                        field.classList.remove("wall", "boost", "enemy", "goal", "player");
                        field.innerHTML = ""
                        field.classList.add("enemy");
                        field.innerHTML = `<img src=/img/enemies.jpg></img>`;
                        break
                    case 4:
                        field.classList.remove("wall", "boost", "enemy", "goal", "player");
                        field.innerHTML = ""
                        field.classList.add("goal");
                        field.innerHTML = `<img src=/img/goal.jpg></img>`;
                        break
                    case 5:
                        field.classList.remove("wall", "boost", "enemy", "goal", "player");
                        field.innerHTML = ""
                        field.classList.add("player");
                        field.innerHTML = `<img src=/img/r2d2.jpg></img>`;
                        break
                }
                row.appendChild(field);
                table.appendChild(row);
            }
        }
        table.classList.add("board");
        tableContainer.appendChild(table);
        return matrix
    }
}


class R2D2 {
   
    constructor() {
        this.x = 1;
        this.y = 1;
        this.battery = 100;
        this.matrix = Matrix.generateMatrix();
        this.currPos = this.matrix[this.y][this.x];
    }

    move(event) {
        const table = document.querySelector("table");
        const tableContainer = document.querySelector(".table-container");
        
        if (event.keyCode !== 123) {
            event.preventDefault();
        }

        if(this.battery >= 0) {
            switch(event.keyCode) {
                case 32: //spacebar
                    console.log("space pressed");
                    break
                case 37: //left arrow
                    //prevent walking out of map
                    if(this.x > 0) {
                        //prevent walking trough walls
                        if(this.matrix[this.y][this.x -1] !== 1) {
                            this.x--;
                            this.matrix[this.y][this.x] = 5;
                            this.matrix[this.y][this.x + 1] = 0;
                            this.battery -= 5;
                        }
                        tableContainer.removeChild(table);
                        Matrix.generateTable(this.matrix);
                    }
                    break
                case 39: //right arrow
                    //prevent walking out of map
                    if(this.x < 9) {
                        //prevent walking trough walls
                        if(this.matrix[this.y][this.x + 1] !== 1) {
                            this.x++;
                            this.battery -= 5;
                            if(this.x > 0) {
                                this.matrix[this.y][this.x] = 5;
                                this.matrix[this.y][this.x - 1] = 0;
                            } else if(this.x === 0) { //prevent stucking
                                this.matrix[this.y][this.x + 1] = 5;
                                this.matrix[this.y][this.x - 0] = 0;
                            }
                        }
                    } 
                    tableContainer.removeChild(table);
                    Matrix.generateTable(this.matrix);
                    break
                case 38: //up arrow
                    //prevent walking out of map
                    if(this.y > 0) {
                        //prevent walking trough walls
                        if(this.matrix[this.y - 1][this.x] !== 1) {
                            this.y--;
                            this.battery -= 5;
                            this.matrix[this.y][this.x] = 5;
                            this.matrix[this.y + 1][this.x] = 0;
                        }  
                    }
                    tableContainer.removeChild(table);
                    Matrix.generateTable(this.matrix);
                    break
                case 40: //down arrow
                    //prevent walking out of map
                    if(this.y < 9) {
                        //prevent walking trough walls
                        if(this.matrix[this.y + 1][this.x] !== 1) {
                            this.y++;
                            this.battery -= 5;
                            if(this.y > 0) {
                                this.matrix[this.y][this.x] = 5;
                                this.matrix[this.y - 1][this.x] = 0;
                            } else if(this.y === 0) { //prevent stucking
                                this.matrix[this.y + 1][this.x] = 5;
                                this.matrix[this.y][this.x] = 0;
                            }
                        }   
                    }
                    tableContainer.removeChild(table);
                    Matrix.generateTable(this.matrix);
                    break
            } 
        }   else {
            alert("You ran out of battery :( !")
        }
    }
}

class UI {
    static initUI() {
        const player = new R2D2();
        const startContainer = document.querySelector(".container-start");
        Matrix.generateTable(Matrix.generateMatrix());
        startContainer.style.display = "none";
        document.body.addEventListener("keydown", e => { player.move(e) })
    }
}


const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", function(){
    UI.initUI();
});

