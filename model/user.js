const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
const UserSchema = new Schema({
    name:{type:String},
    age:{type:Number},
	email:{type:String},
    password : String,
    role:{type:String,
            enum:['admin','subadmin','user']
           // default:'user'
        },
    is_deleted:{type:Boolean,default:false} ,
    passwordreset:String,
    profilepic:String       
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        console.log(this.password);
        if (err) return cb(err);
        cb(null, isMatch);
    });
};



module.exports=mongoose.model('user',UserSchema)