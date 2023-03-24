# learn-nodejs-notes

Link Sumber [FCC Node JS and Express js](https://www.youtube.com/watch?v=Oe421EPjeBE&list=LL&index=8)

## Learn From the Repo
Jadi, dari Youtube course ini diberikan sebuah repo yaitu
[Node.js Repo](https://github.com/john-smilga/node-express-course)

Nah dari repo tersebut, terdapat beberapa code catetan untuk merefresh ingatan mengenai node.js
Jika ingin menjalankan salah satu tutorial, khususnya di file ``01-node-tutorial``, code yang ada di file tutorial, di copas ke ``app.js``, lalu dijalankan.

## NPM info

untuk memulai sebuah node js server, maka hal yang dilakukan adalah npm init

        npm init //Isi sendiri
        npm ini -y //Isi sesuai default

untuk menginstall sebuah module, maka pake npm i <package name>

        npm i <package name>
        npm i -g <package name>

untuk menginstall devdependencies

        npm i <package name> -D

scripts dalam package.json

        "scripts": {
            "start": "node app.js"
            "dev": "nodemon app.js"
        }

### Perbedaan node dengan nodemon

nodemon itu selau ngerestart setiap ada perubahan dalam file

## Global Install

    npm install -g <package name>

## Node JS Event Loop

js itu blocking atau syncronus
jadi dibacanya line per line sesuai urutannya
Tapi di js ada yang namanya callback function
Ada dua jenis function di js berdasarkan dijalankannya
1. Imidiate function

imidiate function ini adalah function yang tidak menjadi parameter di function lain
Imidiate function ini function yang independent

2. Callback function

Callback function merupakan function yang menjadi parameter di function lain

NOTES:
Jika di JS, semua imidiate function akan terjalan terlebih dahulu, kemudian baru callback

## Async Pattern

Di JS, async programming itu adalah kunci, dan yang paling sering digunakan dalam js adalah async await
Contoh penggunaan async await ada di notes-YoutubeNodeExpress.js

## Event

JS merupakan bahasa pemrograman yang event-driven programming. JS itu selalu berhubungan dengan event. Contoh penggunaan event ada di notes-YoutubeNodeExpress.js

Pada event ini, ada dua fungsi krusial, yaitu ``.emit`` dan ``.on``

``customEmitter.on`` digunakan untuk mendengarkan event yang menjadi parameter, dan terdapat callback function yang dijalankan setelah event tersebut dijalankan

``customEmitter.emit`` digunakan untuk menjalankan atau memancarkan sebuah event

## Event in HTTP Modules

Ada beberapa event yang diemit oleh http modules, kita bisa mendengarkanya dengan .on.
Contohnya ada di notes

## Streams

Ada 4 tipe streams
1. Writeable
2. Readable
3. Duplex
4. Transform

## Read file

Jadi di stream ini untuk membaca file ada yang namanya ``createReadStream('path', {highWaterMark: <filesize>, encode: utf8})``

``path`` = Untuk path file yang mau dibaca
``highWaterMark: <filesize>`` = Untuk dibagi per chunck itu berapa maksimal kb-nya
``encode: utf8`` = Untuk mengencode file dan dapat menampilkan file

Jadi di stream read file ini, sebuah file tidak dibaca dalam satu file sekaligus, tetapi dibaca dalam per chunk, secara default satu chunk 64kb. Contoh penggunaan ada di notes.

## createReadStream in HTTP Example

Contoh penggunaannya ada di note

## HTTP Request/Response Cycle

Jadi ada dua pihak dalam http cycle
1. User/Client
2. Server

User mengirimkan http messages berupa request ke server
Server mengirimkan http messages berupa response ke user, menjawab request dari user

## HTTP

Untuk lebih jelasnya mengenai http, dapat dilihat disini
[Course API](https://course-api.com)

## Create Server

Untuk melanjutkan bagian ini, wajib clone repo node tutorial
Kemudian masuk ke folder ``02-express-tutorial``
Kemudian lanjut ``npm install`` untuk mendapatkan dependencies yang dibutuhkan
Kemudian lanjut ``npm start``, jika di console log terdapat "Express Tutorial", maka tutorial sudah siap untuk dilanjutkan

## HTTP Basic

Untuk create server, dibutuhkan basic http seperti langkah berikut
1. Require module http
Untuk create http server, pasti menggunakan module http
``const http = require('http')``

2. Create server
http.createServer() yaitu sebuah method dalam http module yang digunakan untuk membuat server. Pada method ini parameternya adalah sebuah callback function. Di function tersebut ada dua parameter yang digunakan, sebuah request (req) dan respond (res), yang digunakan untuk mendapatkan request dari user dan memberikan respond dari server.
Di createServer() juga diharuskan ada res.end(), dikarenakan untuk mewajibkan ada respon terakhir dari server ke client
```
const server = http.createServer((req, res) => {
        console.log('User hit the server)
        res.end('home page')
})
```
3. Listening to the Server
Setelah server telah di create, selanjutnya adalah menggunakan method server.listen(portNum)
Port Number adalah sebuah komunikasi end point. Buat localhost kali ini bebas
``server.listen(5000)``

## HTTP Headers

Jika client ada yang dateng ke server, maka harus ada header mengenai info server tersebut atau metadata. syntax untuk merespon http header adalah ``res.writeHead(statusCode, { 'content-type': 'text/html' })``
``res.writeHead(200, { 'content-type': 'text/html'} )``

Status code dan content-type ini berpengaruh terhadap respon yang akan diberikan server ke client. Kita tidak perlu menghafalkan lebih lanjut mengenai http headers, karena biasanya akan otomatis

## HTTP Request Object

Setelah udah bisa ngerespon, mari lanjut mengambil request dari user.
Ada beberapa method dari req yang berguna, antara lain 
``req.method``: Akan mengeluarkan Method apa yang di request oleh user, bisa GET, POST, dll
``req.url``: Akan mengambil url apa yang di request oleh user, kalo hompage ``/``, kalo yang lain contoh ``/about``, dll

Kita bisa membuat berbagai macam respond tergantung dengan url yang di req oleh user dengan if else biasa
```
const http = require('http')

const server = http.createServer((req, res) => {
    const url = req.url

    if(url === '/'){
        res.writeHead(200, { 'content-type': 'text/html'})
        res.write('<h1>Home Page</h1>')
        res.end()
    }
    else if(url === '/about'){
        res.writeHead(200, { 'content-type': 'text/html'})
        res.write('<h1>About Page</h1>')
        res.end()
    }
    else {
        res.writeHead(404, { 'content-type': 'text/html'})
        res.write('<h1>Not Found</h1>')
        res.end()
    }
})

server.listen(5000)
```

## HTML Files

Kita bisa merespon request dari client menggunakan sebuah file, menggunakan readFileSync atau yang Async juga bisa
yang penting di metadata, content-typenya harus sesuai
```
const http = require('http')
const { readFileSync } = require('fs')

const server = http.createServer((req, res) => {
    const homePage = readFileSync('./index.html', 'utf8')
    
    const url = req.url

    if(url === '/'){
        res.writeHead(200, { 'content-type': 'text/html'})
        res.write(homePage)
        res.end()
    }
    else if(url === '/about'){
        res.writeHead(200, { 'content-type': 'text/html'})
        res.write('<h1>About Page</h1>')
        res.end()
    }
    else {
        res.writeHead(404, { 'content-type': 'text/html'})
        res.write('<h1>Not Found</h1>')
        res.end()
    }
})

server.listen(5000)
```

## HTTP App

Tadi kita baru bisa membaca dan mengirimkan satu file html dari server ke client. Nah Bagaimana kalau client butuh html, css, dan js untuk diterima? Apa yang harus dilakukan server?
Pertama yang pasti semua alamat dari file yang dibutuhkan harus ada responsenya, bukan 404. Kemudian tinggal tambahkan if else statementnya sesuai dengan kebutuhan
```
const http = require('http')
const { readFileSync } = require('fs')

const homePage = readFileSync('./navbar-app/index.html', 'utf8')
const homeStyle = readFileSync('./navbar-app/styles.css', 'utf8')
const homeLogo = readFileSync('./navbar-app/logo.svg', 'utf8')
const homeApp = readFileSync('./navbar-app/browser-app.js', 'utf8')

const server = http.createServer((req, res) => {
    const url = req.url

    if(url === '/'){
        res.writeHead(200, { 'content-type': 'text/html'})
        res.write(homePage)
        res.end()
    }
    else if(url === '/styles.css'){
        res.writeHead(200, { 'content-type': 'text/css'})
        res.write(homeStyle)
        res.end()
    }
    else if(url === '/logo.svg'){
        res.writeHead(200, { 'content-type': 'image/svg+xml'})
        res.write(homeLogo)
        res.end()
    }
    else if(url === '/browser-app.js'){
        res.writeHead(200, { 'content-type': 'text/javascript'})
        res.write(homeApp)
        res.end()
    }
    else if(url === '/about'){
        res.writeHead(200, { 'content-type': 'text/html'})
        res.write('<h1>About Page</h1>')
        res.end()
    }
    else {
        res.writeHead(404, { 'content-type': 'text/html'})
        res.write('<h1>Not Found</h1>')
        res.end()
    }
})

server.listen(5000)
```

## Express

### Express Basic

Express merupakan sebuah framework yang memudahkan http server yang tadi baru dipelajari
Express bukan sebuat built in module, jadi harus diinstall dulu dengan
``npm install express --save``

Kalau sudah diinstall, di codenya direquire dengan syntax
```
const express = require('express')
const app = express()
```

Di dalam express module ada beberapa method yang berguna, antara lain
- app.get
- app.post
- app.put
- app.delete
- app.all
- app.use
- app.listen

#### app.listen

app.listen digunakan seperti server.listen(). Digunakan untuk komunikasi dengan port communication tertentu. Dan ada callback function yang digunakan untuk dijalankan ketika komunikasi itu terjalin, syntaxnya seperti berikut
```
app.listen(5000, () => {
    console.log('Server is listening on port 5000...')
})
```

#### app.get

app.get itu sama kaya client sedang merequest get dengan url tertentu. Syntaxnya seperti berikut
```
app.get('/', (req, res) => {
    console.log('Success')
    res.end('Home Page')
})
```