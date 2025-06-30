import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        conversations: [
            {
                type:  mongoose.Schema.Types.ObjectId,
                ref: 'Conversation'
            }
        ],
        userName: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            minlength: [3, "Username must be at least 3 characters"],
            maxlength: [20, "Username must be at most 20 characters"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            maxlength: [50, "Email must be at most 50 characters"],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },
        lastActive: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
