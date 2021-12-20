import routerx from 'express-promise-router';
import categoriaRouter from './categoria';
import produtoRouter from './produto';

const router = routerx();

router.use('/categoria', categoriaRouter);
router.use('/produto', produtoRouter);
export default router;