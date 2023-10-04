const express = require('express');
const app = express();
const PORT = 3000;



const fetchBlogDataMiddleware = require('./middleware/fetchBlogData');
const calculateStatisticsMiddleware = require('./middleware/calculateStatistics');
const searchBlogsMiddleware = require('./middleware/searchBlogs');


app.use('/api/blog-stats', fetchBlogDataMiddleware, calculateStatisticsMiddleware);
app.use('/api/blog-search', fetchBlogDataMiddleware, searchBlogsMiddleware);


app.get('/api/blog-stats', searchBlogsMiddleware);
app.get('/api/blog-search', calculateStatisticsMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
