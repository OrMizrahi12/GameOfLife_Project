import React, { useEffect, useRef, useState } from "react"
import '../css/bored.css'


let timer;
const positions = [[0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]]
let rows = 30
let cols = 30
let size = 15

function GameOflife() {

    const [grid, setGrid] = useState([])
    const [intervalSpeed, setIntervalSpeed] = useState(100)

    const createGridStructure = () => {
        clearInterval(timer)
        const grid = []
        for (let i = 0; i < rows; i++) {
            const row = []
            for (let j = 0; j < cols; j++)
                row.push(0)

            grid.push(row)
        }

        changeCss();

        return grid
    }

    const changeCss = () => {
        let bored = document.getElementById("bored")
        bored.style.setProperty('grid-template-columns', `repeat(${cols}, ${size}px)`);
        bored.style.setProperty('grid-template-rows', `repeat(${rows}, ${size}px)`);
    }

    const changeCellCountInGrid = (_amplify) => {
        if (_amplify) {
            rows += 5
            cols += 5
        }
        else if (!_amplify && cols > 10 && rows > 10) {
            rows -= 5
            cols -= 5
        }
        setGrid(createGridStructure())
    }

    const changeSize = (_bigger) => {
        if (_bigger && size < 15) size += 1
        else if (!_bigger && size > 3) size -= 1

        changeCss()
    }

    const startOperation = () => {
        clearInterval(timer)
        timer = setInterval(startGame, intervalSpeed)
    }

    const changeSpeedInterval = (_faster) => {
        if (_faster && intervalSpeed > 40)
            setIntervalSpeed(intervalSpeed - 20)
        else if (!_faster && intervalSpeed < 1500)
            setIntervalSpeed(intervalSpeed + 20)

        startOperation()
    }

    const stopOperation = () => {
        clearInterval(timer)
    }

    // The user can choose which cell will be live. 
    const chooseTemplate = (_i, _j) => {

        setGrid(g => {
            const next = g.map((row, i) =>
                row.map((cell, j) => {

                    if (i === _i && j === _j && g[i][j] === 0)
                        return 1;
                    else if (i === _i && j === _j && g[i][j] === 1)
                        return 0;

                    return g[i][j]
                })
            )
            return next
        })

    }

    function startGame() {

        setGrid(g => {
            const next = g.map((row, i) =>
                row.map((cell, j) => {
                    let liveCount = 0
                    // Check if The neighbors of 'g[x][y]' is 0 or 1 => And count it
                    positions.forEach((position) => {
                        const x = i + position[0]
                        const y = j + position[1]

                        if (x >= 0 && x < rows && y >= 0 && y < cols)
                            liveCount += g[x][y]
                    })

                    if (liveCount < 2 || liveCount > 3) return 0

                    if (liveCount === 3) return 1

                    return g[i][j]
                })
            )
            return next
        })
    }

    useEffect(() => {
        setGrid(createGridStructure())
        changeCss()
    }, [])

    return (
        <>
            <div>

                <button
                    onClick={startOperation}
                    className={"btn-start"}
                >
                    Start
                </button>

                <button
                    className="btn-stop"
                    onClick={stopOperation} >
                    Stop
                </button>

                <button
                    className="btn-reset"
                    onClick={() => setGrid(createGridStructure())}
                >
                    Reset
                </button>

                <div className="row mx-auto" style={{ margin: 6, maxWidth: 500 }}>
                    <div className="col">

                        <span style={{ color: 'white' }} >Cell</span> <br />
                        <button className="btnPlus" onClick={() => changeCellCountInGrid(true)}>✖️</button>
                        <button className="btnMinus" onClick={() => changeCellCountInGrid(false)}>➖</button>
                    </div>

                    <div className="col">
                        <span style={{ color: 'white' }} >Speed</span> <br />
                        <button className="btnPlus" onClick={() => changeSpeedInterval(true)}>✖️ </button>
                        <button className="btnMinus" onClick={() => changeSpeedInterval(false)}>➖</button>
                    </div>

                    <div className="col">
                        <span style={{ color: 'white' }} >Size</span> <br />
                        <button className="btnPlus" onClick={() => changeSize(true)}>✖️</button>
                        <button className="btnMinus" onClick={() => changeSize(false)}>➖</button>
                    </div>

                </div>
            </div>
            <div
                id="bored"
                style={{ paddingLeft: 10 }}
            >
                {
                    grid &&
                    grid.map((rows, i) =>
                        rows.map((col, k) => (
                            <div
                                className="btns"
                                onClick={() => chooseTemplate(i, k)}
                                id={`id_btn${i.i}_${i.j}`}
                                style={{
                                    width: 10,
                                    height: 10,
                                    backgroundColor: grid[i][k] === 1 ? 'green' : 'black',
                                    padding: 7
                                }}
                            >
                            </div>
                        ))
                    )
                }
            </div>
            <br /><br /><br /><br />
        </>
    )
}




export default GameOflife