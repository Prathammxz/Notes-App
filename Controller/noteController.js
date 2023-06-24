const db = require("../Model/index");
const Notes = db.notes;

exports.index = async (req, res) => {
    const notes = await db.notes.findAll();
    console.log(notes);
    res.render("index", {notes});
};


exports.renderNote = async (req, res) => {
    res.render("createNote");
};


exports.createNote = async (req, res) => {
    const { title, description, author } = req.body;
    console.log(req.body)
    db.notes.create({
        title: title,
        description: description,
        author: author,
    });

    res.redirect("/");
  };

exports.singleNote = async (req, res) => {
    const notes = await Notes.findAll({
        where: {
            id: req.params.id
        }
    })
    res.render("singlenote", {
        notes: notes[0]
    });
};

exports.deleteNote = async (req, res) => {
    const notes = await Notes.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect("/");
};

exports.editNote = async (req, res) => {
    const notes = await Notes.findOne({
        where: {
            id: req.params.id
        }
    })
    res.render("editnote", { notes: notes }
    );
};

exports.updateNote = async (req, res) => {
    await Notes.update(
      {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
      },
      {
        where: {
          id: req.params.id,
        },
      });
    res.redirect("/");
  };
