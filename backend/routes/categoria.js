import routerx from 'express-promise-router';
import categoriaController from '../controllers/CategoriaController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.verifyEstoque, categoriaController.add);
router.get('/query', auth.verifyEstoque, categoriaController.query);
router.get('/list', auth.verifyEstoque, categoriaController.list);
router.put('/update', auth.verifyEstoque, categoriaController.update);
router.post('/remove', auth.verifyEstoque, categoriaController.remove);
router.put('/activate', auth.verifyEstoque, categoriaController.activate);
router.put('/deactivate', auth.verifyEstoque, categoriaController.deactivate);

export default router;