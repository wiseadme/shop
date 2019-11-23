module.exports = function (res, error) {
  res.status(500).json({
    ok: false,
    message: error.message ? error.message : error
  })
}