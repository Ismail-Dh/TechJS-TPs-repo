function fun(){
    console.log("Program Started")

    const promise = new Promise((resolve)=>{
        setTimeout(() => {
            resolve("Promise Resolved")
        }, 3000);
    });

    console.log(promise)

    console.log("Program in progress")

    promise.then(()=>{
        console.log("Program complete")
    })
}


fun();
