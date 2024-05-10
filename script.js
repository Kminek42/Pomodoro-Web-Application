function startButtonHandler() {
    if (startButton.textContent == 'Start') {
        startButton.textContent = 'Stop';
        console.log('counting...')
        isCounting = true;
    }

    else {
        startButton.textContent = 'Start';
        console.log('stop counting')
        isCounting = false;
    }
}

function resetButtonHandler() {
    isCounting = false;
    localStorage.clear();
    location.reload();
}

function sec2min(seconds) {
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;
    return min + ':' + (sec < 10? '0' : '') + sec;
}

function updateLessonTime() {
    localStorage.setItem('lessonTime', lessonTimeField.value);
}

function updateBreakTime() {
    localStorage.setItem('breakTime', breakTimeField.value);
}

function updateLongBreakTime() {
    localStorage.setItem('longBreakTime', longBreakTimeField.value)
}

function tick() {
    if (isCounting) {
        let timeRemaining = localStorage.getItem('remainingTime') - 1;
        localStorage.setItem('remainingTime', timeRemaining);
        remainingTimeField.textContent = 'Remaining time: ' + sec2min(timeRemaining);
        if (timeRemaining <= 0) {
            audio.play()
            if (stateField.textContent == 'Lesson') {
                console.log(localStorage.getItem('round'))
                if (localStorage.getItem('round') % 4 == 0) {
                    stateField.textContent = 'Long Break';
                    localStorage.setItem('remainingTime', localStorage.getItem('longBreakTime') * 60);
                }
                
                else {
                    stateField.textContent = 'Break';
                    localStorage.setItem('remainingTime', localStorage.getItem('breakTime') * 60);
                }
            }

            else {
                stateField.textContent = 'Lesson';
                localStorage.setItem('remainingTime', localStorage.getItem('lessonTime') * 60);
                localStorage.setItem('round', Number(localStorage.getItem('round')) + 1);
                roundCounter.textContent = 'Round ' + localStorage.getItem('round');
            }
        }

        remainingTimeField.textContent = 'Remaining time: ' + sec2min(timeRemaining);
    }
}

// load settings
if (localStorage.length == 0) {
    localStorage.setItem('lessonTime', 25);
    localStorage.setItem('breakTime', 5);
    localStorage.setItem('longBreakTime', 15);
    localStorage.setItem('state', 'Lesson');
    localStorage.setItem('remainingTime', 25*60);
    localStorage.setItem('round', 1);
}

// get audio
let audio = document.createElement('audio');
audio.src = 'alarm.wav'
console.log(audio);

// get components from html and add event handlers
var lessonTimeField = document.getElementById('lessonTime');
lessonTimeField.value = localStorage.getItem('lessonTime');
lessonTimeField.addEventListener('click', updateLessonTime);

var breakTimeField = document.getElementById('breakTime');
breakTimeField.value = localStorage.getItem('breakTime');
breakTimeField.addEventListener('click', updateBreakTime);

var longBreakTimeField = document.getElementById('longBreakTime');
longBreakTimeField.value = localStorage.getItem('longBreakTime');
longBreakTimeField.addEventListener('click', updateLongBreakTime);

var roundCounter = document.getElementById('roundCounter');
roundCounter.textContent = 'Round ' + localStorage.getItem('round');

var startButton = document.getElementById('startButton');
startButton.addEventListener('click', startButtonHandler);

var resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetButtonHandler);

var stateField = document.getElementById('state');
var remainingTimeField = document.getElementById('remainingTime');

remainingTimeField.textContent = 'Remaining time: ' + sec2min(localStorage.getItem('remainingTime'));

var isCounting = false;

setInterval(tick, 1000);
