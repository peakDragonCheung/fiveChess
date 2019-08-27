import React, { useState } from 'react';
import SingleChess from '../singleChess';
import './index.css';

const UserContext = React.createContext({
});

function chectWin (chess: Array< Array<String> >) {
    const length = chess.length;
    for(let i = 0; i< length; i++) {
      for( let j = 0; j< length; j++) {
        if(checkWinBySingle(i,j,chess)) {
          return {
            winner: chess[i][j],
            status: 'win'
          }
        }
      }
    }
    return false
}
function getWinner(chess: Array< Array<String> >) {
  const winner = chectWin(chess);
    if(winner) {
      return winner.winner
    } else {
      return ''
    }
}
function checkWinBySingle (rowIndex: number, colIndex: number, chess: Array< Array<String> >) {
    if(chess[rowIndex][colIndex]) {
      const user = chess[rowIndex][colIndex]; // 获取当前的棋子种类
      const isWin = checkHorizontal(rowIndex,colIndex, user, chess) || checkVertical(rowIndex,colIndex, user, chess) || leftSlant(rowIndex,colIndex, user, chess) || rightSlant(rowIndex,colIndex, user, chess)
      return isWin;
    }
}

function checkHorizontal(rowIndex: number, colIndex: number, user: String, chess: Array< Array<String> >) {
  let count = 0;
  for(let i = colIndex - 1; i >= 0; i--) {
    if(user === chess[rowIndex][i]) {
      count++;
    }
  }
  const length = chess.length;
  for(let i = colIndex + 1; i < length; i++) {
    if(user === chess[rowIndex][i]) {
      count++;
    }
  }
  return count === 4;
}

function checkVertical(rowIndex: number, colIndex: number, user: String, chess: Array< Array<String> >) {
  let count = 0;
  for(let i = rowIndex - 1; i >= 0; i--) {
    if(user === chess[i][colIndex]) {
      count++;
    }
  }
  const length = chess.length;
  for(let i = rowIndex + 1; i < length; i++) {
    if(user === chess[i][colIndex]) {
      count++;
    }
  }
  return count === 4;
}

function leftSlant(rowIndex: number, colIndex: number, user: String, chess: Array< Array<String> >) {
  let count = 0;
  for(let i = rowIndex - 1, j = colIndex -1; i>= 0 && j>=0; i--,j--) {
    if(user === chess[i][j]) {
      count++;
    }
  }
  const length = chess.length;
  for(let i = rowIndex + 1, j = colIndex + 1; i< length && j< length; i++,j++) {
    if(user === chess[i][j]) {
      count++;
    }
  }
  return count === 4;
}

function rightSlant(rowIndex: number, colIndex: number, user: String, chess: Array< Array<String> >) {
  let count = 0;
  const length = chess.length;
  for(let i = rowIndex - 1, j = colIndex + 1; i>= 0 && j<length; i--,j++) {
    if(user === chess[i][j]) {
      count++;
    }
  }
  for(let i = rowIndex + 1, j = colIndex - 1; i< length && j>=0 ; i++,j--) {
    if(user === chess[i][j]) {
      count++;
    }
  }
  return count === 4;
}

const Chessboard : React.FC = () => {
    console.log('初始化一次');
    const colNum = 20;
    const chess = new Array(colNum).fill(new Array(colNum).fill(''));
    console.log(chess);
    const [currentUser, setCurrentUser] = useState('A'); // 当前用户state
    const [winUser, setWinUser] = useState(getWinner(chess)); // 获胜的用户
    const [ChessNum, setChessNum] = useState(chess); // 所有棋子的state
    const [history, setHistory] = useState([]); // 历史下棋位置，用来悔棋。

    const userProp = {
      user: currentUser,
      setCurrentUser: setCurrentUser,
      winUser,
      setWinUser
    }
    return (<UserContext.Provider value={userProp}>
            <div className="chessBoard" >
              {
                ChessNum.map(
                  (rows :Array <String>, RIndex : number ) => 
                ( <div key={RIndex}> 
                  { rows.map((col: any, CIndex: number) => 
                  <SingleChess 
                  rowIndex={RIndex} 
                  colIndex={CIndex} 
                  colNum={colNum}
                  user={col}
                  moveChess= {( user: string, rowIndex: number, colIndex: number) => {
                    const chessCopy = JSON.parse(JSON.stringify(ChessNum));
                    chessCopy[rowIndex][colIndex] = user;
                    setChessNum(chessCopy);
                    const historyCopy = JSON.parse(JSON.stringify(history));
                    historyCopy.push(chessCopy);
                    setHistory(historyCopy);
                    if(checkWinBySingle(rowIndex,colIndex,chessCopy)) {
                      const name = user === 'A'? '黑子': '白子';
                      setWinUser(user);
                      alert(`${name} 获胜了`);
                    }
                  }}
                  Id={`row${RIndex}-col${CIndex}`} 
                  key = { `(${RIndex}, ${CIndex})`}/> )} 
                </div> )
                )
              }
            </div>
      </UserContext.Provider >)

    
}
export default Chessboard;
export { UserContext };
