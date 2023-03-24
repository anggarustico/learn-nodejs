//First module

//console.log(module)
console.log(module)
//FUngsi ini akan menampilkan detail2 dari module

//module.exports{}
module.exports = { object1, object2, objectN }
//Fungsi ini digunakan untuk export object di sebuah module agar dapat digunakan module lain

//require(path)
const object = require('./modules')
//Fungsi ini digunakan untuk mengambil object dari sebuah module

console.log(object)
//Fungsi ini akan menampilkan object yang didapatkan dari module yang diambil

//alternative syntax
//Sebenernya tidak usah pake const dulu, langsung aja pake module.exports.object
module.exports.objectN = [object]

//Os Modules
//Os punya built in modules
const os = require('os')

//info about current user
const user = os.userInfo()
console.log(user)

//Info lebih lanjut
https://nodejs.org/api/os.html

//Path module
const path = require('path')

//Info lebih lanjut
https://nodejs.org/api/path.html

//Berikut cara mengambil function dari module lain, dengan syntax yang lebih efektif
//Cara 1
const fs = require('fs');
fs.read

//Cara 2
const { readFileSync } = require('fs');

//Syntax mengubah object menjadi string
'${object}'
//Syntax tersebut mengubah object menjadi string

//FS Modules Sync
const { readFileSync, writeFileSync } = require('fs')

const file1 = readFileSync('./path/file1.txt', utf8)
const file2 = readFileSync('./path/file2.txt', utf8)

console.log(file1, file2)

writeFileSync('./path/newFile.txt', 'Hello World')

//FS Module Async
const { readFile, writeFile } = require('fs')
    //lanjut nanti dah

//HTTP Modules
    const http = require('http') //Menggunakan HTTP Modules

    const server = http.createServer((req, res)=>{
        //req untuk mendengarkan request dari client
        //res untuk memberi response kepada client
        res.write('Welcome') //Untuk menampilkan respon
        res.end() //Untuk mengakhiri response
    
    if(req.url === '/'){ //localhost:5000/ atau default page
        res.end('Hello')
    }
    if(req.url === '/about'){ //localhost:5000/about
        res.end('About')
    }
    res.end('apa cuk') //lain2
    })

    server.listen(5000) //sever mendengarkan port 5000

//Contoh Async Pattern (Async Await), Membaca dan menulis file

    const {readFile,writeFile} = require('fs').promises //Membuat dua fungsi yang diambil dari fs itu bisa dipake lebih enak buat promises

    const start = async() => { //Untuk memulai async await
        try{
            const first = await readFile('./path/first.txt', 'utf8') //untuk readfile jangan lupa pake parameter encode yaitu utf8
            const second = await readFile('./path/second.txt', 'utf8') //untuk readfile jangan lupa pake parameter encode yaitu utf8
            await writeFile('./path/newText.txt', 'content baru di dalam text ${first}')
            console.log(first, second)
        } catch (error) {
            console.log(error)
        }

    }

//Contoh Event Programming in JS
    const EventEmitter = require('events') //Menggunakan modules events untuk melakukan event programming

    const customEmitter = new EventEmitter() //Menciptakan object baru kalo mau ada custom emit

    customEmitter.on('response', () => {
        console.log('data received')
    })

    customEmitter.on('response', (name, id) => {
        console.log('data received ${name} and ${id}')
    })

    customEmitter.emit('response', 'john', 34)

//Contoh Event in HTTP Modules
    const http = require('http') //Mengambil module http

    const server = http.createServer() //Membuat sebuah server

    //Saat pembuatan server, ada beberapa event yang diemit, salah satunya request

    server.on('request', (req, res) => { //Fungsi .on ini ada mendengarkan event yang diemit dan merespon
        res.end('Welcome')
    })

    server.listen(5000)

//Contoh createReadStream

    const { createReadStream } = require('fs')

    const stream = createReadStream('./path/bigFile.txt', {highWaterMark: 6000, encoding: utf8})

    stream.on('data', (result) => {
        console.log(result)
    })
    
    stream.on('error', (err) => {
        console.log(err)
    })

//createReadStream in Http Example

    var http = require('http')
    var fs = require('fs')

    http.createServer((req, res) => {
        const fileStream = fs.createReadStream('./path/bigFile.txt', 'utf8')
        fileStream.on('open', () => {
            fileStream.pipe(res) //Fungsi ini membuat respon juga dikirimkan per chunck
        })

        fileStream.on('error', (err) => {
            res.end(err)
        })
    })

    


