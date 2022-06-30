import axios from "axios"
export default async function profile(req, res) {
    const data = await axios.get('http://localhost:5000/profile', {
        withCredentials : true
    })
    console.log(data)
    res.send(data.data)
}