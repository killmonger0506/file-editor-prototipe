import app from './app';
import './database';

app.set('port', 5000);

app.listen(app.get('port'), () => {
  console.log('SERVER ON PORT ', app.get('port'));
});
