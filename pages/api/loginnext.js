export default function loginnext(req, res) {
  console.log(req.method)
  if (req.method == "POST"){
    console.log('add token to cookie')
    const token = req.body.token
    res.setHeader('Set-Cookie', `token=${token}; Path='.herokuapp.com'; Domain='.herokuapp.com' httpOnly ; Max-Age : 9000000000; Secure ; SameSite=None`);
    res.send({
        logout : false,
        login : true
    });
  }else {
    res.send({
      logout: true
    })
  }
}