// es6 规范
import sum from './vendor/sum'
console.log("sum(1,2)=",sum(1,2));


// commonjs 规范
var minus = require("./vendor/minus")
console.log("minus(1,2)=",minus)


// amd 规范
// amd 规范导入的文件会额外打包成一个js文件

// require(['./vendor/multi'],function(multi){
//     console.log("multi(1,2)=",multi(1,2))
// })


