const form = document.querySelector('#search_form')
const input = document.querySelector('#q')
const results = document.querySelector('#results')

form.addEventListener('submit', ev => {
  ev.preventDefault()

  let page = 1
  const title = input.value.trim()
  let allResults = []

  results.innerHTML = 'Loading...'

  makeRequestsAndAppend(title, page, allResults, () => {
    allResults = allResults.reduce((acum, result) => acum.concat(result), [])

    const mappedHtml = allResults.map(
      item => `<li class="list-group-item">${item.Title}</li>`
    )
    results.innerHTML = mappedHtml.join('\n')
  })
})

function makeRequestsAndAppend(title, page, allResults, cb) {
  return fetch(
    `https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}&page=${page}`
  )
    .then(res => res.json())
    .then(data => {
      allResults.push(data.data)
      if (page < data.total_pages) {
        results.innerHTML = `Loading... (Retrieving page ${page}/${data.total_pages}`
        makeRequestsAndAppend(title, page + 1, allResults, cb)
      } else {
        cb(allResults)
      }
    })
}
