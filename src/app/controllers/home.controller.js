const pkg = require('@root/package.json');

export const homeController = (req, res) => {
  res.json({
    message: 'Welcome to API sekeleton.',
    version: pkg.version,
  });
};
