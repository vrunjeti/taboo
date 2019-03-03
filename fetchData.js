const axios = require('axios')
const fs = require('fs')

const dataPath = './data.json'
const url = 'https://playtaboo.com/ajax/v1/next?1'

function read(callback) {
  fs.readFile(dataPath, 'utf8', (err, file) => {
    if (err) {
      console.error(err)
      return
    }
    const data = JSON.parse(file)
    callback(data)
  })
}

function write(data) {
  fs.writeFile(dataPath, JSON.stringify(data), 'utf8')
}

function fetchData() {
  return axios.get(url).then(res => {
    return extractData(res.data)
  })
}

const extract = div =>
  div.substring(div.indexOf('>'), div.indexOf('</')).slice(1)

function extractData(div) {
  const elements = div.split('\r').map(w => w.trim())
  const wordDiv = elements[2]
  const hintsDivs = elements.slice(4, 9)
  const word = extract(wordDiv)
  const hints = hintsDivs.map(extract)
  return { word, hints }
}

let numAlreadySeen = 0

function fetchAndWrite() {
  read(data => {
    fetchData().then(extractedData => {
      const { word, hints } = extractedData
      if (!data[word]) {
        data[word] = hints
      } else {
        numAlreadySeen++
        const numEntries = Object.keys(data).length
        console.log({ numEntries, numAlreadySeen })
      }
      write(data)
    })
  })
}

let timeout
function startRandomInterval(time, callback) {
  timeout = setTimeout(() => {
    callback()
    clearTimeout(timeout)
    startRandomInterval(time, callback)
  }, Math.round(Math.random() * time))
}

startRandomInterval(5000, fetchAndWrite)
