import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Successfully connected to MongoDB database!")
        })
        const mongoURL = process.env.MONGODB_URI
        const projectName = 'resume-builder'
        if(!mongoURL){
            throw new Error('MONGODB_URI is not defined in environment variables')
        }
        if(mongoURL.endsWith('/')) {
            mongoURL = mongoURL.slice(0, -1)
        }

        await mongoose.connect(`${mongoURL}/${projectName}`)
    }
    catch(error){
        console.error('Error connecting to MongoDB:', error)
    }
}

export default connectDB