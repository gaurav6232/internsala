const { userInfo } = require("os");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const employe = require("../models/employeModel");
const ErorrHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const Employe = require("../models/employeModel");
const imagekit = require("../utils/imagekit").initImagekit();



exports.homepage = catchAsyncErrors(async (req, res, next) =>{
    res.json({message: "sequare Employe homepage"});
    
});


exports.currentUser = catchAsyncErrors(async(req,res, next) =>{
    const employe = await employe.findById(req.id).exec();
    res.json({employe});
})

exports.employesignup =  catchAsyncErrors(async (req, res, next) =>{
    const employe = await new Employe(req.body).save()
     sendtoken(employe, 201, res);

})

exports.employesignin =  catchAsyncErrors(async (req, res, next) =>{
    const employe = await Employe.findOne({email:req.body.email}).select("+password").exec();

    if(!employe){

        return next(new ErorrHandler("user not found with this email address", 404));
    }
    const isMatch = employe.comparepassword(req.body.password);
    if(!isMatch){
        return next(new ErorrHandler("Wrong credientials", 500));
    } 
    sendtoken(employe, 200, res);

})


exports.employesignout =  catchAsyncErrors(async (req, res, next) => {
    
    res.clearCookie("token");
    res.json({message: 'successfully signout!'});

})



 
// exports.employesendmail = catchAsyncErrors(async (req, res, next) =>{
//     const employe = await employe.findOne({email: req.body.email}).exec()

//     if(!employe){

//         return next(new ErorrHandler("employe not found with this email address", 404));
//     }


//     const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`
//     sendmail(req, res, next, url);

//     employe.resetPasswordToken = "1";

//     await employe.save();
//     res.json({employe, url});
    
// });


// exports.employeforgetlink = catchAsyncErrors(async (req, res, next) =>{
//     const employe = await employe.findById (req.params.id).exec()

//     if(!employe){

//         return next(new ErorrHandler("employe not found with this email address", 404));
//     }

 
//     if(employe.resetPasswordToken == "1"){
//         employe.resetPasswordToken = "0"
//         employe.password = req.body.password;
        
//     }else{
//         return next(new ErorrHandler("Invalid Reset Link! Plese try again", 500));

//     }
//     await employe.save();
//     res.status(200).json({
//         message: "password has been successfully changed"
//     })
    
// });




 
// // that not completed route

// exports.employeresetpassword = catchAsyncErrors(async (req, res, next) =>{
//     const employe = await employe.findById(req.id).exec();
//     employe.password = req.body.password;
//     await employe.save();
        
//     sendtoken(employe, 201, res);
// });



// exports.employeupdate =  catchAsyncErrors(async (req, res, next) =>{
//      await employe.findByIdAndUpdate(req.params.id, req.body).exec();

//     res.status(200).json({
//         success: true,
//         message: "employe Updated Successfully!",
         
//     })
// })



// exports.employeavatar =  catchAsyncErrors(async (req, res, next) =>{
//     const employe = await  employe.findById(req.params.id).exec()
//     const file = req.files.avatar;
//     const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

//     if(employe.avatar.fileId  !== ""){
//         await imagekit.deleteFile(employe.avatar.fileId)
//     }

//     const  {fileId, url} = await imagekit.upload({
//         file: file.data,
//         fileName: modifiedFileName,
//     })

//     employe.avatar = {fileId, url};
//     await employe.save()
//     res.status(200).json({
//         success: true,
//         message: "Profile update",
//     })
// })
