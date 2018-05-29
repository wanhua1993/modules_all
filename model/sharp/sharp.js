const sharp = require('sharp');
// sharp 是 Node.js 平台上相当热门的一个图像处理库，其实际上是基于 C 语言编写 的 libvips 库封装而来，因此高性能也成了 sharp 的一大卖点。
// sharp 可以方便地实现常见的图片编辑操作，如裁剪、格式转换、旋转变换、滤镜添加等
sharp(inputBuffer)
    .resize(320, 240)
    .toFile('output.webp', (err, info) => {

    });
// A Promises/A+ promise is returned when callback is not provided.
sharp('input.jpg')
    .rotate()
    .resize(200)
    .toBuffer()
    .then(data => {

    })
    .catch(err => {

    });
const roundedCorners = new Buffer(
    '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
);

const roundedCornerResizer =
    sharp()
        .resize(200, 200)
        .overlayWith(roundedCorners, { cutout: true })
        .png();

readableStream
    .pipe(roundedCornerResizer)
    .pipe(writableStream);