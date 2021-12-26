import models from '../models';
import bcrypt from 'bcryptjs';
import token from '../services/token';

export default {
  add: async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const reg = await models.Usuario.create(req.body);
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
      const reg = await models.Usuario.findOne({ _id: req.query._id });
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
      const reg = await models.Usuario.find({ $or: [{ 'nome': new RegExp(valor, 'i') }, { 'email': new RegExp(valor, 'i') }] }, { createdAt: 0 })
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
      let pas = req.body.password;
      const reg0 = await models.Usuario.findOne({ _id: req.body._id });
      if (pas != reg0.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { role: req.body.role, nome: req.body.nome, email: req.body.email, password: req.body.password });
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
      const reg = await models.Usuario.findByIdAndDelete({ _id: req.body._id });
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
      const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { ativo: true });
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
      const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { ativo: false });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocorreu um erro'
      });
      next(e);
    }
  },
  login: async (req, res, next) => {
    try {
      let user = await models.Usuario.findOne({ email: req.body.email, estado: true });
      if (user) {
        let match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          let tokenReturn = await token.encode(user._id);
          res.status(200).json({ user, tokenReturn });
        } else {
          res.status(404).send({
            message: 'Password incorreto'
          });
        }
      } else {
        res.status(404).send({
          message: 'Não existe o eusuario'
        });
      }
    } catch (e) {
      res.status(500).send({
        message: 'Ocorreu um erro'
      });
      next(e);
    }
  }
}
