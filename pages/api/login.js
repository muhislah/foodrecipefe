export default function login(req, res) {
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