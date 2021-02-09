exports.internalHandler = (err, res) => {
  
  return res.json({
    status: 'fail',
    msg: 'Internal Server Error',
    error: err.message
  })
}