const axios = require('axios');

const fetchBookCover = async (isbn) => {
  try {
    // Check if cover exists
    const response = await axios.get(`https://covers.openlibrary.org/b/isbn/${isbn}.json`);
    if (response.data) {
      return {
        small: `https://covers.openlibrary.org/b/isbn/${isbn}-S.jpg`,
        medium: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,
        large: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching book cover:', error);
    return null;
  }
};

const preloadImage = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary').toString('base64');
  } catch (error) {
    console.error('Error preloading image:', error);
    return null;
  }
};

module.exports = {
  getBookCover: async (req, res) => {
    const { isbn } = req.params;
    try {
      const coverUrls = await fetchBookCover(isbn);
      if (!coverUrls) {
        return res.status(404).json({ error: 'Cover not found' });
      }
      
      // Preload medium size image
      const imageData = await preloadImage(coverUrls.medium);
      res.json({
        urls: coverUrls,
        imageData: imageData ? `data:image/jpeg;base64,${imageData}` : null
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};