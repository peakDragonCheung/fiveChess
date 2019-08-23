import React, { useState } from 'react';
import SingleChess from '../singleChess';
import './index.css';

const UserContext = React.createContext({
});

const Chessboard : React.FC = () => {
    const colNum = 20;
    const ChessNum = new Array(colNum).fill(new Array(colNum).fill(''));
    const [currentUser, setCurrentUser] = useState('A');
    const userProp = {
      user: currentUser,
      setCurrentUser: setCurrentUser
    }
    return ( 
      <UserContext.Provider value={userProp}>
            <div className="chessBoard" >
              {
                ChessNum.map(
                  (rows :Array <String>, RIndex : number ) => 
                ( <div key={RIndex}> 
                  { rows.map((col: String, CIndex: Number) => 
                  <SingleChess 
                  rowIndex={RIndex} 
                  colIndex={CIndex} 
                  colNum={colNum}
                  user={''} 
                  Id={`row${RIndex}-col${CIndex}`} 
                  key = { `(${RIndex}, ${CIndex})`}/> )} 
                </div> )
                )
              }
            </div>
      </UserContext.Provider >

            )
}
export default Chessboard;
export { UserContext };
