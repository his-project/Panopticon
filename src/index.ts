import Panopticon from './Panopticon';

const database = new Panopticon('./db.sqlite');
database.pushCurrentData().catch(err => {
  console.error(err);
});
