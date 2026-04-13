const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    deleted: {
        type: Boolean,
        default: false
    }
});

function excludeDeleted(next) {
    this.where({ deleted: false });
    next();
}

itemSchema.pre('find', excludeDeleted);
itemSchema.pre('findOne', excludeDeleted);
itemSchema.pre('findOneAndUpdate', excludeDeleted);

itemSchema.methods.softDelete = function () {
    this.deleted = true;
    return this.save();
};

module.exports = mongoose.model('Item', itemSchema);
