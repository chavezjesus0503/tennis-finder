import dotenv from 'dotenv';
import courts from './data/courts.js';
import Court from './models/Court.js';
import connectDB from './config/db.js';

dotenv.config({ path: './config/config.env' });

connectDB();

const importData = async () => {
  try {
    await Court.deleteMany();

    await Court.create(courts);

    console.log('Data Imported');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

const destroyData = async () => {
  try {
    await Court.deleteMany();

    console.log('Data Destroyed');
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
