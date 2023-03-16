import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        // require: bat buoc phai co khi dang ky de co tai khoan dang nhap
        userName: {type: String, required: true,unique: true},
        passWord: {type: String, required: true},     
        // optional: khi login co the vao phan profile de them/chinh sua
        fullName: {type: String},
        isAdmin: {type: Boolean, default: false},
        email: {type: String,unique: true},
        address: {type: String},   
        phone:{type: String},
        // chua danh sach cac thong tin phong da dat de confirm/cancel
        bookingHistory:{type: [String]},
    },{timestamps:true}
);

export default mongoose.model("User", UserSchema);
