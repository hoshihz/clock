
var arr = [
	//'(1+1)/10',
	'(1+2/10',
	'(1+2)(2+4)',
	'(1+2)(3+4)/10+(4+5(2*(2-4))%10)',
	'6+16(14+16(3+16(14+16(7+16*6))))'
]
arr.forEach(i => {console.log(`————— ${i}`); math(i)})

function math(str) {
	str = str.replace(/\s/g, '').replace(/(?<=\d|\))\(/g, '*(')
	var exp = [], ans = 0
	var index = findBracket(str)
	if (index === 'bracket error') {
		console.log('math: bracket error')
		return index
	}
	index.forEach(i => {
		exp.push(str.slice(i[0]+1, i[1]))
	})
	console.log('math:', exp)
	return ans
}

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
	return index
}
