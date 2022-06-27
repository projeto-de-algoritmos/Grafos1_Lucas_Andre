import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import solveNQueens from 'solveQueen';

const QueensContext = React.createContext(null);

function drawRedBlocks(row, col, gridSize, redBlocks) {
    let absDist;
    const _redBlocks = redBlocks.slice(0);

    for (let i = 0; i < gridSize; i++) {
        absDist = Math.abs(i - col);

        _redBlocks[gridSize * row + i] = 1;
        _redBlocks[gridSize * i + col] = 1;
        for (let j = 0; j < gridSize; j++) {
            if (j === row - absDist || j === row + absDist) {
                _redBlocks[gridSize * j + i] = 1;
            }
        }
    }
    _redBlocks[gridSize * row + col] = 0;

    return _redBlocks;
}

function removeRedBlocks(row, col, gridSize, redBlocks, cols) {
    let _redBlocks = redBlocks.slice(0);

    for (let i = 0; i < gridSize; i++) {
        _redBlocks[gridSize * row + i] = 0;
        _redBlocks[gridSize * i + col] = 0;
        for (let j = 0; j < gridSize; j++) {
            _redBlocks[gridSize * j + i] = 0;
        }
    }

    for (let i = 0; i < gridSize; i++) {
        if (cols[i] !== 0) {
            _redBlocks = drawRedBlocks(cols[i] - 1, i, gridSize, _redBlocks);
        }
    }

    return _redBlocks;
}

function loadFromStorage(key, defaultValue) {
    const state = JSON.parse(localStorage.getItem('state'));

    if (state === null) {
        return defaultValue;
    }

    return state[key] !== undefined ? state[key] : defaultValue;
}

export const QueensContextProvider = (props) => {
    const [gridSize, setGridSize] = React.useState(loadFromStorage('gridSize', 4));
    const [moves, setMoves] = React.useState(loadFromStorage('moves', 0));
    const [cols, setCols] = React.useState(loadFromStorage('cols', [0, 0, 0, 0]));
    const [rows, setRows] = React.useState(loadFromStorage('rows', [0, 0, 0, 0]));
    const [solutions, setSolutions] = React.useState(loadFromStorage('solutions', (solveNQueens(4))));
    const [redBlocks, setRedBlocks] = React.useState(
        loadFromStorage('redBlocks', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    );
    const [activeQueens, setActiveQueens] = React.useState(loadFromStorage('activeQueens', 0));
    const [gameOver, setGameOver] = React.useState(loadFromStorage('gameOver', false));

    const reset = () => {
        setCols([...Array(gridSize)].map(() => 0));
        setRows([...Array(gridSize)].map(() => 0));
        setRedBlocks([...Array(gridSize * gridSize)].map(() => 0));
        setActiveQueens(0);
    };

    const newGame = () => {
        setCols([...Array(gridSize)].map(() => 0));
        setRows([...Array(gridSize)].map(() => 0));
        setRedBlocks([...Array(gridSize * gridSize)].map(() => 0));
        setActiveQueens(0);
        setGameOver(false);
        // setSolutions(solveNQueens(gridSize))
        // setMoves(solveNQueens(gridSize).length)
    };

    const changeGrid = async (newGridSize) => {
        setCols([...Array(newGridSize)].map(() => 0));
        setRows([...Array(newGridSize)].map(() => 0));
        setRedBlocks([...Array(newGridSize * newGridSize)].map(() => 0));
        setGridSize(newGridSize);
        setActiveQueens(0);
        setGameOver(false);
        setSolutions(solveNQueens(newGridSize))
        setMoves(solveNQueens(newGridSize).length)
    };

    const moveQueen = (id) => {
        let row;
        let col;
        if (id.length === 2) {
            row = Number(id.charAt(0));
            col = Number(id.charAt(1));
        } else {
            row = Number(id.charAt(1));
            col = Number(id.charAt(2));
        }

        let newRows = rows;
        let newCols = cols;
        let newRedBlocks;
        // when you click a tile for the first time on a column
        if (cols[col - 1] === 0) {
            newCols[col - 1] = row;
            newRows[row - 1] = col;
            newRedBlocks = drawRedBlocks(row - 1, col - 1, gridSize, redBlocks);

            setCols(newCols);
            setRows(newRows);
            setRedBlocks(newRedBlocks);
            setActiveQueens(activeQueens + 1);

            return;
        }

        // when you click a tile with a queen on
        if (cols[col - 1] === row) {
            newCols[col - 1] = 0;
            newRows[row - 1] = 0;
            newRedBlocks = removeRedBlocks(row - 1, col - 1, gridSize, redBlocks, cols);

            setCols(newCols);
            setRows(newRows);
            setRedBlocks(newRedBlocks);
            setActiveQueens(activeQueens - 1);
            return;
        }

        // when you have already clicked a tile on that column
        const prevRow = cols[col - 1];
        newCols[col - 1] = row;
        newRows[row - 1] = col;
        newRedBlocks = removeRedBlocks(prevRow - 1, col - 1, gridSize, redBlocks, cols);

        setCols(newCols);
        setRows(newRows);
        setRedBlocks(newRedBlocks);
    };

    useEffect(() => {
        // console.log("Solutions ->", solutions);
        if (activeQueens === gridSize && !gameOver) {
            console.log("Solutions ->", solutions);
            const match = solutions.findIndex((e, index) => {
                if (e[0] == cols[0]  && e[1] == cols[1] && e[2] == cols[2] && e[3] == cols[3]){
                    let temp = solutions
                    temp.splice(index, 1)
                    setSolutions(temp)
                    return e
                }
            });
            if(match !== -1){
                setMoves(moves - 1)
                setGameOver(true)
            }
            if(moves <= 0){
                setGameOver(true)
            }
        }
        localStorage.setItem(
            'state',
            JSON.stringify({
                gridSize,
                moves,
                cols,
                rows,
                redBlocks,
                activeQueens,
                gameOver,
            })
        );
    });

    return (
        <QueensContext.Provider
            value={{
                gridSize,
                moves,
                cols,
                rows,
                redBlocks,
                activeQueens,
                gameOver,
                setGridSize,
                setMoves,
                setCols,
                setRows,
                setRedBlocks,
                setActiveQueens,
                setGameOver,
                reset,
                newGame,
                changeGrid,
                moveQueen,
            }}
        >
            {props.children}
        </QueensContext.Provider>
    );
};

QueensContextProvider.propTypes = {
    children: PropTypes.node,
};

export const useQueensContext = () => React.useContext(QueensContext);
