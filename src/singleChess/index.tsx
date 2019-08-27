import React from 'react';
import './index.css';
import {UserContext} from '../chessboard'
interface SingleProps {
    rowIndex: number,
    colIndex: number,
    colNum: number,
    user: ''|'A' | 'B', // A Or B
    Id: string,
    moveChess: Function
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
    // 为了用hook 而用，其实可以不用，为了试试新功能。
    // const [userC, setUser] = useState<''|'A' | 'B'>(props.user);
    return ( 
        <UserContext.Consumer>
            {
              function (parentProp: any) {
                  return (<i className="single-chess" id={props.Id}> 
                  {props.colIndex === props.colNum-1 ?null: <span className="before" ></span>}
                  <Chess userC={props.user} handClick={ () => {
                      if(props.user || parentProp.winUser) {
                          return
                      }
                      props.moveChess(parentProp.user, props.rowIndex, props.colIndex);
                      parentProp.setCurrentUser(parentProp.user === 'A'?'B':'A');
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
    };
    const style = {'background' : color[props.userC]};
    return (
        <span className="wb_chess" onClick = {props.handClick} 
         style={ style }
         ></span>
    )
}
export default Chessboard