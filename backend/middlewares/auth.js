import tokenService from '../services/token';
export default {
  verifyUsuario: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'Não token'
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.role == 'Administrador' || response.role == 'Vendedor') {
      next();
    } else {
      return res.status(403).send({
        message: 'Não autorizado'
      });
    }
  },
  verifyAdministrador: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'Não token'
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.role == 'Administrador') {
      next();
    } else {
      return res.status(403).send({
        message: 'Não autorizado'
      });
    }
  },
  verifyVendedor: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'Não token'
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.role == 'Administrador' || response.role == 'Vendedor') {
      next();
    } else {
      return res.status(403).send({
        message: 'Não autorizado'
      });
    }
  }
}