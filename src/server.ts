import app from "./app.ts";
import config from "./common/config/index.ts";

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});