import routerx from 'express-promise-router';
import categoriaRouter from './categoria';
import produtoRouter from './produto';
import usuarioRouter from './usuario';

const router = routerx();

router.use('/categoria', categoriaRouter);
router.use('/produto', produtoRouter);
router.use('/usuarios', usuarioRouter);

export default router;