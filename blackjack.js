class BlackJack {
  constructor() {
    this.deck = (() => {
      let cards = 'A234567890JQK'
      let deck = []
      for (let i of cards)
        for (let suits of Array(4)) {
          if (i == '0') deck.push('10')
          else deck.push(i)
        }
      return deck
    })()
    this.decklen = this.deck.length
    this.hand = []
    this.point = 0
    Object.defineProperty(this, 'deck', {enumerable: false})
  }

  getCard(n) {
    if (n === undefined || n < 1) n = 1
    let r = Math.floor(Math.random()*3 - 1)
    this.deck.sort(() => r)
    for (let i = 0; i < n; i++) {
      this.hand.push(this.deck.shift())
    }
    this.point = this.toPoint()
    this.decklen -= n
    return this
  }

  reset() {
    this.hand = []
    return this
  }

  toPoint() {
    let noA = this.hand.filter(a => a != 'A')
    let point = 0
    for (let i of noA) {
      if (isNaN(i))
        point += 10
      else
        point += Number(i)
    }

    (function dealWithA(a, sum, n) {
      for (let i in a) {
        if (i+1 >= n) sum += 11
        else sum += 1
      }
      if (n != a && sum > 21)
        dealWithA(a, point, n+1)
      else
        point = sum
    })(this.hand.filter(a => a == 'A'), point, 0)

    return point 
  }
}

var bj = new BlackJack()
bj.getCard(3)
