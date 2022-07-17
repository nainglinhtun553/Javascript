
// catch from and to
let input=document.getElementById("input");
let from =document.getElementById("from");
let to=document.getElementById("to");
let result=document.getElementById("result");
let historylist=document.getElementById("historylist");


// create function for option
// x mean dom selector.
// y mean data btween element.
function createOption(x,y,z) {
	let o =document.createElement("option");
	let t=document.createTextNode(y);

	//insert value attribute
	o.setAttribute("value",toNum(z));
	o.appendChild(t);
	x.appendChild(o);
}

// x mean input data
function toNum(x){
	// replace from comma place to aviod place.and then converted to Number.
	return Number(x.replace(",",""));
}

//for dsiplay data in api using for looping
for(x in data.rates){
	//insert from option box from api data.
	createOption(from,x,data.rates[x]);

	//insert to option box from api data.
	createOption(to,x,data.rates[x]);
	//console.log(x,data.rates[x]);
}


// create table row and table data
function createTr(x){

	// to make there is no row text show and hide function.
	let rowSpacer=document.getElementById("rowSpacer");
	if(rowSpacer){
		rowSpacer.remove();
	}

	let tr=document.createElement("tr");
	x.map(function(el){
		let td=document.createElement("td");
	let text=document.createTextNode(el);
	//<td>text</td>
	td.appendChild(text);
	//<tr><td>text</td></tr>
	tr.appendChild(td);
	})

	historylist.appendChild(tr);
}


// output result saving in local storage to ever display the docuement window.
function store(){
	// syntex => localStorage.setItem("user input name ",historylist.innerHTML);
	localStorage.setItem("record",historylist.innerHTML);

}


// calculate btn function with eventlistener
	document.getElementById("calc").addEventListener("submit",function(e){
	// prevent default event in js	
	e.preventDefault();


	//get state
	let x = input.value;
	let y= from.value;
	let z=to.value;
	//console.log(x,y,z);

	//process 
	let fromText=x+" "+from.options[from.selectedIndex].innerText;
	let toText=to.options[to.selectedIndex].innerText;
	let first= x * y;
	//console.log(first);

	let second= first/z;
	let resultNum = second.toFixed(2);
	let date=new Date().toLocaleString();
	let arr=[date,fromText,toText,resultNum];
	// create table function using associated with arr variable for getting the table and table data in my ui.
	createTr(arr);
	store();

	//console.log(result);

	// set state
	// tofixed mean place of demical number
	result.innerHTML=resultNum;
	//return default style after calculation
	input.value="";
	// return auto focus after calculation.
	input.focus();
	from.value="";
	to.value="1";
	
	});


	(function(){
		if(localStorage.getItem("record")){
			historylist.innerHTML=localStorage.getItem("record");
		}else{
			historylist.innerHTML=`<tr id="rowSpacer"><td colspan="4">There is no record.</td></tr>`;
		}
	})()


	// night mode function
	function changeMode(){
		document.body.classList.toggle("night-mode");
		document.getElementById("modeIcon").classList.toggle("fa-sun");
	}
	


	







