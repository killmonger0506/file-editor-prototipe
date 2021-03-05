import mongoose from 'mongoose';

const uri = "mongodb://localhost:27017/barriowealth"

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

mongoose.connect(uri, config)
  .then(() => console.log('CONNECTED DATABASE: ', uri))
  .catch(err => console.log('ERROR CONNECTING DATABASE: \n', err))