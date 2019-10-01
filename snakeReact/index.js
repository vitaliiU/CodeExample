import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//component for create element of Board
function Square(props) {
  return (
    <div key={props.key} class="square" >
      {props.value}
    </div>
  );
}
  
//component for create Board
class Board extends React.Component { 
  renderBoard(){
    // outer loop to create parent  
    let board = [];
    let children = [];
    let findEl=false;  
    let keyToString='';
  
    for (let i = 0; i < 23; i++) { 
      children = [];

      //inner loop to create children
      for (let j = 0; j < 23; j++) { 
        findEl=false; 
        keyToString=String(i)+String(j);        
        this.props.snake.forEach((element) =>{  
          if(element.row===i&&element.column===j){
          children.push(<Square key={keyToString} value="O"/>);            
          findEl=true;
          }          
        });  
        if(this.props.rabbit.row===i&&this.props.rabbit.column===j){
          children.push(<Square key={keyToString} value="X"/>);  
        }        
        else if(!findEl){
          children.push(<Square key={keyToString} value=""/> );  
        }          
      }

      //create the parent and add the children
      board.push(<div key={i} class="row">{children}</div>)     
    }

    return board
  }

  render(){
    return (
      <div>
        {this.renderBoard()}   
      </div>
    );
  }
}

/////////////////main bisnes logic
class Go extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      directSnake:38,
      score:0,
      rabbit:
        {
          row: 5,
          column: 5
        },
      snake:[
        {
          row: 19,
          column: 15
        },
        {
          row: 20,
          column: 15
        },
        {
          row: 21,
          column: 15
        },
        {
          row: 22,
          column: 15
        }      
        ]
    };
    this.handleClick = this.handleClick.bind(this);
  }
    
  //Mounting
  componentDidMount() {
    this.timerID = setInterval(
      () => this.newSnake(), 350);     
      this.nameInput.focus();
  } 
    
  //Unmounting
  componentWillUnmount() {
    clearInterval(this.timerID);
  } 
    
  //Metod Timer
  tick() {
    this.setState({
      date: new Date()
    });
  }
      
  //Metod for create new Snake
  newSnake (){ 
    this.setState({
      date: new Date()
    });
    let newSnake =null;
    let newRabbitRow=0;
    let newRabbitColumn=0;
    
    ///////////////////////////////////////////////////////get New Snake
    newSnake = this.getNewSnake();      
    newRabbitRow=Math.round(Math.random()*22);
    newRabbitColumn=Math.round(Math.random()*22);
    if(newSnake.length!==this.state.snake.length){
      newSnake.forEach(function(element) {
        if((newRabbitRow-element.row)===0&&(newRabbitColumn-element.column)===0){
          do{
            newRabbitRow= Math.round(Math.random()*22);
            newRabbitColumn=Math.round(Math.random()*22);
          }while((newRabbitRow-element.row)===0&&(newRabbitColumn-element.column)===0);
        }
      }); 
      this.setState({
        score:this.state.score+1,
        rabbit:
        {
          row: newRabbitRow,
          column: newRabbitColumn
        }    
      });       
    }
    this.setState({      
      snake:newSnake   
    });     
  }
  //End Metod for create new snake
  
  // Set Hadle For Event Press Key
  handleClick(e) {
    if(this.state.directSnake===37&&e.keyCode===39){}
    else if(this.state.directSnake===39&&e.keyCode===37){}
    else if(this.state.directSnake===38&&e.keyCode===40){}
    else if(this.state.directSnake===40&&e.keyCode===38){}
    else{
      this.setState({
        directSnake:e.keyCode 
      }); 
    }
  }
    
  //Customize function
  getNewSnake=()=>{ 
    let rowFirst=0;
    let rowTemp=0;
    let columnFirst=0;
    let columnTemp=0;  
    let tempSnake= JSON.parse(JSON.stringify(this.state.snake))
    let directSnake=this.state.directSnake;
    let gameOver=false;     
    tempSnake.forEach((element,count)=> { 
      if (count===0){                  
        rowFirst=element.row;                  
        columnFirst=element.column;
        // define snake's direction and next snake's head coordinates                   
        switch(directSnake){        
          case 37:  // left
            tempSnake[count].column=element.column-1;  
          break;
          case 38:   // down                     
            tempSnake[count].row=element.row-1;  
          break;
          case 39:   // right
            tempSnake[count].column=element.column+1;
          break;
          case 40:   // up
            tempSnake[count].row=element.row+1;
          break;  
          default:
            break;       
        }
        // alert(tempSnake[count].row);             
        if (tempSnake[count].row<0||tempSnake[count].row>22||tempSnake[count].column<0||tempSnake[count].column>22){
          alert("Game Over!");
          gameOver=true;
        }                             
      }
      else{               
        rowTemp=element.row;
        columnTemp=element.column;
        tempSnake[count].row=rowFirst; 
        tempSnake[count].column=columnFirst;
        rowFirst=rowTemp;
        columnFirst=columnTemp; 
      }                 
    });

    //define encounter snake and rabbit or own body       
    let rowRabbit=this.state.rabbit.row;
    let columnRabbit=this.state.rabbit.column;
    let rowHead=tempSnake[0].row;
    let columnHead=tempSnake[0].column;
    this.state.snake.forEach((element, i)=>{
      if(i !== 0){      
        if(element.row===rowHead&&element.column===columnHead){
          alert("Game Over!");
          gameOver=true;      
        }        
      }
    });
    if(rowHead===rowRabbit&&columnHead===columnRabbit){
      tempSnake.push(
        {
        row: rowFirst,
        column: columnFirst
        }
      );        
      // return tempSnake;
    } 
    
    //set new game if was game over   
    if(gameOver){
      this.setState({     
        directSnake:38,
        score:0,
        snake:[
          {
            row: 19,
            column: 15
          },
          {
            row: 20,
            column: 15
          },
          {
            row: 21,
            column: 15
          },
          {
            row: 22,
            column: 15
          }     
        ]
      });
      tempSnake=this.state.snake;
    }  
    return tempSnake;
  }
  //end function getNewSnake 
  
  //Main Render of Class Go    
  render() {
    return(
      <div class='wrapper'  onKeyDown={this.handleClick} tabIndex="1" 
      ref={(input) => { this.nameInput = input; }} defaultValue="will focus">
        <div class='mainSection'>
          <Board snake={this.state.snake} rabbit={this.state.rabbit}/>  
              <div class='control'>  
              </div>
        </div>
        <div>        
          <h1>Your Score: {this.state.score}  points!</h1>  
          <h2>Time: {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      </div>
    )
  }
}
///////////////////End Class Go
  
//Main Render React
ReactDOM.render(
  <Go/>,
  document.getElementById('root')
);
  