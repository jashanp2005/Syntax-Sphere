import express from "express"; 
import { updateUser, deleteUser, signout, getUser } from "../controllers/user.controller.js"; 
import { verifyToken } from "../utils/verifyUser.js"; 
 
const router = express.Router(); 
 
router.put('/update/:userId', verifyToken, updateUser); 
router.delete('/delete/:userId', verifyToken, deleteUser); 
router.post('/signout', signout); 
router.get('/:userId', verifyToken, getUser); 
 
export default router;