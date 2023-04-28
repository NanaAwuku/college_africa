const validation = (schema)=> async(req, res, next) =>{
  const body = req.body
  try {
     await schema.validate(body)
     next()
     return next()
  } catch (error) {
    res.status(400)
  }


}
module.exports= validation