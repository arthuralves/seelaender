import models from '../models';
export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Categoria.create(req.body);
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
      const reg = await models.Categoria.findOne({ _id: req.query._id });
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
      const reg = await models.Categoria.find({ $or: [{ 'nome': new RegExp(valor, 'i') }, { 'descricao': new RegExp(valor, 'i') }] }, { createdAt: 0 })
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
      const reg = await models.Categoria.findByIdAndUpdate({ _id: req.body._id }, { nome: req.body.nome, descricao: req.body.descricao });
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
      const reg = await models.Categoria.findByIdAndDelete({ _id: req.body._id });
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
      const reg = await models.Categoria.findByIdAndUpdate({ _id: req.body._id }, { ativo: true });
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
      const reg = await models.Categoria.findByIdAndUpdate({ _id: req.body._id }, { ativo: false });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocorreu um erro'
      });
      next(e);
    }
  }
}
