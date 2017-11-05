const Issue = require('../../../../models/issue');

const seedIssues = (options) => {
  const count = (options && options.count) || 3;

  const issues = [...Array(count)].map(() => ({
    status: 'pending',
  }));

  return Issue.create(issues);
};

exports.seedIssues = seedIssues;
