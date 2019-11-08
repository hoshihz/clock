var arr = [
	//'(1+1)/10',
	'(1+2/10',
	'(1+2)(2+4)',
	'(1+2)(3+4)/10+(4+5(2*(-2-4))%10)+(-2(4+3))',
	'6+16(14+16(3+16(14+16(7+16*6))))',
  '2*-6',
  '~2e1',
  '26 xor 1',
  'word',
  '52//10'
]
arr.forEach(i => {console.log(`—————— ${i}`, '\n math:', math(i))})

function math(str) {
	str = str.replace(/\s/g, '').replace(/(?<=\d|\))\(/g, '*(')
  if (/[^0-9,.e()+\-*\/^%><&|~xor]/i.test(str)) {
    return 'stop!'
  }
	var index = findBracket(str)
	if (index === 'bracket error') {
		return index
	}
  while (str.includes('(')) {
    let scope = 0
    index.forEach(i => scope = Math.max(scope, i.scope))
    let i = index.find(j => j.scope === scope)
    let exp = str.slice(i[0]+1, i[1])
    str = str.slice(0,i[0]) + calc(exp) + str.slice(i[1]+1)
    index = findBracket(str)
  }
  var ans = calc(str)
  if (isNaN(ans))
    return 'stop!'
	return comma(ans)

  function findBracket(str) {
    //number of total brackets
    var brackets = str.replace(/[^()]/g, '').length
    //brackets don't match
    if (brackets % 2 != 0)
      return 'bracket error'
    var index = Array(brackets/2)
    var temp = str
    //open brackets
    for (let i of index.keys()) {
      index[i] = []
      index[i][0] = temp.indexOf('(')
      temp = temp.replace('(', ' ')
    }
    //close brackets
    temp = str
    for (let i of index.keys()) {
      index[i][1] = temp.indexOf(')')
      //bracket at wrong spot
      if (index[i][0] > index[i][1])
        return 'bracket error'
      let str = temp
      //deal with nested brackets
      let j = i
      while (index[++j]) {
        if (index[j][0] < index[i][1]) {
          str = str.replace(')', ' ')
          index[i][1] = str.indexOf(')')
        } continue
      }
      temp = temp.slice(0, index[i][1]) +
        ' ' + temp.slice(index[i][1]+1)
    }
    //add scopes
    for (let i of index.keys()) {
      //first scope
      if (i === 0) {
        index[i].scope = 1
        continue
      }
      //if the current ( comes before ) => (())
      //enter next scope
      if (index[i][0] < index[i-1][1])
        index[i].scope = index[i-1].scope+1
      else {
        let j = i
        //if the current ( comes after ) => )(
        //find the current scope
        while (index[i][0] > index[--j][1]) {
          index[i].scope = index[j].scope
          //break loop if at the lowerst scope
          if (index[i].scope === 1)
            break
        }
      }
    }
    return index
  }

  function calc(str) {
    //do exponents
    var op = [
      ['^'],
      ['~'],
      ['*', '/', '//', '%'],
      ['+', '-'],
      ['<<', '>>', '>>>'],
      ['&', '|', 'xor']
    ]
    for (let i of op.keys()) {
      if (i === 1) {
        var reg = new RegExp(/(?<!\d)(\~)(\d+\.?\d*(e[+-]?\d+)?)/)
        while (reg.test(str)) {
          str = str.replace(reg, _calc(RegExp.$1, RegExp.$2))
        }
      }
      else {
        var reg = '(\\d+\\.?\\d*(e[+-]?\\d+)?)(\\'
          + op[i].join('|\\') +
          ')([+-]?\\d+\\.?\\d*(e[+-]?\\d+)?)'
        if (i > 1)
          reg = '(?<!\\d)([+-]?' + reg.slice(1)
        reg = new RegExp(reg)
        while (reg.test(str)) {
          str = str.replace(reg,
            _calc(RegExp.$3, RegExp.$1, RegExp.$4))
        }
      }
    }
    return Number(str)
    function _calc(op, a, b) {
      a = Number(a)
      b = Number(b)
      switch(op) {
        case ('~'): return ~a
        case ('*'): return a * b
        case ('/'): return a / b
        case ('%'): return a % b
        case ('+'): return a + b
        case ('-'): return a - b
        case ('&'): return a & b
        case ('|'): return a | b
        case ('^'): return a ** b
        case ('<<'): return a << b
        case ('>>'): return a >> b
        case ('//'): return Math.floor(a/b)
        case ('>>>'): return a >>> b
        case ('xor'): return a ^ b
      }
    }
  }

  function comma(str) {
    str = String(str).split('.')
    str[0] = str[0].replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
    return str.join('.')
  }
}
