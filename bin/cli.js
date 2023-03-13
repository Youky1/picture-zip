#!/usr/bin/env node
const imageZip = require("../lib");
const path = require("path");

const cwd = process.cwd();
const root = process.argv[2] ? path.join(cwd, process.argv[2]) : cwd;
imageZip({ root });
