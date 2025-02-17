import express from "express";
const router = express.Router();
import {
  deleteAnUser,
  getAllUsers,
  getAnUser,
  updateAnUserPartially,
  logInUser,
  createNewUser,
  updateAnUserFully,
} from "../controllers/users.controller";

router.get("/", getAllUsers);

router.post("/login", async (req, res) => {
  await logInUser(req, res);
});

router.post("/signup", createNewUser);

router.get("/:id", getAnUser);

router.patch("/:id", updateAnUserPartially);

router.put("/:id", updateAnUserFully);

router.delete("/:id", deleteAnUser);

export default router;
