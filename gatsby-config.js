require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const config = require('./config/website');

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

module.exports = {
  /* General Information */
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
  },
  /* Plugins */
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'webkp',
        accessToken: `MC5XNEY3d3lNQUFDUUFtWERF.YgLvv71pcX3vv73vv70q77-9QhkT77-9Ve-_ve-_ve-_ve-_vRnvv73vv70G77-977-9T--_ve-_vUHvv73vv70Y`,
        linkResolver: ({ node, key, value }) => doc => `/${doc.uid}`,
        htmlSerializer: ({ node, key, value }) => (type, element, content, children) => {
          // Your HTML serializer
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'config/typography.js',
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-next',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleAlt,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'fullscreen',
        icons: [
          {
            src: '/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    /* Must be placed at the end */
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
};
