const solveNQueens = (n) => {
    var res = [];
    if (n === 1 || n >= 4) dfs(res, [], n, 0);
    var partial = res;
    // console.log(partial)

    var rotatedMatrix = []

    for (var i of partial) {
        rotatedMatrix.push(rotateMatrix(i))
    }

    // console.log(rotatedMatrix)

    var convertedQueens = []

    for (var j of rotatedMatrix) {
        convertedQueens.push(convertQueenPosition(j))
    }
    return convertedQueens
};

var dfs = function (res, points, n, index) {
    for (var i = index; i < n; i++) {
        if (points.length !== i) return;
        for (var j = 0; j < n; j++) {
            if (isValid(points, [i, j])) {
                points.push([i, j]);
                dfs(res, points, n, i + 1);
                if (points.length === n) res.push(buildRes(points));
                points.pop();
            }
        }
    }
};

var buildRes = function (points) {
    var res = [];
    var n = points.length;
    for (var i = 0; i < n; i++) {
        res[i] = '';
        for (var j = 0; j < n; j++) {
            res[i] += (points[i][1] === j ? 'Q' : '.');
        }
    }
    return res;
};

var isValid = function (oldPoints, newPoint) {
    var len = oldPoints.length;
    for (var i = 0; i < len; i++) {
        if (oldPoints[i][0] === newPoint[0] || oldPoints[i][1] === newPoint[1]) return false;
        if (Math.abs((oldPoints[i][0] - newPoint[0]) / (oldPoints[i][1] - newPoint[1])) === 1) return false;
    }
    return true;
};

var rotateMatrix = function (matrix) {

    var auxMatrix = []

    for(var i=0; i<matrix.length; i++) {
        var auxArray = []
        for(var j of matrix) {
            auxArray.push(j[i])
        }
        auxMatrix.push(auxArray.join(""))
    }
    return auxMatrix
}

var convertQueenPosition = function (queenPositions) {
    var convertedPositions = []
  
    for (var i of queenPositions) {
        var position = i.indexOf("Q")
        convertedPositions.push(position + 1)
    }

    return convertedPositions
}

export default solveNQueens