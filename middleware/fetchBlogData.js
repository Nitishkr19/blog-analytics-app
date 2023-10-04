const axios = require('axios');

let blogData = null;

const fetchBlogDataMiddleware = async (req, res, next) => {
  try {
    if (blogData) {
      req.blogData = blogData;
      next();
    } else {
      const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
        headers: {
          'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
        },
      });
      blogData = {
        data: response.data.blogs,
        timestamp: Date.now(),
      };
      req.blogData = blogData;
      next();
    }
  } catch (error) {
    console.error('Error fetching blog data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = fetchBlogDataMiddleware;
