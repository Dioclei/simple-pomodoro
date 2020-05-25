let getRandomQuote = () => {
  // Try to keep the quotes short and sweet
  let quotes = [
    'Hang in there!',
    'You can do this!',
    "Don't let anyone stop you!",
    "Let's do this!",
  ]

  return quotes[Math.floor(Math.random() * 5)]
}

var quote = new Vue({
  el: '#quote',
  data: {
    quote: getRandomQuote()
  }
})
