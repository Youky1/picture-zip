import sharp from "sharp";
import fs from "fs";
import path from "path";

const FILE_TYPE = /.png|.jpg/;

const ZIP_QUALITY = 40;

interface Option {
  root: string;
}

/**
 * 遍历目录，对某类文件执行操作
 **/
const dfs = (root: string, type: RegExp, callback: Function) => {
  const files = fs.readdirSync(root);
  files.forEach((file) => {
    const img = path.join(root, file);
    const stat = fs.statSync(img);
    if (stat.isDirectory()) {
      dfs(img, type, callback);
    } else if (path.extname(img).match(type)) {
      callback(img);
    }
  });
};

/**
 * 压缩图片
 */
const zip = async (filePath: string) => {
  const ext = path.extname(filePath);
  const option = {
    outputPath: filePath,
    quality: ZIP_QUALITY
  };
  const data =
    ext === ".png"
      ? await sharp(filePath).png(option)
      : await sharp(filePath).jpeg(option);
  const buffer = await data.toBuffer();
  fs.writeFileSync(filePath, buffer);
};

const imageZip = ({ root }: Option) => {
  dfs(root, FILE_TYPE, zip);
};

imageZip({ root: path.join(__dirname, "../test") });

module.exports = imageZip;
