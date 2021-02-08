exports.internalHandler = (err, res) => {
  console.log(err);
  return res.status(500).json({
    status: 'fail',
    msg: 'internal error'
  })
}