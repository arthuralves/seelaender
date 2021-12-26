import models from '../models';
async function aumentarStock(idProduto, cantidad) {
  let { stock } = await models.Produto.findOne({ _id: idProduto });
  let nStock = parseInt(stock) + parseInt(cantidad);
  const reg = await models.Produto.findByIdAndUpdate({ _id: idProduto }, { stock: nStock });
}

async function disminuirStock(idProduto, cantidad) {
  let { stock } = await models.Produto.findOne({ _id: idProduto });
  let nStock = parseInt(stock) - parseInt(cantidad);
  const reg = await models.Produto.findByIdAndUpdate({ _id: idProduto }, { stock: nStock });
}

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Venda.create(req.body);
      //Actualizar stock
      let detalles = req.body.detalles;
      detalles.map(function (x) {
        disminuirStock(x._id, x.cantidad);
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Venda.findOne({ _id: req.query._id })
        .populate('usuario', { nome: 1 })
        .populate('pessoa', { nome: 1 });
      if (!reg) {
        res.status(404).send({
          message: 'El registro no existe'
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      });
      next(e);
    }
  },
  list: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.Venda.find({ $or: [{ 'num_comprobante': new RegExp(valor, 'i') }, { 'serie_comprobante': new RegExp(valor, 'i') }] })
        .populate('usuario', { nome: 1 })
        .populate('pessoa', { nome: 1 })
        .sort({ 'createdAt': -1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      });
      next(e);
    }
  },
  /*
  update: async (req,res,next) => {
      try {
          const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{nome:req.body.nome,descripcion:req.body.descripcion});
          res.status(200).json(reg);
      } catch(e){
          res.status(500).send({
              message:'Ocurrió un error'
          });
          next(e);
      }
  },
  remove: async (req,res,next) => {
      try {
          const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id});
          res.status(200).json(reg);
      } catch(e){
          res.status(500).send({
              message:'Ocurrió un error'
          });
          next(e);
      }
  },
  */
  activate: async (req, res, next) => {
    try {
      const reg = await models.Venda.findByIdAndUpdate({ _id: req.body._id }, { estado: 1 });
      //Actualizar stock
      let detalles = reg.detalles;
      detalles.map(function (x) {
        disminuirStock(x._id, x.cantidad);
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.Venda.findByIdAndUpdate({ _id: req.body._id }, { estado: 0 });
      //Actualizar stock
      let detalles = reg.detalles;
      detalles.map(function (x) {
        aumentarStock(x._id, x.cantidad);
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      });
      next(e);
    }
  }
}
