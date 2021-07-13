import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    value: {
        type: String,
        unique: true,
        required: true,
        default: 'USER',
    }
});

export const Role = mongoose.model('Role', roleSchema);
