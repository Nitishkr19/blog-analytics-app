const _ = require('lodash');

const searchBlogsMiddleware = (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is missing' });
  }

  const lowerCaseQuery = query.toLowerCase();
  const blogData = req.blogData; 

  const searchBlogsMemoized = _.memoize(() => {
    const searchResults = blogData.data.filter(blog => blog.title.toLowerCase().includes(lowerCaseQuery));
    return searchResults;
  }, undefined, (args) => `search_${lowerCaseQuery}`);

  const cachedSearchResults = searchBlogsMemoized();
  res.json(cachedSearchResults);
};

module.exports = searchBlogsMiddleware;
