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


