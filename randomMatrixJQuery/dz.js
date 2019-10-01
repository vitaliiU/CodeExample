$(function(){
    //enter user's matrix size and inicialize the matrix
    var sizeMatrix=prompt('enter matrix size from 2 to 10')
    var newRow=null;
    var newDiv = null;

    for(let i=0;i<sizeMatrix;i++){
        newRow=$("<div></div>",{'id':String(i)}).appendTo('#wrapper');  
   
        for(let j=0;j<sizeMatrix;j++){
            newDiv=$("<div></div>",        
                {'id':(String(i)+String(j)),            
                'class':'normal',
                'data-row':String(i),
                'data-column':String(j),
                }
            ).appendTo(newRow);   
            newDiv.html(Math.round(Math.random()*200-100));
            newDiv.bind('click',function(){         
               $('#result').html($(this).html());
            });   

            var objectForEvent=null;
            var commonResult=0;

            newDiv.bind('mouseover',function(){             
                objectForEvent=$(this);  
                commonResult=-objectForEvent.html();  
                $('#wrapper div').each(function(indexOut, selectedDiv){                      
                    if(objectForEvent.attr('data-row')===$(selectedDiv).attr('data-row')){                                   
                        $(selectedDiv).removeClass('normal');
                        $(selectedDiv).addClass('mark');  
                        commonResult+=parseInt( $(selectedDiv).html());
                    }
                    if(objectForEvent.attr('data-column')===$(selectedDiv).attr('data-column')){
                        $(selectedDiv).removeClass('normal');
                            $(selectedDiv).addClass('mark');
                    commonResult+=parseInt( $(selectedDiv).html());
                    }
                }); 
                $('#result').html(commonResult);
            });

            newDiv.bind('mouseout',function(){ 
                objectForEvent=$(this);                  
                $('#wrapper div').each(function(indexOut, selectedDiv){                      
                    if(objectForEvent.attr('data-row')===$(selectedDiv).attr('data-row')){                                   
                        $(selectedDiv).removeClass('mark');
                        $(selectedDiv).addClass('normal');  
                    }
                    if(objectForEvent.attr('data-column')===$(selectedDiv).attr('data-column')){
                        $(selectedDiv).removeClass('mark');
                        $(selectedDiv).addClass('normal');
                    }
                }); 
            });
        }
    }
    $("<div></div>", {'id':'result'}).appendTo("body");  
});