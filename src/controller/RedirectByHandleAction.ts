import { Equal, getManager } from "typeorm";
import { Url } from "../entity/Url";

export async function redirectByHandleAction(req, res) {
  console.log(req.params.handle);
  const urlRepo = getManager().getRepository(Url);

  const post = await urlRepo.find({ handle: Equal(req.params.handle) });
  console.log(post);

  //   if (!post) {
  //     response.status(404);
  //     response.end();
  //     return;
  //   }

  res.redirect(post[0].url);
}
