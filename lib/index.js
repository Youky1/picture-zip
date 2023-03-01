var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sharp from "sharp";
import fs from "fs";
import path from "path";
const FILE_TYPE = /.png|.jpg/;
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
        quality: 40
    };
    const data = ext === ".png"
        ? yield sharp(filePath).png(option)
        : yield sharp(filePath).jpeg(option);
    const buffer = yield data.toBuffer();
    fs.writeFileSync(filePath, buffer);
});
module.exports = function imageZip(root) {
    return __awaiter(this, void 0, void 0, function* () {
        dfs(root, FILE_TYPE, zip);
    });
};
