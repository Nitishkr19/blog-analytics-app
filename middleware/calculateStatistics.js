const _ = require('lodash');

const calculateStatisticsMiddleware = (req, res, next) => {
  const calculateStatisticsMemoized = _.memoize(() => {

    const blogData = req.blogData;


    const totalBlogs = blogData.data.length;
    const longestTitle = _.maxBy(blogData.data, blog => blog.title.length);
    const privacyBlogsCount = _.filter(blogData.data, blog => blog.title.toLowerCase().includes('privacy')).length;
    const uniqueBlogTitles = _.uniqBy(blogData.data, 'title').map(blog => blog.title);

    const statistics = {
      totalBlogs,
      longestBlogTitle: longestTitle.title,
      privacyBlogsCount,
      uniqueBlogTitles,
    };

    return statistics;
  }, undefined, (args) => 'statistics');

  const cachedStatistics = calculateStatisticsMemoized();
  res.json(cachedStatistics);
};

module.exports = calculateStatisticsMiddleware;
