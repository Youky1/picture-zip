"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const FILE_TYPE = /.png|.jpg/;
const ZIP_QUALITY = 40;
/**
 * 遍历目录，对某类文件执行操作
 **/
const dfs = (root, type, callback) => {
    const files = fs.readdirSync(root);
    files.forEach((file) => {
        const img = path.join(root, file);
        const stat = fs.statSync(img);
        if (stat.isDirectory()) {
            dfs(img, type, callback);
        }
        else if (path.extname(img).match(type)) {
            callback(img);
        }
    });
};
/**
 * 压缩图片
 */
const zip = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const ext = path.extname(filePath);
    const option = {
        outputPath: filePath,
        quality: ZIP_QUALITY
    };
    const data = ext === ".png"
        ? yield sharp(filePath).png(option)
        : yield sharp(filePath).jpeg(option);
    const buffer = yield data.toBuffer();
    fs.writeFileSync(filePath, buffer);
});
const imageZip = ({ root }) => {
    dfs(root, FILE_TYPE, zip);
};
imageZip({ root: path.join(__dirname, "../test") });
module.exports = imageZip;
