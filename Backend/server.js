import { app } from "./app.js";
import userRoutes from './routes/userRouter.js'



app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

app.use('api/users', userRoutes)

