import routerx from 'express-promise-router';
import compraController from '../controllers/CompraController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.verifyAdministrador, compraController.add);
router.get('/query', auth.verifyAdministrador, compraController.query);
router.get('/list', auth.verifyAdministrador, compraController.list);
/*
router.put('/update',auth.verifyAdministrador,compraController.update);
router.delete('/remove',auth.verifyAdministrador,compraController.remove);
*/
router.put('/activate', auth.verifyAdministrador, compraController.activate);
router.put('/deactivate', auth.verifyAdministrador, compraController.deactivate);

export default router;