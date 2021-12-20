import mongoose, { Schema } from 'mongoose';
const produtoSchema = new Schema({
  categoria: { type: Schema.ObjectId, ref: 'categoria' },
  codigo: { type: String, maxlength: 64 },
  nome: { type: String, maxlength: 50, unique: true, required: true },
  descricao: { type: String, maxlength: 255 },
  preco_venda: { type: Number, required: true },
  stock: { type: Number, required: true },
  ativo: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
const Produto = mongoose.model('produto', produtoSchema);
export default Produto;