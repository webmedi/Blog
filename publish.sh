#!/usr/bin/env bash
npm run clean
npm run lint:fix
amplify publish
