import models from '../models';
export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Produto.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocorreu um erro'
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Produto.findOne({ _id: req.query._id })
        .populate('categoria', { nome: 1 });
      if (!reg) {
        res.status(404).send({
          message: 'O registro não existe'
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: 'Ocorreu um erro'
      });
      next(e);
    }
  },
  queryCodigo: async (req, res, next) => {
    try {
      const reg = await models.Produto.findOne({ codigo: req.query.codigo })
        .populate('categoria', { nome: 1 });
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
      const reg = await models.Produto.find({ $or: [{ 'nome': new RegExp(valor, 'i') }, { 'descricao': new RegExp(valor, 'i') }] }, { createdAt: 0 })
        .populate('categoria', { nome: 1 })
        .sort({ 'createdAt': -1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocorreu um erro'
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const reg = await models.Produto.findByIdAndUpdate({ _id: req.body._id }, { categoria: req.body.categoria, codigo: req.body.codigo, nome: req.body.nome, descricao: req.body.descricao, preco_venda: req.body.preco_venda, stock: req.body.stock });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocorreu um erro'
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.Produto.findByIdAndDelete({ _id: req.body._id });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocorreu um erro'
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.Produto.findByIdAndUpdate({ _id: req.body._id }, { ativo: true });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocorreu um erro'
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.Produto.findByIdAndUpdate({ _id: req.body._id }, { ativo: false });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocorreu um erro'
      });
      next(e);
    }
  }
}
