import mongoose, { Schema } from 'mongoose';

const categoriaSchema = new Schema({
  nome: { type: String, maxlength: 50, unique: true, required: true },
  descricao: { type: String, maxlength: 255 },
  ativo: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Categoria = mongoose.model('categoria', categoriaSchema);

export default Categoria;