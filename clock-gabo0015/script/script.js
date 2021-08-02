fetch('https://api.nasa.gov/planetary/apod?api_key=dpb1WnlFb6472XHlk8wE1eh9PcQFtsEgrYXdk9Em')
  .then(function (response) {
      return response.json()
  })
  .then(function (json) {
    // console.log(json.url)
    document.querySelector('body').style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${json.url})`
})



const $clockHour = document.getElementById('hour')
const $clockMinute = document.getElementById('minute')
const $clockSecond = document.getElementById('second')
//analog clock

const $clockHours = document.getElementById('hours')
const $clockMinutes = document.getElementById('minutes')
const $clockSeconds = document.getElementById('seconds')
const $ampm = document.getElementById ('ampm')
//digital clock

const $dayOfWeek = document.getElementById('dayOfWeek')
const $fullDate = document.getElementById('fullDate')
const $dayOfMonth = document.getElementById('dayOfMonth')
const $dayOfYear = document.getElementById('dayOfYear')
const $weekOfYear = document.getElementById('weekOfYear')
const $month = document.getElementById('month')
const $year = document.getElementById('year')
//extra date information

const $greeting = document.getElementById('greeting')

const DateTime = luxon.DateTime

updateClock = () => {
  const now = DateTime.local()
  const $nowHour = now.hour
  const $nowMinute = now.minute
  const $nowSecond = now.second
  const date = DateTime.fromISO(now)


  if ($nowHour < 5) {
    $greeting.innerHTML = 'Good Night'
  } else if ($nowHour < 12) {
    $greeting.innerHTML = 'Good Morning'
  } else if ($nowHour < 17) {
    $greeting.innerHTML = 'Good Afternoon'
  } else if ($nowHour < 20) {
    $greeting.innerHTML = 'Good Evening'
  } else if ($nowHour < 24) {
    $greeting.innerHTML = 'Good Night'
  }
  //different greeting message based on the hour of the day
      
  if ($nowHour > 12) {
    const $hour = $nowHour - 12
    $clockHour.style.transform = `rotate(${(($hour / 12) * 360)}deg)`
    $clockHours.innerHTML = date.toFormat('hh')
  } else {
    $clockHour.style.transform = `rotate(${(($nowHour / 12) * 360)}deg)`
    $clockHours.innerHTML = $nowHour
  }
  //checks if hour is greater than 12, and subtracts 12 from the number if it is in order to acomodate 24hr time
  
  
  $clockMinute.style.transform = `rotate(${(($nowMinute / 60) * 360)}deg)`
  $clockSecond.style.transform = `rotate(${(($nowSecond / 60) * 360)}deg)`
  //rotates the clock hand based on the time

  $clockMinutes.innerHTML = date.toFormat('mm')
  $clockSeconds.innerHTML = date.toFormat('ss')
  $ampm.innerHTML = date.toFormat('a')

  $fullDate.innerHTML = date.toFormat("cccc LLLL dd',' y")
  $dayOfWeek.innerHTML = date.toFormat("'Day of the week: 'cccc")
  $dayOfMonth.innerHTML = date.toFormat("'Day of the Month: 'dd")
  $dayOfYear.innerHTML = date.toFormat("'Day of the Year:' o")
  $weekOfYear.innerHTML = date.toFormat("'Week of the Year:' WW")
}

setInterval(() => {
  updateClock()
}, 1000);
//updates clock every second

const $clockDots1 = document.getElementById('animate1') 
const $clockDots2 = document.getElementById('animate2') 
timeAnimate = () => {
  $clockDots1.classList.toggle('dots')
  $clockDots2.classList.toggle('dots')
}
setInterval(() => {
  timeAnimate()
}, 500);
//animates dots on digital clock

const $settingsBtn = document.getElementById('settingsBtn')
const $settingsMenu = document.getElementById('settings')

$settingsBtn.addEventListener('click', () => {
  if ($settingsMenu.style.display === 'block') {
    $settingsMenu.style.display = 'none'
  } else {
    $settingsMenu.style.display = 'block'
  }
})

const $moreInfo = document.getElementById('more')
const $moreTimeInfo = document.getElementById('moreTimeInfo')


$moreInfo.addEventListener('click', () => {
  if ($moreTimeInfo.style.display === 'block') {
    $moreTimeInfo.style.display = 'none'
  } else {
    $moreTimeInfo.style.display = 'block'
  }
})

const $clockType = document.getElementById('clockType')
const $analogSelect = document.getElementById('analogSelect')
const $digitalSelect = document.getElementById('digitalSelect')
const $bothSelect = document.getElementById('bothSelect')
const $analogClock = document.getElementById('analogClock')
const $digitalClock = document.getElementById('digitalClock')

$clockType.addEventListener('click', () => {
  if ($analogSelect.checked){
    $analogClock.style.display = 'block'
    $digitalClock.style.display = 'none'
    localStorage.setItem('clockType', 'analog')
    $analogSelect.checked = true
  } else if ($digitalSelect.checked) {
    $analogClock.style.display = 'none'
    $digitalClock.style.display = 'grid'
    localStorage.setItem('clockType', 'digital')
    $digitalSelect.checked = true
  } else if ($bothSelect.checked) {
    $analogClock.style.display = 'block'
    $digitalClock.style.display = 'grid'
    localStorage.setItem('clockType', 'both')
    $bothSelect.checked = true
  }
})
//clock face customisation

const storageItem = localStorage.getItem('clockType')
if (storageItem === 'analog') {
  $analogClock.style.display = 'block'
  $digitalClock.style.display = 'none'
  $analogSelect.checked = true
} else if (storageItem === 'digital') {
  $analogClock.style.display = 'none'
  $digitalClock.style.display = 'grid'
  $digitalSelect.checked = true
} else if (storageItem === 'both') {
  $analogClock.style.display = 'block'
  $digitalClock.style.display = 'grid'
  $bothSelect.checked = true
} else if (storageItem == null) {
  $bothSelect.checked = true
}
//checks local storage clockType key to use users previous settings

const $dateInfo = document.getElementById('dateInfo')
const $showDate = document.getElementById('showDate')
const $dontShowDate = document.getElementById('dontShowDate')
const $date = document.getElementById('date')

$dateInfo.addEventListener('click', () => {
  if ($showDate.checked) {
    $date.style.display = 'block'
    localStorage.setItem('showDate', 'yes')
  } else if ($dontShowDate.checked) {
    $date.style.display = 'none'
    localStorage.setItem('showDate', 'no')
  }
})

const storageItem2 = localStorage.getItem('showDate')
if (storageItem2 === 'yes') {
  $date.style.display = 'block'
  $showDate.checked = true
} else if (storageItem2 === 'no') {
  $date.style.display = 'none'
  $dontShowDate.checked = true
} else if (storageItem2 == null) {
  $showDate.checked = true
}


const $showSeconds = document.getElementById('showSeconds')
const $dontShowSeconds = document.getElementById('dontShowSeconds')
const $secondsOption = document.getElementById('secondsOption')
const $digital = document.getElementById('digitalClock')

$secondsOption.addEventListener('click', () => {
  if ($showSeconds.checked) {
    $clockSecond.style.display = 'block'
    $clockSeconds.style.display = 'block'
    $clockDots2.style.display = 'block'
    $digital.style.gridTemplateColumns = 'repeat(6, 40px)'
    localStorage.setItem('showSeconds', 'yes')
  } else if ($dontShowSeconds.checked) {
    $clockSecond.style.display = 'none'
    $clockSeconds.style.display = 'none'
    $clockDots2.style.display = 'none'
    $digital.style.gridTemplateColumns = 'repeat(4, 40px)'
    localStorage.setItem('showSeconds', 'no')
  }
})

const storageItem3 = localStorage.getItem('showSeconds')
if (storageItem3 === 'yes') {
  $clockSecond.style.display = 'block'
  $clockSeconds.style.display = 'block'
  $clockDots2.style.display = 'block'
  $digital.style.gridTemplateColumns = 'repeat(6, 45px)'
  $showSeconds.checked = true
} else if (storageItem3 === 'no') {
  $clockSecond.style.display = 'none'
  $clockSeconds.style.display = 'none'
  $clockDots2.style.display = 'none'
  $digital.style.gridTemplateColumns = 'repeat(4, 45px)'
  $dontShowSeconds.checked = true
} else if (storageItem3 == null) {
  $showSeconds.checked = true
}