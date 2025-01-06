function sortBooks(criteria) {
    const bookGrid = document.querySelector('.book-grid');
    const books = Array.from(bookGrid.children);
  
    books.sort((a, b) => {
      switch(criteria) {
        case 'rating':
          return b.dataset.rating - a.dataset.rating;
        case 'date':
          return new Date(b.dataset.date) - new Date(a.dataset.date);
        case 'title':
          return a.querySelector('h3').textContent
            .localeCompare(b.querySelector('h3').textContent);
      }
    });
  
    books.forEach(book => bookGrid.appendChild(book));
  }
  
  function filterBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const books = document.querySelectorAll('.book-card');
  
    books.forEach(book => {
      const title = book.querySelector('h3').textContent.toLowerCase();
      const author = book.querySelector('.author').textContent.toLowerCase();
      const visible = title.includes(searchTerm) || author.includes(searchTerm);
      book.style.display = visible ? 'block' : 'none';
    });
  }
  
  // Preload images for smoother experience
  document.querySelectorAll('.book-cover').forEach(img => {
    const fullRes = new Image();
    fullRes.src = img.src.replace('-S.jpg', '-M.jpg');
    fullRes.onload = () => img.src = fullRes.src;
  });