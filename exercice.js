

/*setInterval(function fun(){console.log("Hello World")},2000);*/
function fun(){
    console.log("Hello World");
    setTimeout(fun,2000);
}

fun();