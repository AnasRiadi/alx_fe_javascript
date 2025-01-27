  let quotes = JSON.parse(localStorage.getItem('quotes')) || [
      { text: "Believe you can and you're halfway there.", category: "Motivation" },
      { text: "Success is not final, failure is not fatal.", category: "Success" },
      { text: "Do what you can with what you have.", category: "Inspiration" }
    ];

    const serverURL = 'https://jsonplaceholder.typicode.com/posts';

    async function fetchQuotesFromServer() {
      try {
        const response = await fetch(serverURL);
        const serverQuotes = await response.json();
        quotes = serverQuotes;
        localStorage.setItem('quotes', JSON.stringify(quotes));
        populateCategories();
        filterQuotes();
      } catch (error) {
        console.error('Error fetching quotes from server:', error);
      }
    }

    async function syncWithServer() {
      await fetchQuotesFromServer();
      alert('Quotes synced with server!');
    }

    function populateCategories() {
      const categories = [...new Set(quotes.map(q => q.category))];
      const categoryFilter = document.getElementById('categoryFilter');
      categoryFilter.innerHTML = '<option value="all">All Categories</option>';
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
      });
      const savedCategory = localStorage.getItem('selectedCategory');
      if (savedCategory) categoryFilter.value = savedCategory;
    }

    function filterQuotes() {
      const selectedCategory = document.getElementById('categoryFilter').value;
      localStorage.setItem('selectedCategory', selectedCategory);
      const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(q => q.category === selectedCategory);
      document.getElementById('quoteDisplay').innerHTML = filteredQuotes.length ? `"${filteredQuotes[0].text}" - ${filteredQuotes[0].category}` : 'No quotes available.';
    }

    function showRandomQuote() {
      const filteredQuotes = document.getElementById('categoryFilter').value === 'all' ? quotes : quotes.filter(q => q.category === document.getElementById('categoryFilter').value);
      if (filteredQuotes.length) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quote = filteredQuotes[randomIndex];
        document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - ${quote.category}`;
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
      } else {
        document.getElementById('quoteDisplay').innerHTML = 'No quotes available.';
      }
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
        populateCategories();
        filterQuotes();
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
        populateCategories();
        filterQuotes();
        alert('Quotes imported successfully!');
      };
      fileReader.readAsText(event.target.files[0]);
    }

    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    populateCategories();
    createAddQuoteForm();
    filterQuotes();
    syncWithServer();
    setInterval(syncWithServer, 60000);
