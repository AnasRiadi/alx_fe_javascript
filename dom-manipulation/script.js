const quotes = [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal.", category: "Success" },
    { text: "Do what you can with what you have.", category: "Inspiration" }
  ];

  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - ${quote.category}`;
  }

  function createAddQuoteForm() {
    const formContainer = document.getElementById('quoteFormContainer');
    formContainer.innerHTML = `
      <input id='newQuoteText' type='text' placeholder='Enter a new quote' />
      <input id='newQuoteCategory' type='text' placeholder='Enter quote category' />
      <button onclick='addQuote()'>Add Quote</button>
    `;
  }

  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      alert('Quote added successfully!');
    } else {
      alert('Please enter both a quote and a category.');
    }
  }

  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  createAddQuoteForm();
