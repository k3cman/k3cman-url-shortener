import { getManager } from "typeorm";
import { Url } from "../entity/Url";

export async function urlGetAllAction(req, res) {
  const urlRepo = getManager().getRepository(Url);

  const urls = await urlRepo.find();

  res.send(urls);
}
