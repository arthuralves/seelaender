import mongoose, { Schema } from 'mongoose';
const pessoaSchema = new Schema({
  tipo_pessoa: { type: String, maxlength: 20, required: true },
  nome: { type: String, maxlength: 150, unique: true, required: true },
  email: { type: String, maxlength: 150, unique: true, required: false },
  ativo: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Pessoa = mongoose.model('pessoa', pessoaSchema);
export default Pessoa;