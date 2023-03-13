# 一个用于压缩图片的命令行脚本工具

## 🚀 使用方法

安装：

```sh
npm i -D picture-zip
```

使用：

```sh
zip [路径]
```

根据输入的路径，递归对文件夹下所有图片进行压缩。

省略路径时，路径为项目跟目录

## 📖 压缩原理

压缩的实现基于 [sharp](https://github.com/lovell/sharp)。考察了市面上常见图片压缩库的缺陷：

- tinypng：
  - 需要去网站生成 Key
  - 需要上传至第三方服务器
  - 免费额度有限
- imagemin：
  - pngquant 的算法不稳定
  - 插件安装繁琐
