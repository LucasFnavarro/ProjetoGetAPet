import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

const router = Router();

// import dos middleware
import { validationToken } from "../helpers/validation-token.js";

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUserViaToken);
router.get("/:id", UserController.getUserById);
router.patch("/edit/:id", validationToken, UserController.editUser);

export { router as UserRoutes };
