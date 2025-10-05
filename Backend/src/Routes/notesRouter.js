import express from "express";
import {
  CreateNotes,
  DeleteNotes,
  GetAllNotes,
  UpdateNotes,
  GetNoteById,
  DeleteNotesAll,
} from "../Controllers/notesController.js";

const router = express.Router();

router.get("/", GetAllNotes);
router.get("/:id", GetNoteById);
router.post("/", CreateNotes);
router.put("/:id", UpdateNotes);
router.delete("/deleteall", DeleteNotesAll);
router.delete("/:id", DeleteNotes);

export default router;
