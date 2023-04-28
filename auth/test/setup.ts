require('dotenv').config({ path: '.env.test' });
import mongoose from 'mongoose';

const setup = async () => {
  console.log('Setting up test database...');
  await mongoose.connect(process.env.MONGODB_URI!).then(data => {
    console.log(`Connected to database`);
  });
};

export default setup;
