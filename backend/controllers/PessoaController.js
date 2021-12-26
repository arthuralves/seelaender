import models from '../models';
export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Pessoa.create(req.body);
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
      const reg = await models.Pessoa.findOne({ _id: req.query._id });
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
  list: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.Pessoa.find({ $or: [{ 'nome': new RegExp(valor, 'i') }, { 'email': new RegExp(valor, 'i') }] }, { createdAt: 0 })
        .sort({ 'createdAt': -1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocorreu um erro'
      });
      next(e);
    }
  },
  listClientes: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.Pessoa.find({ $or: [{ 'nome': new RegExp(valor, 'i') }, { 'email': new RegExp(valor, 'i') }], 'tipo_pessoa': 'Cliente' }, { createdAt: 0 })
        .sort({ 'createdAt': -1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocorreu um erro'
      });
      next(e);
    }
  },
  listFornecedores: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.Pessoa.find({ $or: [{ 'nome': new RegExp(valor, 'i') }, { 'email': new RegExp(valor, 'i') }], 'tipo_pessoa': 'Fornecedor' }, { createdAt: 0 })
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
      const reg = await models.Pessoa.findByIdAndUpdate({ _id: req.body._id }, {
        tipo_pessoa: req.body.tipo_pessoa,
        nome: req.body.nome,
        email: req.body.email
      });
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
      const reg = await models.Pessoa.findByIdAndDelete({ _id: req.body._id });
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
      const reg = await models.Pessoa.findByIdAndUpdate({ _id: req.body._id }, { ativo: true });
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
      const reg = await models.Pessoa.findByIdAndUpdate({ _id: req.body._id }, { ativo: false });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocorreu um erro'
      });
      next(e);
    }
  }
}
