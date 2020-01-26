const body = document.querySelector('body');

body.onmousemove = function(e) {
  var rect = e.target.getBoundingClientRect()
  var x = e.clientX - rect.left
  var y = e.clientY - rect.top
  body.style.setProperty('--x', x + 'px')
  body.style.setProperty('--y', y + 'px')
}


const milliseconds = document.getElementsByClassName('milliseconds')[0];
const seconds = document.getElementsByClassName('seconds')[0];
const minutes = document.getElementsByClassName('minutes')[0];
const hours = document.getElementsByClassName('hours')[0];
const days = document.getElementsByClassName('days')[0];
const months = document.getElementsByClassName('months')[0];

const date = document.getElementsByClassName('date')[0];

const strokeWidth = 20;

const millisecondsRadius = 50;
const millisecondsCircumference = 2 * Math.PI * millisecondsRadius;
milliseconds.setAttribute('r', millisecondsRadius);
milliseconds.setAttribute('stroke-width', strokeWidth);
milliseconds.style.setProperty('--stroke-dasharray', millisecondsCircumference);

const secondsRadius = millisecondsRadius + strokeWidth;
const secondsCircumference = 2 * Math.PI * secondsRadius;
seconds.setAttribute('r', secondsRadius);
seconds.setAttribute('stroke-width', strokeWidth);
seconds.style.setProperty('--stroke-dasharray', secondsCircumference);

const minutesRadius = secondsRadius + strokeWidth;
const minutesCircumference = 2 * Math.PI * minutesRadius;
minutes.setAttribute('r', minutesRadius);
minutes.setAttribute('stroke-width', strokeWidth);
minutes.style.setProperty('--stroke-dasharray', minutesCircumference);

const hoursRadius = minutesRadius + strokeWidth;
const hoursCircumference = 2 * Math.PI * hoursRadius;
hours.setAttribute('r', hoursRadius);
hours.setAttribute('stroke-width', strokeWidth);
hours.style.setProperty('--stroke-dasharray', hoursCircumference);

const daysRadius = hoursRadius + strokeWidth;
const daysCircumference = 2 * Math.PI * daysRadius;
days.setAttribute('r', daysRadius);
days.setAttribute('stroke-width', strokeWidth);
days.style.setProperty('--stroke-dasharray', daysCircumference);

const monthsRadius = daysRadius + strokeWidth;
const monthsCircumference = 2 * Math.PI * monthsRadius;
months.setAttribute('r', monthsRadius);
months.setAttribute('stroke-width', strokeWidth);
months.style.setProperty('--stroke-dasharray', monthsCircumference);

// You can set any date as now.
const startTime = new Date();

const offset = startTime.getTime() - new Date().getTime();

const animate = () => {
  requestAnimationFrame(animate);

  const now = new Date( new Date().getTime() + offset );
  const secondNormalized = now.getMilliseconds() / 1000;
  const minuteNormalized = (now.getSeconds() + secondNormalized) / 60;
  const hourNormalized = (now.getMinutes() + minuteNormalized) / 60;
  const dayNormalized = (now.getHours() + hourNormalized) / 24;
  const monthNormalized = (now.getDate() - 1 + dayNormalized) / new Date(now.getYear(), now.getMonth() + 1, 0).getDate();
  const yearNormalized = (now.getMonth() + monthNormalized) / 12;

  milliseconds.style.setProperty('--stroke-dashoffset', ( 1 - secondNormalized ) * millisecondsCircumference );
  seconds.style.setProperty('--stroke-dashoffset', ( 1 - minuteNormalized ) * secondsCircumference );
  minutes.style.setProperty('--stroke-dashoffset', ( 1 - hourNormalized ) * minutesCircumference );
  hours.style.setProperty('--stroke-dashoffset', ( 1 - dayNormalized ) * hoursCircumference );
  days.style.setProperty('--stroke-dashoffset', ( 1 - monthNormalized ) * daysCircumference );
  months.style.setProperty('--stroke-dashoffset', ( 1 - yearNormalized ) * monthsCircumference );

  date.innerHTML = now;
};

animate();
