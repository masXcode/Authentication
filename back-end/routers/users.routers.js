import { Router } from "express";

import usersControllers from "../controllers/users.controllers.js";

const router = Router()

// add new user
router.post ('/users/register', usersControllers.addNewUser)

// log in
router.post ('/users/login', usersControllers.login)

// get all users ==> admin
router.get ('/users', usersControllers.getAllUsers)

// delete 
router.delete ('/users/delete/:id', usersControllers.deleteUser)


export default router