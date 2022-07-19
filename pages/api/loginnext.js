export default function loginnext(req, res) {
  console.log(req.method)
  if (req.method == "POST"){
    console.log('add token to cookie')
    const token = req.body.token
    res.setHeader('Set-Cookie', `token=${token}; path=/; httpOnly=true`);
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