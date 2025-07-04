import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        conversations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Conversation'
            }
        ],
        name: {
            type: String,
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
        image: {
            type: String,
        },
        emailVerified: {
            type: Date,
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
