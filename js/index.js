
var currTotal=0;


var chain=[];
var charCap=8;
//function to add numbers or decimal by button press
$('.numbut').unbind('click).bind('click' function(event){
  //get value of button pressed and assign to newNum variable
  event.stopPropagation()
  var newArr=($(this).html()).split('');
  if ($(this)[0].attributes.value.value!="."){
    var newNum=Number($(this)[0].attributes.value.value);
  }
  else{
    var newNum=".";
  }
  //get value of input field id=out
  var oldVal=document.getElementById('out').value;
  //the case for first entry (replace zero) and decimals <1 (insert decimal behind zero)
  if(oldVal==="0"){
    if(newNum==="."){
      newNum="0."
      document.getElementById('out').value=newNum;
    }
    else{
      document.getElementById('out').value=newNum
    }
  } 
  //the case for subsequent entries (push number) and for decimals greater than 1 (push decimal)
  else {
    var pusher=oldVal.split('');
    for(var i=0;i<pusher.length;i++){
      if(pusher[i]!="."){
      pusher[i]=Number(pusher[i]);
      } 
      //second decimal blocker by buttonpress
      else if(newNum==="."){
      return;
      }
    }
    //write new number to input field id OUT
    pusher.push(newNum);
    //size boundary
    if(pusher.length>charCap){
      return;
    }
    pusher=String(pusher.join(''));
    document.getElementById('out').value=pusher;
  }
  
  
});
//function to control user input: prevent letters, prevent second decimal, prevent length >9
$('#out').keyup(function(event){
  //get new value of input & split to array
  var newArr=(document.getElementById('out').value.split(''));    
  console.log(newArr)
  //check if a previous decimal exists, or if new input is not a number or decimal
  var hasDec=false;
  var checker=/[^0-9]/
  for (var i=0;i<newArr.length;i++){
    if(checker.test(newArr[i])){
      newArr[i]='';
    }
    if(newArr[i]==="."&&hasDec===true){
      newArr[i]='';
    }
    if(newArr[i]==="."){
      hasDec=true;
    }
  }
  
  //check if length >9 & reset input.
  if(newArr.length>charCap){
    newArr.length=charCap;
  }
  document.getElementById('out').value=newArr.join('');
});

//function to add operator & number to chain and keep a running tally.
//have a case to prevent divide by zero
$('.opbut').click(function(event){
  //grab number in 'out'
  var chainNum=Number(document.getElementById('out').value)
  //grab operator
  var operator=String($(this)[0].attributes.value.value);
  //grab previpir p[eratpr on chain]
  var lastOp=chain[chain.length-1]
  //sends number and operator onto the chain
  //chain will now be [num 1. op1, num2, op2]
  chain.push(chainNum, operator)
  console.log(chain);
  //clears the 'msg' and sets 'out' to 0
  document.getElementById('msg').innerHTML='';
  document.getElementById('out').value=0;
  //if there is math to perform
  if(chain.length>2){
    //perform math
    chain=getTotal(chain);
  }
  //put everything back together and check if they divided by zero or something
  
  var chainString=chain.join(' ');
  if ((chainString.substr(0,3))===("NaN")){
    //write outputs
    document.getElementById('showChain').innerHTML='YOU BROKE MATH'
    chain=[];
  } else if(chain[1]==='='){
    document.getElementById('showChain').innerHTML=chain[0];
    chain=[];
  }
  else {
   document.getElementById('showChain').innerHTML=chainString;
  }
  
  });

//function to get math on 4-item chain
function getTotal(chain){
  var op=chain[(chain.length)-1];
  if(chain[1]==="+"){
    currTotal=chain[0]+chain[2];
    chain=[currTotal, op];
  }
  else if(chain[1]==="-"){
    currTotal=chain[0]-chain[2];
    chain=[currTotal, op];
  }
  else if(chain[1]==="x"){
    currTotal=chain[0]*chain[2];
    chain=[currTotal, op];
  }
  else if(chain[1]==="/"){
    //if you divided by zero
    if(chain[2]===0){
      chain=[];
    }
    //normal division
    currTotal=chain[0]/chain[2];
    chain=[currTotal, op];
  }
  
  return chain;
  
}  
// clear function
$('#clear').click(function(event){
  //empty the chain and set input value to zero 
  chain=[];
  currTotal=0;
  document.getElementById('out').value=0;
  
  document.getElementById('msg').innerHTML='do some math!';
  document.getElementById('showChain').innerHTML=' ';
});
