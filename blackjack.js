function getCard(n) {
  if (n === undefined || n < 1) n = 1
  var cards = 'A234567890JQK'
  let res = []
  for (let i = 0; i < n; i++) {
    let r = Math.floor(Math.random() * cards.length)
    if (cards[r] == '0')
      res.push('10')
    else
      res.push(cards[r])
  }
  return res
}

function toPoint(n) {
  let noA = n.filter(a => a != 'A')
  let point = 0
  for (let i of noA) {
    if (isNaN(i))
      point += 10
    else
      point += Number(i)
  }

  function dealWithA(a) {
    
  }(n.filter(a => a == 'A'))

  return point 
}

console.log(['2','3','4','5','6','7','8','9','A','J','K','Q','10','A'].filter(a => a!='A'))
