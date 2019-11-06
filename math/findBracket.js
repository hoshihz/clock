var str
str = '(1+2)(3+4)/10+(4+5(2*(2-4))%10)'
str = '6+16(14+16(3+16(14+16(7+16*6))))'
//str = '(1+(2)'
console.log(findBracket(str))

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

  while (loop(index)) {
    for (let i of index.keys()) {
      if (index[i+1] && index[i][1] > index[i+1][0]) {
        index[i] = index[i].concat(index.splice(i+1))
      }
    }
  }
  function loop(arr) {
    for (let i of arr.keys()) {
      if (arr[i+1] && arr[i][1] > arr[i+1][0]) {
			  return true
		  } return false
    }
  }
	return index
}
