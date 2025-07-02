import { connect } from 'mongoose';

const connectDB = ()=>{
    connect(process.env.MONGO_URI).then(()=>{
        console.log("Database Connected")
    })
}

export default connectDB