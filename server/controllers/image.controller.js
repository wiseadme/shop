const path = require('path')

function imageSender(req, res) {
  let { dir, img } = req.params
  const file = path.join(__dirname, `../uploads/${dir}/${img}`)
  res.sendFile(file)
}

module.exports = imageSender