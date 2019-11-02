class BlackJack {
  constructor() {
    BlackJack.deck = []
    BlackJack.resetdeck()
    BlackJack.shuffle()
    this.hand = []
    this.dealer = []
  }

  start() {
    BlackJack.getCard(2, this.hand)
    this.deal()
    return "started"
  }
  deal() {
    BlackJack.getCard(2, this.dealer)
    Object.defineProperty(this, "dealerHidden", {
      value: this.dealer.pop(),
      enumerable: false
    })
    return "dealt"
  }
  hit() {
    BlackJack.getCard(1, this.hand)
    if (this.point == 21) {
      return "blackjack!"
    }
    if (this.point > 21) {
      return "bust!"
    }
    return this
  }
  stand() {
    this.dealer.push(this.dealerHidden)
    while (this.dealerPoint < 17) {
      BlackJack.getCard(1, this.dealer)
    }
    if (this.dealerPoint == 21) {
      return "dealer blackjack!"
    }
    if (this.dealerPoint >= 17) {
      if (this.dealerPoint > this.point)
        return "dealer wins!"
      else if (this.dealerPoint < this.point)
        return "player wins!"
      else
        return "tied!"
    }
  }

  static resetdeck() {
    let cards = 'A234567890JQK'
    for (let i of cards)
      for (let suits = 0; suits < 4; suits++) {
        if (i == '0')
          BlackJack.deck.push('10')
        else
          BlackJack.deck.push(i)
      }
    return "reset complete"
  }
  static shuffle() {
    BlackJack.deck.sort(() => {
      return Math.floor(Math.random()*3 - 1)
    })
    return "shuffled"
  }
  static getCard(n, hand) {
    if (n === undefined || n < 1) n = 1
    for (let i = 0; i < n; i++) {
      hand.push(BlackJack.deck.shift())
    }
    return `given ${n} card${n>1?'s':''}`
  }
  static toPoint(hand) {
    let point = 0
    let noA = hand.filter(a => a != 'A')
    for (let i of noA) {
      if (isNaN(i))
        point += 10
      else
        point += Number(i)
    }

    (function dealWithA(a, sum, n) {
      for (let i of a.keys()) {
        if (i+1 >= n) sum += 11
        else sum += 1
      }
      if (n != a.length && sum > 21)
        dealWithA(a, point, n+1)
      else
        point = sum
    })(hand.filter(a => a == 'A'), point, 0)

    return point
  }

  static get decklen() {
    return BlackJack.deck.length
  }
  
  get deck() {
    return BlackJack.deck
  }
  get point() {
    return BlackJack.toPoint(this.hand)
  }
  get dealerPoint() {
    return BlackJack.toPoint(this.dealer)
  }
}
