import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';

//Conexao mongodb
mongoose.Promise = global.Promise;
const dbUrl = 'mongodb+srv://dbadmin:dbseelaenderpass@cluster0.vhl2d.mongodb.net/seelaendertst?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {})
  .then(mongoose => console.log('Connected to mongodb seelaendertst'))
  .catch(err => console.log(err));

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);
app.set('port', process.env.PORT || 3000);
let port = app.get('port');

app.listen(port, () => {
  console.log('Server on port ' + port)
})