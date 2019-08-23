import React, { useState } from 'react';
import './index.css';
import {UserContext} from '../chessboard'
interface SingleProps {
    rowIndex: Number,
    colIndex: Number,
    colNum: number,
    user: ''|'A' | 'B', // A Or B
    Id: string
}

interface userChess {
    userC: ''|'A' | 'B', // A Or B
    handClick: () => void
}
interface userProp {
    user: ''|'A' | 'B',
    setCurrentUser: () => void
  } 
const Chessboard : React.FC<SingleProps> = props => {
    const [userC, setUser] = useState<''|'A' | 'B'>(props.user);
    return ( 
        <UserContext.Consumer>
            {
              function (currentUser: any) {
                  return (<i className="single-chess" id={props.Id}> 
                  {props.colIndex === props.colNum-1 ?null: <span className="before" ></span>}
                  <Chess userC={userC} handClick={ () => {
                      if(userC) {
                          return
                      }
                      console.log(currentUser);
                      setUser(currentUser.user);
                      currentUser.setCurrentUser(currentUser.user === 'A'?'B':'A');
                  }} />
                  {props.rowIndex === props.colNum-1 ?null: <span className="after" ></span> } 
              </i>)
              }
                
                
            }
                
            </UserContext.Consumer>
            )
}

const Chess : React.FC<userChess> = props => {
    const color = {
        'A': 'black',
        'B': 'white',
        '': 'transparent'
    }
    const style = {'background' : color [props.userC]};
    return (
        <span className="wb_chess" onClick = {props.handClick} 
         style={ style }
         ></span>
    )
}
export default Chessboard