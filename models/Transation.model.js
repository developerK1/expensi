const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
}, {
  timestamps: true,
});

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;