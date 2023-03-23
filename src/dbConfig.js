import mongoose from 'mongoose'

const URI_MONGO =
"mongodb+srv://matuDev2505:w8YEfwAn4dw9jCNF@matudevcluster.hyuyofr.mongodb.net/ecommerce?retryWrites=true&w=majority"
mongoose.connect(URI_MONGO, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Conectado a la base de datos')
  }
})