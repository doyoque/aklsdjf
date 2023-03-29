const fs = require('fs')

// Read file sample.json
fs.readFile('sample.json', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
    return
  }

  const jsonData = JSON.parse(data)

  // assign `fieldErrors` property to fieldErrors variable
  const fieldErrors = jsonData.fieldErrors

  // Loop each property `fieldErrors`
  for (let i = 0; i < fieldErrors.length; i++) {
    console.log(_isCorrect(fieldErrors[i]))
  }

  console.log(fieldErrors.length)
})

function _isCorrect(item) {
  let isCorrect = false

  // assign `messageKey` to msgKey variable
  const msgKey = item.messageKey

  // assign `message` to actualMsg variable
  const actualMsg = item.message

  // assign `values.min` to minVal variable
  const minVal = item.values.min

  // assign `values.max` to maxVal variable
  const maxVal = item.values.max

  // messageKey have dot anotation that tell us the cause
  // at the end of strings. Assuming the error message only
  // to tell that the string is `too.long` or `too.short`

  // .split() transform a string into array. By doing this it can also
  // use .at(-1) to grab the last element of the array.
  // since the messageKey can be vary it can use switch case to safety
  // control flow what the last message is contain of
  let regexKeyword = ''
  const key = msgKey.split('.').at(-1)
  switch (key) {
    case 'long':
      regexKeyword = 'more than'
      break
    case 'short':
      regexKeyword = 'less than'
      break
    default:
      console.log(`the last message key is unidentify`)
      break
  }

  // using regex.exec() return a result of array of matched string.
  // in this case the matched string is `more than 9` so it will 
  // return ['more than 9', 9] in order.
  // if matced then just validate previous `values.max` to the index one and 
  // override isCorrect variable to true if the value is identical.
  //
  // The uncover edge cases:
  // - what if the message contain `more than 10 and less than 7`?
  // - is there any different error other than `too long` or `too short`?
  const regex = new RegExp(`${regexKeyword} (\\d+)`)
  const match = regex.exec(actualMsg)
  if (match) {

    // validate if `values.max` is identical as number inside the `message`
    if (maxVal == match[1]) {
      console.log(`[${item.target}][${match[1]}] passed`)
      isCorrect = true
    }

    // validate if `values.min` is identical as number inside the `message`
    if (minVal == match[1]) {
      console.log(`[${item.target}][${match[1]}] passed`)
      isCorrect = true
    }
  }

  return isCorrect
}
