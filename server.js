import express from 'express'
import fetch from 'node-fetch'


const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.json())  
app.use(express.urlencoded({ extended: true }));






app.get('/',async (req,res)=>{
    console.log("Get is invoke")
    const apiKey = 'h1eM8US6KHTE_EHs5Xd8PDfJzDgrGMDfFmV'
    const apiSecret = 'KPnVr29L8wnWYLcR7s6FFo'
    console.log(req.body)
    console.log(req.params)
    console.log(req.query)
    // const apiUrl = `https://api.godaddy.com/v1/domains/${encodeURIComponent(domain)}`;
    // const response = await fetch(apiUrl,{method : 'GET' , headers : {'Authorization' : `sso-key ${apiKey}:${apiSecret}`,'Accept' : 'application/json'}})
    // if(!response.ok){
    //     res.send("Na bro")
    //     console.log("Na bro")
    // }
    res.send("Hello bro")
})
app.post('/app', async (req, res) => {
    console.log("Post is invoke");
    const apiKey ='3mM44UdC7Aoczb_PsyUbZMyc1NwhTBzhtsBVU';
    const apiSecret ='Gp5tTA5xPHi8Nn5DzDohpZ';
    const domain = req.body.query;
    console.log(domain)
    const apiUrl = `https://api.domaintools.com/v1/domaintools.com/whois/${domain}`;
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `sso-key ${apiKey}:${apiSecret}`,
            'Accept': 'application/json'
        }
    });

    try {
        if(!response.ok){
            console.log("something wrong")
        }
        let a  = await response.text()
        console.log(response)
        console.log(a)
        res.json(a)
        
    } catch (error) {
        console.log(error)
    }
});

app.listen(port,()=>{
    console.log(`Sussfully connected with ${port} server`)
})