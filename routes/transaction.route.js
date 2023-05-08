const router = require('express').Router();
let Transaction = require('../models/Transation.model');


router.route('/').get((req, res) => {

    Transaction.find()
      .then(trans => res.json(trans))
      .catch(err => res.status(400).json('Error: ' + err));
});


  router.route('/add').post((req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const amount = req.body.amount;
    //const date = Date.parse(req.body.date);
    const date = new Date();
  
    console.log(req.body)

    const newTransaction = new Transaction({
        name,
        type,
        amount,
      date,
    });
  
    newTransaction.save()
    .then(() => res.json(newTransaction))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  

  router.route('/:id').get((req, res) => {
    Transaction.findById(req.params.id)
      .then(transaction => res.json(transaction))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  
  router.route('/:id').delete((req, res) => {
    Transaction.findByIdAndDelete(req.params.id)
      .then(() => res.json('transaction deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/update/:id').post((req, res) => {
    Transaction.findById(req.params.id)
      .then(transaction => {
        transaction.name = req.body.name;
        transaction.type = req.body.type;
        transaction.amount = Number(req.body.amount);
        transaction.date = new Date();
  
        transaction.save()
          .then(() => res.json('transaction updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;