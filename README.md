# Learn Node JS

Link Sumber [FCC Node JS and Express js](https://www.youtube.com/watch?v=Oe421EPjeBE&list=LL&index=8)

## Learn From the Repo

Jadi, dari Youtube course ini diberikan sebuah repo yaitu
[Node.js Repo](https://github.com/john-smilga/node-express-course)

Nah dari repo tersebut, terdapat beberapa code catetan untuk merefresh ingatan mengenai node.js
Jika ingin menjalankan salah satu tutorial, khususnya di file `01-node-tutorial`, code yang ada di file tutorial, di copas ke `app.js`, lalu dijalankan.

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

Pada event ini, ada dua fungsi krusial, yaitu `.emit` dan `.on`

`customEmitter.on` digunakan untuk mendengarkan event yang menjadi parameter, dan terdapat callback function yang dijalankan setelah event tersebut dijalankan

`customEmitter.emit` digunakan untuk menjalankan atau memancarkan sebuah event

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

Jadi di stream ini untuk membaca file ada yang namanya `createReadStream('path', {highWaterMark: <filesize>, encode: utf8})`

`path` = Untuk path file yang mau dibaca
`highWaterMark: <filesize>` = Untuk dibagi per chunck itu berapa maksimal kb-nya
`encode: utf8` = Untuk mengencode file dan dapat menampilkan file

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

### Create Server

Untuk melanjutkan bagian ini, wajib clone repo node tutorial
Kemudian masuk ke folder `02-express-tutorial`
Kemudian lanjut `npm install` untuk mendapatkan dependencies yang dibutuhkan
Kemudian lanjut `npm start`, jika di console log terdapat "Express Tutorial", maka tutorial sudah siap untuk dilanjutkan

### HTTP Basic

Untuk create server, dibutuhkan basic http seperti langkah berikut

1. Require module http
   Untuk create http server, pasti menggunakan module http
   `const http = require('http')`

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
   `server.listen(5000)`

### HTTP Headers

Jika client ada yang dateng ke server, maka harus ada header mengenai info server tersebut atau metadata. syntax untuk merespon http header adalah `res.writeHead(statusCode, { 'content-type': 'text/html' })`
`res.writeHead(200, { 'content-type': 'text/html'} )`

Status code dan content-type ini berpengaruh terhadap respon yang akan diberikan server ke client. Kita tidak perlu menghafalkan lebih lanjut mengenai http headers, karena biasanya akan otomatis

### HTTP Request Object

Setelah udah bisa ngerespon, mari lanjut mengambil request dari user.
Ada beberapa method dari req yang berguna, antara lain
`req.method`: Akan mengeluarkan Method apa yang di request oleh user, bisa GET, POST, dll
`req.url`: Akan mengambil url apa yang di request oleh user, kalo hompage `/`, kalo yang lain contoh `/about`, dll

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

### HTML Files

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

### HTTP App

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
`npm install express --save`

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

### Express app example

Pada example kali ini, dapat membuat sebuah navbar app seperti pada http app, akan tetapi menggunakan express. Ada banyak kemudahan yang lebih dalam menggunakan express, contohnya adalah syntax yang lebih mudah, dan tidak perlu memanggil file satu2 untuk dikirimkan ke client, dapat dilakukan dengan satu line code, maka express yang akan mengurusnya lebih lanjut, beginilan contohnya

```
const express = require('express') //Menggunakan module express
const path = require('path') //Menggunakan pre-build module path
const app = express() //Membuat object untuk mengakses express

//app.use untuk mendapatkan file2 static yang dibutuhkan
app.use(express.static('./navbar-app/public'))

//app.get, untuk mendapatkan homepage yaitu '/'
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
})

//app.all untuk semua request dari user yang tidak tersedia
app.all('*', (req, res)=>{
    res.status(404).send('resource not found')
})

// app.listen untuk port 5000
app.listen(5000, () => {
    console.log('Server is listening on port 5000...')
})
```

Pada code di atas, terdapat line app.get yang fungsinya untuk mengirimkan index.html.
Sebenarnya, index.html juga static, apakah bisa dimasukkan ke express static saja? bisa
Jika `app.get` pada line code diatas dicomment atau dihapus, server akan berjalan seperti biasa jika index.html masuk di dalam folder public.

### API and SSR

API atau Application Programming Interface khususnya pada Express merupakan sebuah HTTP interface yang bertanggungjawab untuk mengirimkan data berbentuk JSON yang nantinya akan diolah oleh Front-End untuk keperluan tertentu.
SSR atau Server Side Rendering konsepnya sama seperti API, tapi yang dikirimkan bukan data, melainkan template. Detail mengenai SSR akan dipelajari nanti, sekarang lebih difokuskan ke API terlebih dahulu.

### JSON Basic

API mengirimkan data berupa JSON (Javascript Object Notation). Dari data JSON yang dikirimkan oleh API, Pihak Front-End dapat mengolahnya lebih lanjut. Contoh penggunaan dalam mendapatkan data JSON adalah sebagai berikut

```
const express = require('express') //Menggunakan module express
const path = require('path') //Menggunakan pre-build module path
const app = express() //Membuat object untuk mengakses express
const { products } = require('./data') //Mengambil object products dari data.js

// Menampilkan JSON dari products
app.get('/', (req, res)=>{
    res.json(products)
})

//app.all untuk semua request dari user yang tidak tersedia
app.all('*', (req, res)=>{
    res.status(404).send('resource not found')
})

// app.listen untuk port 5000
app.listen(5000, () => {
    console.log('Server is listening on port 5000...')
})
```

### JSON Simple mapping

Pada contoh sebelumnya, kita dapat menampilkan seluruh file JSON. Akan tetapi, kemungkinan besar kita hanya membutuhkan beberapa dari JSON. Hal tersebut dapat dilakukan dengan mapping file JSON tersebut. Contoh codenya adalah sebagai berikut

```
const express = require('express') //Menggunakan module express
const path = require('path') //Menggunakan pre-build module path
const app = express() //Membuat object untuk mengakses express
const { products } = require('./data') //Mengambil object products dari data.js

// Menampilkan HTML
app.get('/', (req, res)=>{
    res.send('<h1>Helo</h1><a href="/api/products">products</a>')
})

//Mendapatkan API products, dan tidak menampilkan semuanya. Descriptionnya ilang karena .map
app.get('/api/products', (req, res)=>{
    const newProducts = products.map((product)=>{
        const {id, name, image} = product;
        return {id, name, image}
    })

    res.json(newProducts)
})


//app.all untuk semua request dari user yang tidak tersedia
app.all('*', (req, res)=>{
    res.status(404).send('resource not found')
})

// app.listen untuk port 5000
app.listen(5000, () => {
    console.log('Server is listening on port 5000...')
})
```

### Route Params

Bagaimana untuk menggunakan salah satu data dari JSON menggunakan IDnya?
Untuk itu dapat digunakan route parameters.
Misalkan kita ingin menampilkan data products 1, maka pada parameter URL dapat dituliskan `/api/products/1`. Bagaimana jika productsnya ada ribuan? Bagaimana cara menuliskan parameter IDnya tersebut?
Itulah kemudahan menggunakan route parameters.
Misalkan terlebih dahulu melakukannya dengan cara hardcode

```
app.get('/api/products/1', (req, res)=>{
    const singleProduct = products.find((product)=> product.id === 1)

    res.json(singleProduct)
})
```

Cara di atas dapat dilakukan jika data yang tersedia sedikit. Akan tetapi, biasanya data API yang tersedia banyak, maka dapat digunakan route Params dengan parameter di URL diganti seperti `/api/product/:productID`. Untuk menampilkan params apa yang direquest oleh user, maka bisa digunakan syntax `console.log(req.params)`. Dan untuk mengolah data /:productID dapat digunakan `req.params`.
Contohnya seperti berikut

```
app.get('/api/products/:productID', (req, res)=>{
    console.log(req.params)
    const {productID} = req.params
    const singleProduct = products.find(
        (product)=> product.id === Number(productID))

    if (!singleProduct){
        return res.status(404).send('Product does not Exist')
    }
    res.json(singleProduct)
})
```

### Query

Query digunakan untuk mengakses data sesuai dengan kata kunci tertentu atau query tertentu. Query biasanya digunakan dalam url dengan cara seperti `http://hn.algolia.com/api/v1/search?query=foo&tags=story`
dapat dilihat bahwa query adalah parameter setelah `?`. 
Untuk menampilkan query parameters pada url dapat digunakan syntax `console.log(req.query)`. Untuk mengakses query parameters itu sendiri dapat digunakan syntax `req.query`.
Contoh code penggunaan query adalah sebagai berikut

```
app.get('/api/v1/query', (req, res)=>{
    console.log(req.query)
    const { search, limit } = req.query
    let searchProduct = [...products]

    if(search){
        searchProduct = searchProduct.filter((product)=>{
            return product.name.startsWith(search)
        })
    }

    if(limit){
        searchProduct = searchProduct.slice(0, Number(limit))
    }

    if(searchProduct.length < 1){
        return res.status(200).json({ search: true, data: []})
    }

    return res.status(200).json(searchProduct)
})
```

### Middleware

Middleware mudahnya merupakan sebuah function yang dapat digunakan untuk beberapa route sekaligus. Middleware ini fungsinya untuk mempermudah dan mempercepat ngoding untuk membuat suatu function untuk beberapa route.
Jika di web, maka fungsi dari middleware ini adalah untuk menghandle antara request yang diminta oleh user, dan respond yang diberikan oleh server. Contoh dari middleware yang simple adalah logger sebagai berikut
```
const logger = (req, res, next)=>{
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    next() //Sebuah middleware harus next ke middleware selanjutnya,
    //Kalo ngga next bakal loading terus di browser
}

app.get('/', logger, (req, res)=>{
    res.send('Home')
})

app.get('/about', logger, (req, res)=>{
    res.send('About')
})
```

### app.use

Middleware biasanya tidak ditulis di file app.js karena nantinya berantakan. Middleware dituliskan di file yang berbeda dengan app.js. Bagaimana menggunakannya? Dan bagaimana menggunakannya di semua route sekaligus?
app.use merupakan sebuah metode untuk menggunakan sebuah middleware di beberapa route sekaligus. Contoh penggunaannya adalah sebagai berikut
```
const express = require('express') 
const app = express()
const logger = require('./logger')

app.use('/about', logger)//Bisa tidak menggunakan path untuk semua route

app.get('/', (req, res)=>{
    res.send('Home')
})

app.get('/about', (req, res)=>{
    res.send('About')
})

app.get('/about/items', (req, res)=>{
    res.send('About')
})
```

### Multiple Middleware

Kita dapat menggunakan beberapa middleware sekaligus. Contohnya sebagai berikut
```
const express = require('express') 
const app = express()
const logger = require('./logger')
const authorize = require('./authorize')

app.use([logger, authorize]) //Syntax untuk multiple middleware

app.get('/', (req, res)=>{
    res.send('Home')
})

app.get('/about', (req, res)=>{
    res.send('About')
})

app.get('/about/items', (req, res)=>{
    console.log(req.user)
    res.send('About')
})
```

### Additional Middleware Info

Dua middleware yang sebelumnya kita buat adalah middleware yang functionnya kita buat sendiri. Kemungkinan besar kita akan menggunakan middleware yang sudah disediakan. Ada 3 tipe middleware
1. Own Middleware
Middleware ini functionnya dibuat sendiri
2. Express Middleware
Express menyediakan beberapa middleware contohnya seperti `app.use(express.static('./public))`
3. Third Party Middleware
Banyak pihak ketiga yang menyediakan beberapa middleware contohnya morgan seperti berikut `app.use(morgan('tiny'))`

### HTTP METHODS

#### GET

GET merupakan HTTP methods yang berfungsi untuk membaca atau read data. Contoh penggunaannya adalah sebagai berikut
```
const express = require('express') 
const app = express()
let {people} = require('./data')

app.get('/api/people', (req, res)=>{
    res.status(200).json({success:true, data: people})
})
```

#### POST

POST merupakan HTTP methods yang berfungsi untuk menginput data ke server. Untuk menggunakan methods ini, ada beberapa hal yang harus diperhatikan.
- Pada bagian front-end, ada code yang mengindikasikan bahwa code tersebut menggunakan POST methods, contohnya seperti berikut
```
<form action="/login" method="POST">
    <h3>Traditional Form</h3>
    <div class="form-row">
        <label for="name"> enter name </label>
        <input type="text" name="name" id="name" autocomplete="false" />
    </div>
    <button type="submit" class="block">submit</button>
</form>
```
Pada code ini ada bagian `method="POST"` yang berarti code ini akan menggunakan metode POST. Pada bagian ini juga ada bagian `action="/login"` yang berarti form tersebut saat disubmit akan menulis data ke `/login` bukan membaca data.

Pada bagian server juga harus dipersiapakan untuk mengolah data yang dikirimkan oleh front-end.
1. Harus mempersiapkan middleware express.urlencoded dengan syntax sebagai berikut
```
app.use(express.urlencoded({extended: false}))
```
Dengan middleware ini, body yang dikirimkan oleh frontend dapat diolah oleh server
2. app.post
Dengan app.post, server dapat mengolah data yang dikirimkan oleh frontend. Object body yang dikirimkan oleh frontend adalah `req.body`. Contohnya adalah sebagai berikut
```
app.use(express.urlencoded({extended: false}))

app.post('/login', (req, res)=>{
    console.log(req.body)
    const { name } = req.body
    if(name){
        res.status(200).send(`Welcome ${name}`)
    }

    res.status(401).send('Provide data dong bos!')
})
```
3. express.json() middleware
Untuk mengakses data json yang dikirimkan oleh client ke server dapat digunakan middleware express.json() dengan syntax seperti `app.use(express.json())`

Sebenarnya di video course ini ada cara post dengan Javascript di frontendnya langsung menggunakan **axios**, tapi terlalu kompleks untuk dipelajari. Maka bisa lanjut ke methods selanjutnya.

Di video juga dijelaskan mengenai aplikasi **Postman**. Aplikasi Postman memudahkan melakukan HTTP methods tanpa adanya frontend. Postman dapat dipelajari lebih lanjut nantinya karena sekarang masih terlalu kompleks.

#### PUT

PUT merupakan sebuah HTTP methods yang berfungsi untuk client yang ingin merubah atau mengupdate sebuah data dalam server. Pada method PUT, ada dua data yang digunakan untuk mengubah data, yang pertama ada `req.params` untuk mengidentifikasi parameter data mana yang akan diupdate. Identifikasi yang kedua adalah `req.body` untuk mengisi data update yang akan mengganti data yang lama. Contoh penggunaannya adalah sebagai berikut.
```
app.put('/api/people/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const person = people.find((person) => person.id === Number(id))

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` })
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })
  res.status(200).json({ success: true, data: newPeople })
})
```

#### DELETE

DELETE merupakan sebuah HTTP methods yang digunakan untuk mendelete sebuah data di server. Sebenernya sangat mirip dengan put bedanya tidak ada body yang dikirimkan untuk merubah data, hanyak untuk mendelete data saja. Contohnya adalah sebagai berikut.
```
app.delete('/api/people/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  )
  return res.status(200).json({ success: true, data: newPeople })
})
```

### ROUTER

Sebelum ini, di dalam app.js, banyak sekali route yang digunakan, dan banyak sekali route yang hampir sama atau memiliki base yang sama contohnya seperti `/api/people` dengan `/api/people/:id`. Dengan router, routes yang hampir sama dapat dijadikan dalam satu file yang terpisah dengan app.js, dan di dalam app.js akan digunakan menggunakan app.use. Langkah2 untuk menggunakan router adalah sebagai berikut
1. Buatlah folder baru bernama routes atau router
2. Di dalam folder tersebut berisi file2 js yang berfungsi untuk menyimpan route2 yang setipe
3. Di dalam folder ada beberapa line yang dibutuhkan sebagai berikut
```
const express = require('express')
const router = express.Router()
let { people } = require('../data')

/*
Routes
*/

module.exports = router
```
4. Di dalam app.js menggunakan router dengan line sebagai berikut
```
const people = require('./router/people')

app.use('/api/people', people)
```

### Router Controller

app.js menjadi rapih saat adanya file terpisah bernama router yang mengolah banyaknya route yang diolah. Akan tetapi, di dalam file router tersebut masih belum rapih, karena function untuk route-route tertentu terkadang panjang dan membuat file router tidak rapih. Oleh karena itu, dibuatnya sebuah file terpisah yang berfungsi untuk mengolah function-function dari router. File terpisah tersebut yang disebut dengan **Controller**.
Langkah-langkah untuk membuat file controller adalah
1. Membuat folder terpisah bernama controller atau sejenisnya.
2. Di dalam folder tersebut buatlah sebuah file `.js` yang namanya sesuai dengan file router untuk memudahkan.
3. Di dalam file tersebut buatlah sebuah object. Object tersebut berfungsi untuk mengolah function yang akan digunakan pada router. Contohnya adalah sebagai berikut
Misalkan pada router ada fungsi sebagai berikut
```
router.get('/', (req, res) => {
    res.status(200).json({ success: true, data: people })
  })
```
Fungsi tersebut dibuat dalam controller sebagai berikut
```
const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people })
}
```
Setelah dibuat controllernya, maka di dalam app.js dapat dibuat sebagai berikut
```
const { getPeople } = require('../controller/people')

router.get('/', getPeople)
```

### Router Syntax Alternative

Dengan adanya controller, syntax penulisan router menjadi jauh lebih rapih. Ada cara lain yang dapat dibilang lebih simple, akan tetapi tidak mempengaruhi kinerja dari code itu sendiri.
Cara pertama penulisan router adalah sebagai berikut
```
const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson
} = require('../controller/people')

router.get('/', getPeople)
router.post('/', createPerson)
router.post('/postman', createPersonPostman)
router.put('/:id', updatePerson)  
router.delete('/:id', deletePerson)
```
Cara alternatif penulisan router adalah sebagai berikut
```
const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson
} = require('../controller/people')

router.route('/').get(getPeople).post(createPerson)
router.route('/:id').put(updatePerson).delete(deletePerson)
router.route('/postman').post(createPersonPostman)
```

## KESIMPULAN

Node.js dan Express.js adalah sebuah framework untuk mengolah server side dari sebuah aplikasi khususnya yang berurusan dengan http. Server side yang berarti menjadi sebuah middleware atau perantara untuk memudahkan komunikasi dan kinerja antara frontend dan backend (database). Setelah mempelajari ini, cobalah mempelajari project-project selanjutnya di
[FCC Node JS and Express js Projects](https://www.youtube.com/watch?v=qwfE7fSVaZM)






