import mongoose, { Schema } from 'mongoose';

const produtoSchema = new Schema({

  nome: { type: String, maxlength: 50, unique: true, required: true },
  descricao: { type: String, maxlength: 255 },
  data_lancamento: { type: Date, default: Date.now },
  categoria: { type: Schema.ObjectId, ref: 'categoria' },
  estilo: { type: String, maxlength: 100 },
  precos_custo: {
    ml350: { type: Number, default: 0 },
    ml473: { type: Number, default: 0 },
    litro: { type: Number, default: 0 }
  },
  preco_venda: {
    ml350: { type: Number, default: 0 },
    ml473: { type: Number, default: 0 },
    litro: { type: Number, default: 0 }
  },
  ativo: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
const Produto = mongoose.model('produto', produtoSchema);
export default Produto;