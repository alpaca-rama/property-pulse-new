import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Please enter an unique email address'],
        required: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    image: {
        type: String,
    },
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ]
}, {
    timestamps: true,
});

const User = models.User || model('User', UserSchema);

export default User;