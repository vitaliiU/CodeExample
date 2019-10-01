//enter user's matrix size and inicialize the matrix
var sizeMatrix=prompt('enter matrix size from 2 to 10')
var matrixRandom=[];
var row=0;
var column=0;
var tempIdRow='';
var tempIdColumn='';
for(let i=0;i<sizeMatrix;i++){
    matrixRandom[i]=[];
}

//inicialize the matrix by random values
var valueDiv='';
var newRow=null;
var newDiv = null;
var wrapper=document.getElementById('wrapper');
matrixRandom.forEach(function(rowMatrix,i){ 
    row=i; 
    tempIdRow=String(row);
    newRow=document.createElement("div"); 
    newRow.setAttribute('id',tempIdRow);  
    wrapper.insertBefore(newRow,null);
    for(let j=0;j<sizeMatrix;j++){ 
        column=j;  
        rowMatrix[j]=Math.round(Math.random()*200-100);         
        addElement(newRow, rowMatrix[j]);
    }      
});

var resultDiv=document.createElement("div");
resultDiv.setAttribute('id','result');
document.body.appendChild(resultDiv);
var focusElement=null;

function addElement(parentElement, content) {
    // create element Div and insert content to this
    tempIdColumn=tempIdRow+String(column);
    newDiv = document.createElement("div");   
    newDiv.setAttribute('class',(String(column)));    
    newDiv.innerHTML = content;
    newDiv.addEventListener('click',function(content){        
        focusElement=document.activeElement;
        document.getElementById('result').innerHTML = this.innerHTML;        
    });   
    newDiv.addEventListener('mouseover',overElements);
    newDiv.addEventListener('mouseout',outElements);
    // addelement in DOM  
    parentElement.insertBefore(newDiv,null);       
}

var selectedElements=null;
var commonResult=0;
function overElements(){     
    commonResult=-parseInt(this.textContent);  
    // tempIdRow=this.parentNode.id;
    tempIdRow=this.parentNode.getAttribute('id');   
    tempIdColumn=this.getAttribute('class');  
    selectedElements=document.getElementById(tempIdRow);      
    for (let i=0;i<selectedElements.childNodes.length; i++){ 
        selectedElements.childNodes[i].style.backgroundColor = 'rgb(0, 17, 114)';
        selectedElements.childNodes[i].style.color = 'rgb(241, 241, 195)'; 
        commonResult += parseInt(selectedElements.childNodes[i].textContent);            
    }  
    selectedElements=document.getElementsByClassName(tempIdColumn); 
    for (let j=0;j<selectedElements.length; j++){              
        selectedElements[j].style.backgroundColor = 'rgb(0, 17, 114)';
        selectedElements[j].style.color = 'rgb(241, 241, 195)'; 
        commonResult += parseInt(selectedElements[j].textContent);        
    }

    document.getElementById('result').innerHTML = commonResult;
}

var tempIdRowOut='';
var tempIdColumnOut='';
function outElements(){    
    tempIdRowOut=this.parentNode.getAttribute('id');
    tempIdColumnOut=this.getAttribute('class');
    selectedElements=document.getElementById(tempIdRowOut);    
    for (let i=0;i<selectedElements.childNodes.length; i++){ 
        selectedElements.childNodes[i].style.backgroundColor = 'rgb(241, 241, 195)';
        selectedElements.childNodes[i].style.color = 'rgb(0, 17, 114)';                   
    }
    selectedElements=document.getElementsByClassName(tempIdColumnOut); 
   
    for (let j=0;j<selectedElements.length; j++){              
        selectedElements[j].style.backgroundColor = 'rgb(241, 241, 195)';
        selectedElements[j].style.color = 'rgb(0, 17, 114)';             
    }  
}
