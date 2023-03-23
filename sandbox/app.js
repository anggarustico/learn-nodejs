const http = require('http')

const server = http.createServer((req, res)=>{
    //req untuk mendengarkan request dari client
    //res untuk memberi response kepada client

    if(req.url === '/'){
        res.end('Hello')
    }

    if(req.url === '/about'){
        res.end('about')
    }

    res.end('apa cuk')
})

server.listen(5000) //Server mendengarkan port 5000