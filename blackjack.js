var cards = 'A234567890JQK'

function getCard(n) {
  if (n === undefined || n < 1) n = 1
  let res = ''
  for (let i = 0; i < n; i++) {
    let r = Math.floor(Math.random() * cards.length)
    if (cards[r] == '0') res += '10' + ' '
    else res += cards[r] + ' '
  }
  return res.trim()
}

function toPoint(n) {
  n = n.split(' ')
  let point = 0
  for (let i of n) {
    if (isNaN(i)) {
      if (i == 'A') point += 11
      else point += 10
    } else point += Number(i)
  }

  if (point > 21 && n.includes('A')) {}
  return point 
}

function checkA() {

}


console.log(['2','3','4','5','6','7','8','9','A','J','K','Q','10','A'].filter(a => a=='A'))
