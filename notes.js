// LEARN JAVASCRIPT FIRST

//1. JAVASCRIPT FUNCTION

// a. Function Declaration

    function functionName(parameters){
        //code to be executed
    }

    //Fungsi tidak di jalankan langsung, tapi dijalankan saat dipanggil
    //example
    function myFunction(a, b){
        return a * b;
    }

// b.  Function Expression

    //Arti dari function expression adalah sebuah function yang disimpan di dalam sebuah variable
    //Ada dua jenis function expression
    // 1. Named Function Expressions, contoh:
    var foo = function bar(){
        alert("hello");
    }
    // 2. Anonymous, contoh:
    var baz = function(){
        alert("hello");
    }

// c. Function() Constructor

    //daritadi di atas membuat sebuah function pake function()
    //nah sebenernya bisa pake syntax Function(), contoh:
    const myFunction = new Function("a", "b", "return a * b");

    let x = myFunction(4, 3);

    //Sebenernya tidak dianjurnya pake kata new di javascript
    //jadi cara yang lebih dianjurkan adalah seperti berikut
    const myFunction = function(a, b){
        return a * b;
    }

    let x = myFunction(4, 3);

// d. Self-Invoking Functions

    //Function dapat langsung berjalan tanpa harus dipanggil
    //Atau manggil dirinya sendiri, contoh:
    (function () {
        let x = "Hello!!";
    })();

// e. Arrow Functions

    //Arrow function digunakan untuk menyingkat syntax
    //contoh:
    // ES5
    var x = function(x, y) {
        return x*y;
    }

    // ES6 (menggunakan arrow)
    const x = (x, y) => x*y;

    //notes:
    //menggunakan const lebih aman dibandingkan dengan menggunakan var
    //karena function expression nilainya selalu konstan
    //kebiasaan yang harus dibiasakan adalah
    const x = (x, y) => {
        return x * y
    };

//CALLBACK FUNCTIONS

    //Inti dari callback function adalah function yang menjadi argument di function lain
    //contoh:
    function myDisplayer(some) {
        document.getElementById("demo").innerHTML = some;
      }
      
      function myCalculator(num1, num2, myCallback) {
        let sum = num1 + num2;
        myCallback(sum);
      }
      
      myCalculator(5, 5, myDisplayer);

    //Function myDisplayer itu adalah callback function yang dijadikan argument di function myCalculator

//Asynchronous

      //Callback function paling sering dipake buat asynchronous proses
      //contohnya adalah setTimeout()
      setInterval(myFunction, 1000);

        function myFunction() {
        let d = new Date();
        document.getElementById("demo").innerHTML=
        d.getHours() + ":" +
        d.getMinutes() + ":" +
        d.getSeconds();
        }
       
        //Di contoh di atas artinya berarti myFunction itu callback function
        //function tersebut dijadikan argumen pada fungsi setInterval
        //jadi myFunction akan dijalankan setiap 1 detik
        //itulah kegunaan dari callback function

// Kegunaan dari callback function

    //callback function digunakan untuk async proses
    //biasanya digunakan untuk komunikasi
    //jadi biasanya minta req ke server, terus sembari menunggu respon, bisa menjalankan fungsi lain

// Promises

    //Promises adalah suatu syntax di js yang bisa membuat program berjalan di antara 3 state,
    // antara pending, resolved, rejected
    //Contoh penggunaan promises adalah sebagai berikut

    //Pada syntax promise ini, ada dua jenis cara kerja
    // Ada producing promise, dan consuming promise

    
    
    //Membuat function expression promise 1, yang bakal ke resolve saat 6 detik
    const myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Promise resolve after 6 seconds")
        }, 6000)})

    //Membuat function expression promise 2, yang bakal ke resolve saat 3 detik
    const myPromiseTwo = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Promise resolve after 3 seconds")
        }, 6000)})

    //Consuming promise dengan myPromise.then
    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
        myPromiseTwo.then((successMessage) => {
            console.log("From Callback " + successMessage)
        })
    })


// HOW TO CREATE A WEB SERVER\
var server = http.createServer(function(request, response){
    var body = "hello world!";
    response.writeHead( 200, {
        'Content-Length': body.length,
        'Content-Type': 'text/plain'
    });

    response.end(body);
});
server.listen(8080);

// HOW TO IMPORT NODE.JS MODULES
var today = require('./today');


// INTRODUCTION TO WEB FRAMEWORKS

    //Di dalam dunia backend ada dua arsitektus
    //ada Model-View-Controller (MVC) dan Rest API

//1. MVC

    //MVC dibagi menjadi tiga bagian
    //1. Model
        //Model bertanggung jawab untuk memanajemen data, interaksi dengan database dan mengendalikan data logic
    //2. Controller
        //Meregulasikan data flow, memroses data
    //3. View
        //Bertanggung jawab untuk presentasi data

    //MVC digunakan jika harus ada pemisahan antara
    //datanya sendiri, presentasi datanya, dan manipulasi datanya itu sendiri

    //Web Framework yang menggunakan MVC adalah
    //Koa, Django, Express, NestJS

//2. REST APIs

//EXPRESS JS

    //Express merupakan sebuah third party module yang memberikan sebuah framework untuk membuat web aplication
    //Express memiliki dua tujuan
    //untuk menjadi API
    //untuk menjadi server-side rendering (SSR)

    //1. APIs with Express
        //sebuah express API itu menyiapkan HTTP interface untuk berinteraksi dengan data layer aplikasi
        //Data dikirimkan kembali ke client dengan format JSON using a response or res object
        //res.JSON() method berfungsi untuk
            //Memberitahu client content type yang dikirimkan
            //Stringify data

    //HOW EXPRESS WORJKS
        //1. Declare express sebagai dependency di package in a node.js project
        //2. run the npm command to download any missing modules
        //3. import the express module and create an Express application
        //4. Create a new route handler
        //5. Start an HTTP server on a given port number

    //1. Declare express sebagai dependency di package in a node.js project
        //Create a package.json file
        //package.json file berfungsi untuk menyimpan informasi mengenai Node.js module
            //Name: nama dari Node.js module
            //Version: string yang mendefinisikan major dan minor version dari module
            //Description: deskripsi dari tujuan module
            //Main: identify the Node.js script file yang menjadi entry point dari module
            //Depedencies: Module apa saja yang dibutuhkan untuk menjalankan current module
                //Format module di dalam dependencies adalah "nama module": "verision"

    //2. run the npm command to download any missing modules
        //run npm intall express untuk mendapatkan module express di dependenciesnya
    
    //3. import the express module and create an Express application
        //Create an instance of the app object from the Express web application framework
            var express = require('express');
            var app = express();

    //4. Create a new route handler
    
    //5. Start an HTTP server on a given port number
        var server = app.listen(port, function(){
            console.log('Listening on URL http://localhost:${port}');
        })
            
//Authentication in Node.js
    //Setelah belajar ini, harusnya dapat paham
        //Define authentication
        //Explain session based, token based, and passwordless authentication
        //Membandingkan dan membedakan antara 3 jenis authentication
    
    //Session Based
        //1. User memasukan data mereka
        //2. Credentials yang dimasukkan diverifikasi dengan credentials yang ada di database
        //3. Server menciptakan session with a session ID yang encrypted string yang unik. Session id disimpan di dalam database
        //4. Session ID disimpan juga di dalam browser sebagai cookie
        //5. Saat user log out atau waktu yang telah ditentukan abis, session ID tersebut dihilangkan dari database dan browser

    //Token Based
        //

//Suggested Express folder structure

    //Project
        //node_modules
            //Contains modules yang dibutuhkan current modules
        //config
            //Contains configuration files such as
                //Database connections
                //Environment variables
                //Credential files including API keys
        //models
        //routes
        //views
        //public
        

//Learn Final Project

//index.js
const express = require('express'); //Menggunakan module express
const jwt = require('jsonwebtoken'); //Menggunakan jsonwebtoken, buat autentikasi JSON file
const session = require('express-session'); //Menggunakan module express-session
const customer_routes = require('./router/auth_users.js').authenticated; //Membuat route user yang sudah terautentikasi
const genl_routes = require










