# learn-nodejs-notes

Link Sumber [FCC Node JS and Express js](https://www.youtube.com/watch?v=Oe421EPjeBE&list=LL&index=8)

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




