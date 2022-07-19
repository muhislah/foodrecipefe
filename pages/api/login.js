export default function login(req, res) {
  if (req.method == "POST"){
    const token = req.body.token
    res.setHeader('Set-Cookie', `token=${token}; path=/; httpOnly=true`);
    res.send({
        logout : false
    });
  }else {
    res.send({
      logout: true
    })
  }
}