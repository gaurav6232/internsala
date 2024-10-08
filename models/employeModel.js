const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken")

const employeModel = new mongoose.Schema({


    firstname : {
        type: String,
        require: [true, "first Name is require"],
        minLength: [4, "Last name should have atleast 6 character"],
    },

    lastname:  {
        type: String,
        require: [true, "first Name is require"],
        minLength: [4, "Last name should have atleast 6 character"],
    },

     
    contact: {
        type: String,
        require: [true, "first Name is require"],
        maxLength: [10, "Last name should have atleast 10 character"],
        minLength: [10, "Last name should have atleast 10 character"],
    }, 

    
    email: {
        type:String,
        unique: true,
        require: [true, "Email address is invalid"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        select: false,
        maxLength: [15, "Password should not exceed more then 15 character"],
        minLength: [6, "Password should have atleast 6 character"],
        // match: ['']
    },

    resetPasswordToken: {
        type: String,
        default: "0"
        },



        organizationname : {
            type: String,
            require: [true, "organization Name is require"],
            minLength: [4, "organization Name should have atleast 6 character"],
        },


    organizationlogo: {
        type: Object,
        default:{
            fileId: '',     
            url: 'https://plus.unsplash.com/premium_photo-1709311452215-496c6740ca59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
        }
    }, 
     internship:[
        {type: mongoose.Schema.Types.ObjectId, ref: "internship"},
     ],
     jobs:[
        {type: mongoose.Schema.Types.ObjectId, ref: "job"},
         
     ],
}, {timestamps: true}
);


employeModel.pre("save", function(){

    if(!this.isModified("password")){
        return; 
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);


})


employeModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password)
};

employeModel.methods.getjwttoken = function(){
    return  jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

const Employe = mongoose.model("employe",employeModel);


module.exports = Employe; 