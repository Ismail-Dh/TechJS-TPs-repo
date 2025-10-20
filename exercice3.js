function fun(){
    console.log("Program Started")
    const promise = new Promise((resolve)=>{
        setTimeout(() => {(resolve("Promise Resolved"))}, 3000);
       
    })

    console.log(promise)

    console.log("Program in progress")
    
    promise.then(()=>{
        console.log("step 1 complete")
        return new Promise((resolve)=>{
            setTimeout(() => {
                resolve("Step 2 complete")
            },3000);
    })}).then(()=>{
        console.log("Step 2 complete")})
}


fun();