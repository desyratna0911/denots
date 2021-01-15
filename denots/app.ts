import { Application, send } from 'https://deno.land/x/oak/mod.ts';
import userMidleware from './userMidleware.ts';
import router from './rute.ts';
import "https://deno.land/x/dotenv@v0.5.0/load.ts";

const app = new Application();
app.use(userMidleware);

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context) => {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}`
    });
});


console.log("service berjalan di port 7000");
await app.listen({port : 7000});