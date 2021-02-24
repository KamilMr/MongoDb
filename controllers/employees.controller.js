const Employees = require('../models/employees.model');

exports.get = async (req, res) => {
    try {
      res.json(await Employees.find().populate('department'));
    } catch (error) {
      res.status(500).json({message: error});
    }
  };

  exports.getRandom = async (req, res) => {
    try {
      const count = await Employees.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Employees.findOne().skip(rand);
      if(!dep) res.status(404).json({message: 'Not found'});
      else res.json(dep);
    } catch (err) {
      res.status(500).json({message: err});
    }
  };

  exports.getById = async (req, res) => {
    try {
      const dep = await Employees.findById(req.params.id);
      if(!dep) res.status(404).json({message: 'Not found'});
      else res.json(dep);
    } catch (err) {
      res.status(500).json({message: err});
    }
  };

  exports.post = async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const newEmployee = new Employees({firstName: firstName, lastName: lastName});
      newEmployee.save();
      res.json({message: 'New Employee added'});
    } catch (err) {
      res.status(500).json({message: err});
    }
  };

exports.put = async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const dep = await Employees.findById(req.params.id);
      if(dep){
        dep.firstName = firstName;
        dep.lastName = lastName;
        await dep.save();
        res.json({message: 'Ok'});
      }
      else res.status(404).json({message: 'Not found...'});
    } catch (err) {
      res.status(500).json({message: err})
    }
  };

  exports.delete = async (req, res) => {
    try {
      const dep = await Employees.findById(req.params.id);
      if(dep){
        await Employees.deleteOne({ _id: req.params.id});
        res.json({message: 'Deleted'})
      } else res.status(404).json({ message: 'Not found...' });
    } catch (err) {
      res.status(500).json({message: err})
    }
  };
