import app from '.';
import { init } from '../test/helpers';
const port = process.env.PORT || 3000;
init().then(() => { 
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
})