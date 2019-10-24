(function () {
var out = document.createElement("DIV"); out.id = "out"
var sec = document.createElement("DIV"); sec.id = "sec"
var min = document.createElement("DIV"); min.id = "min"
var hr = document.createElement("DIV"); hr.id = "hr"

for (let i of [sec, min, hr]) out.appendChild(i)

clock.appendChild(out)

var s

s = out.style
s.position = "relative"
s.width = "10vh"
s.height = "10vh"
s.borderRadius = "50%"
s.background = "radial-gradient(rgb(60,60,60), rgb(10,10,10), black)"

s = hr.style
s.display = "block"
s.position = "absolute"
s.top = "20%"
s.left = "47%"
s.width = "4%"
s.height = "35%"
s.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
s.backgroundColor = "white"
s.transformOrigin = "50% 90%"
s.zIndex = 1

s = min.style
s.display = "block"
s.position = "absolute"
s.top = "10%"
s.left = "48%"
s.width = "2%"
s.height = "50%"
s.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
s.backgroundColor = "white"
s.transformOrigin = "50% 80%"
s.zIndex = 2

s = sec.style
s.display = "block"
s.position = "absolute"
s.top = "5%"
s.left = "48.5%"
s.width = "1%"
s.height = "50%"
s.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
s.backgroundColor = "red"
s.transformOrigin = "50% 90%"
s.zIndex = 3

id = setInterval(() => {
var date = new Date()
if (date.getSeconds() == 0)
sec.style.transform = `rotate(0deg)`
sec.style.transform = `rotate(${(date.getSeconds()+date.getMilliseconds()/1000)*6}deg)`
min.style.transform = `rotate(${(date.getMinutes()+date.getSeconds()/60)*6}deg)`
hr.style.transform = `rotate(${(date.getHours()+date.getMinutes()/60)*30}deg)`
 },10)
})()
