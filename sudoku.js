var Board = function(side_length) {
    // do initialization here... 
    this.dataSource = [
                        ['0','8','0','1','0','0','0','0','7'],
                        ['0','0','0','0','7','0','9','0','0'],
                        ['0','2','6','0','0','0','0','3','0'],
                        ['0','0','0','2','0','0','3','0','0'],
                        ['9','0','0','0','0','0','0','8','2'],
                        ['0','0','2','0','4','7','0','0','0'],
                        ['0','1','0','0','0','0','8','4','0'],
                        ['0','0','7','0','2','0','0','0','0'],
                        ['0','0','0','0','0','3','0','7','0'],
                    ]
        
};

Board.prototype.square_is = function(row, col, value) {
    // do stuff...
    // put the new data into the array
    this.dataSource[parseInt(row) -1][parseInt(col) - 1] = value

};

Board.prototype.win = function() {
    // returns yes or no, when each row is fully filled in with unique number from 1 to n, and each column is fully filled in with unique number from 1 to n, each group cell (a small set of cell) is fully filled in with unique number from 1 to n. like the given sample picture
    
    // // check containes 0 or not and check whether every row has repeat value or not
    for(var i=0;i<9;i++){
        if(this.dataSource[i].includes('0')){
            return false
        }
        if(isRepeat(this.dataSource[i])){
            return false
        }
    }
        
    // check whether every col has repeat value or not
    for(var i=0; i<9;i++){
        var tmpArr = []
        for(var n=0;n<9;n++){
            tmpArr[n] = this.dataSource[i][n]
        }
        if(isRepeat(tmpArr)){
            return false
        }
    }

    // check whether every block has repeat value or not
    for(var i=0;i<9;i++){

        var tmpArr = []
        var arrIndex = 0

        if(0<=i<=2){
            for(var x=0;x<3;x++){
                for(var y=i%3*3;y<(i%3+1)*3;y++){
                    tmpArr[arrIndex] = this.dataSource[x][y]
                    arrIndex++
                }
            }
        }else if(3<=i<=5){
            for(var x=3;x<6;x++){
                for(var y=i%3*3;y<(i%3+1)*3;y++){
                    tmpArr[arrIndex] = this.dataSource[x][y]
                    arrIndex++
                }
            }
        }else if(6<=i<=8){
            for(var x=6;x<8;x++){
                for(var y=i%3*3;y<(i%3+1)*3;y++){
                    tmpArr[arrIndex] = this.dataSource[x][y]
                    arrIndex++
                }
            }
        }

        console.log(tmpArr)

        if(isRepeat(tmpArr)){
            return false
        }
    }

    return true
};

var board = new Board();

var inputElements = document.getElementsByTagName("input");

// put the values into the input element, add oninput hanlder for each one
var index = 0
for(var n=0;n<9;n++){
    for(var i=0;i<9;i++){
        if(board.dataSource[n][i] !== '0'){
            inputElements[index].value = board.dataSource[n][i]
            inputElements[index].disabled = true
            inputElements[index].style.backgroundColor = 'Gainsboro'
            inputElements[index].style.color = 'Black'
        }
        inputElements[index].oninput=function(e){
            oninputHandler(e);
        }
        index++
    }
}

// onninput hanlder
function oninputHandler(e){
    // input validation
    var value = e.data
    var row = e.path[2].className
    var col = e.path[1].className
    board.square_is(row, col, value)
    var result = board.win()
    if(result){
        alert("Congratulations!!!")
        document.getElementById("sudokuTable").className += ' success'
    }
}


function isRepeat(arr) {
    var hash = {};
    for (var i in arr) {
        if (hash[arr[i]]){
            return true; 
        }
        hash[arr[i]] = true;
    }
    return false;
}

function toggleAnswer() {
    var x = document.getElementById("answer");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}