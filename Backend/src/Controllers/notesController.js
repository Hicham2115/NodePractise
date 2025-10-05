import Note from "../../Models/Note.js";

export async function GetAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "My Notes",
      notes,
    });
  } catch (err) {
    console.log("Error In GetAllNotes Controller", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function GetNoteById(req, res) {
  try {
    const NotebyId = await Note.findById(req.params.id);

    if (!NotebyId) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({
      message: "Note Found Successfully !",
      NotebyId,
    });
  } catch (error) {
    console.log("Error In GetNoteById Controller", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
}

export async function CreateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json({
      message: "Note Created Successfully !",
      savedNote,
    });
  } catch (err) {
    console.log("Error In CreateNotes Controller", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function UpdateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(201).json({
      message: "Note Updated Successfully !",
      updatedNote,
    });
  } catch (error) {
    console.log("Error In UpdateNotes Controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function DeleteNotes(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id, {
      new: true,
    });

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(201).json({
      message: "Note Deleted Successfully !",
      deletedNote,
    });
  } catch (error) {
    console.log("Error In DeleteNotes Controller", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
}

export async function DeleteNotesAll(req, res) {
  try {
    const deletedResult = await Note.deleteMany({}); // delete all notes

    res.status(200).json({
      message: `Deleted ${deletedResult.deletedCount} notes successfully!`,
      deletedResult,
    });
  } catch (error) {
    console.log("Error In DeleteNotes Controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
