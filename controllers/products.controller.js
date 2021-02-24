const Products = require('../models/products.model');

exports.get = async (req, res) => {
    try {
      res.json(await Products.find());
    } catch (err) {
      res.json({message: err});
    }
  };

  exports.getRandom = async (req, res) => {
    try {
      const count = await Products.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Products.findOne().skip(rand);
      (!dep) ? res.status(404).json({message: 'Not Found'}) : res.json(dep);
    } catch (err) {
      res.status(500).json({message: err});
    }
  };

  exports.getById = async (req, res) => {
    try {
      const dep = await Products.findById(req.params.id);
      (!dep) ? res.status(404).json({message: 'Not Found'}) : res.json(dep);
      
    } catch (err) {
      res.status(500).json({message: err});
    }
  };

  exports.post = async (req, res) => {
    try {
      const { name, client } = req.body;
      const newProduct = new Products({ name: name, client: client});
      newProduct.save();
      res.json({message: 'New Product added'})
    } catch (err) {
      res.status(500).json({message: err});
    }
  };

exports.put = async (req, res) => {
    try {
      const { name, client } = req.body;
      const dep = await Products.findById(req.params.id);
      if(dep){
        dep.name = name;
        dep.client = client;
        await dep.save();
        res.json({message: 'ok'});
      } else res.status(404).json({message: 'Not found...'});
    } catch (err) {
          res.status(500).json({message: err});
    }
  };

  exports.delete = async (req, res) => {
    try {
      const dep = await Products.findById(req.params.id);
      if(dep){
        await Products.deleteOne({ _id: req.params.id});
        res.json({message: 'Deleted'})
      } else res.status(404).json({ message: 'Not found...' });
    } catch (err) {
        res.status(500).json({message: err});
    }
  };
