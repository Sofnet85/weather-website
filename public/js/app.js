const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', ((e) => {
  e.preventDefault()
  
  const location = search.value
  messageOne.textContent = 'loading...'
  messageTwo.textContent = ''
  const url2 = `/weather?address=${location}`

  fetch(url2).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location 
        messageTwo.textContent = data.forecast
      }
    })
  })
}))