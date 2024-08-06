const testController =(req,res)=>{

    try{
    res.status(200).send({
        success: true,
        message: "test user Data Api"
    })

    }catch(error){
        console.log('error in test Api', error)
    }
}


module.exports = {testController} 