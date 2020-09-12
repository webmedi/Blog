/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Gatsby Casper',
    description: 'A port of the casper blog built for gatsby',
    siteUrl: 'https://gatsby-casper.netlify.com', // full path to blog - no ending slash
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorYaml',
  },
  plugins: [
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        quality: 100,
        stripMetadata: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: path.join(__dirname, 'src', 'content'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem',
            },
          },
          {
            // https://www.ultra-noob.com/blog/2020-08-15-%E3%80%90Gatsby_js%E3%80%91%E8%A8%98%E4%BA%8B%E3%81%AB%E3%80%8C%E7%9B%AE%E6%AC%A1%E3%80%8D%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E3%80%8Cgatsby-remark-table-of-contents%E3%80%8D%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9/
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "目次",
              tight: false,
              fromHeading: 1,
              toHeading: 6
            },
          },
          {
            // https://www.gatsbyjs.com/plugins/gatsby-remark-vscode/#using-languages-and-themes-from-an-extension
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: 'Dark (Visual Studio)' // Or install your favorite theme from GitHub
            }
          },
          {
            // https://www.gatsbyjs.com/plugins/gatsby-remark-external-links/
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer"
            }
          },
          `gatsby-remark-autolink-headers`,
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-abbr',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2000,
              quality: 100,
            },
          },
        ],
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-casper.netlify.com',
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('postcss-color-function'), require('cssnano')()],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-XXXX-Y',
        // Puts tracking script in the head instead of the body
        head: true,
        // IP anonymization for GDPR compliance
        anonymize: true,
        // Disable analytics for users with `Do Not Track` enabled
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ['/preview/**'],
        // Specifies what percentage of users should be tracked
        sampleRate: 100,
        // Determines how often site speed tracking beacons will be sent
        siteSpeedSampleRate: 10,
      },
    },
  ],
};
