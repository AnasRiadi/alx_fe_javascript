 let quotes = JSON.parse(localStorage.getItem('quotes')) || [
      { text: "Believe you can and you're halfway there.", category: "Motivation" },
      { text: "Success is not final, failure is not fatal.", category: "Success" },
      { text: "Do what you can with what you have.", category: "Inspiration" }
    ];

    function showRandomQuote() {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - ${quote.category}`;
      sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
    }

    function createAddQuoteForm() {
      const formContainer = document.getElementById('quoteFormContainer');
      formContainer.innerHTML = '';

      const inputText = document.createElement('input');
      inputText.id = 'newQuoteText';
      inputText.type = 'text';
      inputText.placeholder = 'Enter a new quote';
      formContainer.appendChild(inputText);

      const inputCategory = document.createElement('input');
      inputCategory.id = 'newQuoteCategory';
      inputCategory.type = 'text';
      inputCategory.placeholder = 'Enter quote category';
      formContainer.appendChild(inputCategory);

      const addButton = document.createElement('button');
      addButton.innerText = 'Add Quote';
      addButton.addEventListener('click', addQuote);
      formContainer.appendChild(addButton);
    }

    function addQuote() {
      const newQuoteText = document.getElementById('newQuoteText').value;
      const newQuoteCategory = document.getElementById('newQuoteCategory').value;
      if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        localStorage.setItem('quotes', JSON.stringify(quotes));
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        showRandomQuote();
      } else {
        alert('Please enter both a quote and a category.');
      }
    }

    function exportToJsonFile() {
      const dataStr = JSON.stringify(quotes, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'quotes.json';
      link.click();
    }

    function importFromJsonFile(event) {
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        alert('Quotes imported successfully!');
      };
      fileReader.readAsText(event.target.files[0]);
    }

    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    createAddQuoteForm();
