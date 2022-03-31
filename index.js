
function playAlarm(currentTimeString){
    let sound = document.getElementById('alarm-sound');
    sound.play();
    setTimeout(function(){
        alert("Alarm set for " + currentTimeString);
    }, 8000);
}

function checkAlarm(currentTimeString){
    var ele = document.getElementById('Li'+currentTimeString);

    if (ele != undefined || ele != null){
        ele.parentNode.removeChild(ele);
        playAlarm(currentTimeString);
    }
}



function handleDelete(event){
    var ele = document.getElementById('Li'+event);
    ele.parentNode.removeChild(ele);
}

function handleSubmit(event){
    event.preventDefault();
    let ul = document.getElementById('alarms');
    let li = document.createElement('li');
    
    let hr = event.target[0];
    let min = event.target[1];
    let sec = event.target[2];
    let ampm = event.target[3];
    

    let newAlarmString = addZero(hr.value) + ":" + addZero(min.value) + ":" + addZero(sec.value) + " " + ampm.value;

    li.id = 'Li'+newAlarmString;
    
    li.innerHTML = '<div class="start">\
                        <span>'+newAlarmString+'</span>\
                    </div>\
                    <div id="'+newAlarmString+'" class="end" onclick="handleDelete(this.id);">\
                        <button id="delete">Delete</button>\
                    </div>'

    // li.appendChild(document.createTextNode(newAlarmString));
    ul.appendChild(li);

    
    document.forms[0].reset();
};

document.forms[0].addEventListener("submit", handleSubmit);

function addZero(time) {
    if (time <10){
        return "0" + time;
    }
    else{
        return time;
    }
};

function changeHourFormat(hrs){
    if (hrs == 00 || hrs == 12 || hrs == 24) {
		hrs = 12;
	} else if (hrs < 24 && hrs > 12) {
		hrs = hrs - 12;
	} else {
		hrs = hrs;
	}
    return hrs;
};

function currentTime(){
    let date = new Date();

    let hrs = date.getHours();
    
    let mins = date.getMinutes();

    let secs = date.getSeconds();

    let ampm = (hrs < 12 ? 'AM' : 'PM');


    hrs = changeHourFormat(hrs);

    let alarmString = addZero(hrs) + ":" + addZero(mins) + ":" + addZero(secs) + " " + ampm
    checkAlarm(alarmString);
    document.getElementById("display-time").innerHTML =  alarmString;
};

setInterval(currentTime, 1000);