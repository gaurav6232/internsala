const { userInfo } = require("os");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErorrHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const imagekit = require("../utils/imagekit").initImagekit();



exports.homepage = catchAsyncErrors(async (req, res, next) =>{
    res.json({message: "sequare homepage"});
    
});


exports.currentUser = catchAsyncErrors(async(req,res, next) =>{
    const student = await Student.findById(req.id).exec();
    res.json({student});
})

exports.studentsignup =  catchAsyncErrors(async (req, res, next) =>{
    const student = await new Student(req.body).save()
     sendtoken(student, 201, res);

})

exports.studentsignin =  catchAsyncErrors(async (req, res, next) =>{
    const student = await Student.findOne({email:req.body.email}).select("+password").exec();

    if(!student){

        return next(new ErorrHandler("user not found with this email address", 404));
    }
    const isMatch = student.comparepassword(req.body.password);
    if(!isMatch){
        return next(new ErorrHandler("Wrong credientials", 500));
    } 
    sendtoken(student, 200, res);

})

exports.studentsignout =  catchAsyncErrors(async (req, res, next) => {
    
    res.clearCookie("token");
    res.json({message: 'successfully signout!'});

})



 
exports.studentsendmail = catchAsyncErrors(async (req, res, next) =>{
    const student = await Student.findOne({email: req.body.email}).exec()

    if(!student){

        return next(new ErorrHandler("student not found with this email address", 404));
    }


    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`
    sendmail(req, res, next, url);

    student.resetPasswordToken = "1";

    await student.save();
    res.json({student, url});
    
});


exports.studentforgetlink = catchAsyncErrors(async (req, res, next) =>{
    const student = await Student.findById (req.params.id).exec()

    if(!student){

        return next(new ErorrHandler("student not found with this email address", 404));
    }

 
    if(student.resetPasswordToken == "1"){
        student.resetPasswordToken = "0"
        student.password = req.body.password;
        
    }else{
        return next(new ErorrHandler("Invalid Reset Link! Plese try again", 500));

    }
    await student.save();
    res.status(200).json({
        message: "password has been successfully changed"
    })
    
});




 
// that not completed route

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) =>{
    const student = await student.findById(req.id).exec();
    student.password = req.body.password;
    await student.save();
        
    sendtoken(student, 201, res);
});



exports.studentupdate =  catchAsyncErrors(async (req, res, next) =>{
     await Student.findByIdAndUpdate(req.params.id, req.body).exec();

    res.status(200).json({
        success: true,
        message: "Student Updated Successfully!",
         
    })
})



exports.studentavatar =  catchAsyncErrors(async (req, res, next) =>{
    const student = await  Student.findById(req.params.id).exec()
    const file = req.files.avatar;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

    if(student.avatar.fileId  !== ""){
        await imagekit.deleteFile(student.avatar.fileId)
    }

    const  {fileId, url} = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName,
    })

    student.avatar = {fileId, url};
    await student.save()
    res.status(200).json({
        success: true,
        message: "Profile update",
    })
})
