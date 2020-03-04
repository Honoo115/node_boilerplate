const NotesService = {
  getNotes(knex) {
    return knex.select("*").from("notes");
  },
  getNote(knex, id) {
    return knex
      .select("*")
      .from("notes")
      .where("id", id)
      .first();
  },
  addNote(knex, note) {
    return knex
      .insert(note)
      .into("notes")
      .returning("*")
      .then(notes => {
        return notes[0];
      });
  },
  deleteNote(knex, id) {
    return knex("notes")
      .where({ id })
      .delete();
  },
  updateNote(knex, id, note) {
    return knex("notes")
      .where({ id })
      .update(note);
  }
};
module.exports = NotesService;
