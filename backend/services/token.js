import jwt from 'jsonwebtoken';
import models from '../models';

async function checkToken(token) {
  let __id = null;
  try {
    const { _id } = await jwt.decode(token);
    __id = _id;
  } catch (e) {
    return false;
  }
  const user = await models.Usuario.findOne({ _id: __id, ativo: true });
  if (user) {
    const token = jwt.sign({ _id: __id }, 'seel@aenderkey', { expiresIn: '1d' });
    return { token, rol: user.rol };
  } else {
    return false;
  }
}

export default {
  encode: async (_id) => {
    const token = jwt.sign({ _id: _id }, 'seel@aenderkey', { expiresIn: '1d' });
    return token;
  },
  decode: async (token) => {
    try {
      const { _id } = await jwt.verify(token, 'seel@aenderkey');
      const user = await models.Usuario.findOne({ _id, ativo: true });
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (e) {
      const newToken = await checkToken(token);
      return newToken;
    }
  }
}