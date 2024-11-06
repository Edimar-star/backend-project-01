import createApp from "./app";
import handleMongoConnection from "./db";
import { PORT } from "./config";

const app = createApp();
handleMongoConnection();
app.listen(PORT, () => console.log(`Server listening to port ${PORT}.`));