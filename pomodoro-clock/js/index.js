'use strict';

var workMinutes = 25, 
	breakMinutes = 5;

var intervalID = -1;

function changeTimer(change) {
	var currentTime = document.getElementById("timer").innerHTML;
	var updatedTime = +currentTime + change

	 if (updatedTime > 0 && updatedTime < 60) {
		var activeField = document.getElementsByClassName("active")[0].innerHTML;
		if(activeField === 'Break')  breakMinutes = updatedTime;
		else workMinutes = updatedTime;
	
		var mins = (updatedTime > 9) ? '' + updatedTime : '0' + updatedTime;
		document.getElementById("timer").innerHTML = mins + '';
		document.getElementById("counter").innerHTML = mins + ':00';
	}
}

function setWorkTimer() {
	var activeElem = document.getElementsByClassName("active")[0];
	activeElem.classList.remove("active");
	
	document.getElementById("work").classList.add("active")
	
	var mins = (workMinutes > 9) ? '' + workMinutes : '0' + workMinutes;
	document.getElementById("timer").innerHTML = mins;	
	document.getElementById("counter").innerHTML = mins + ':00';
} 

function setBreakTimer() {
	var activeElem = document.getElementsByClassName("active")[0];
	activeElem.classList.remove("active");
	
	document.getElementById("break").classList.add("active")
	
	var mins = (breakMinutes > 9) ? '' + breakMinutes : '0' + breakMinutes;
	document.getElementById("timer").innerHTML = mins;	
	document.getElementById("counter").innerHTML = mins + ':00';
}

function startCounter() {
	var counter = document.getElementById("counter").innerText;
	var time = counter.split(":")
	
	var mins = +time[0],
		secs = +time[1]
	
	console.log(time, secs);
	if(secs > 0) secs--;
	else if(!secs) {
		if(mins) mins--;
		secs = 59;	
	}
	
	time[0] = (mins > 9) ? '' + mins : '0' + mins;
	time[1] = (secs > 9) ? '' + secs : '0' + secs;
	
	document.getElementById("counter").innerText = time.join(":");	
	
	if(!mins && !secs) {
		if(document.getElementById("work").classList.contains("active")) {
			document.getElementById("ping").play();
			setTimeout(setBreakTimer, 1000)
		}	
		else {
			clearInterval(intervalID)
			intervalID = -1
		}
	} 
}

function controlCounter(type) {
	switch(type) {
		case "start" :  (intervalID == -1) ? intervalID = setInterval(startCounter, 1000) : intervalID
						break;
		
		case "pause" :  clearInterval(intervalID);
						intervalID = -1;
						break;
	}
}