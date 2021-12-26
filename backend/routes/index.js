import routerx from 'express-promise-router';
import categoriaRouter from './categoria';
import produtoRouter from './produto';
import usuarioRouter from './usuario';
import pessoaRouter from './pessoa';
import compraRouter from './compra';

const router = routerx();

router.use('/categoria', categoriaRouter);
router.use('/produto', produtoRouter);
router.use('/usuarios', usuarioRouter);
router.use('/pessoa', pessoaRouter);
router.use('/compra', compraRouter);

export default router;