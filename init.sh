#!/usr/bin/env bash
npm install -g gatsby-cli
npm install -g @aws-amplify/cli
npm install gatsby --save --save-dev
npm install gatsby-image --save --save-dev
npm install react --save --save-dev
npm install @emotion/core --save --save-dev
npm install webpack --save --save-dev
npm run lint:fix
npm run build
