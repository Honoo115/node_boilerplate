const FoldersService = {
  getFolders(knex) {
    return knex.select("*").from("folders");
  },
  getFolder(knex, id) {
    return knex
      .select("*")
      .from("folders")
      .where("id", id)
      .first();
  },
  addFolder(knex, folder) {
    return knex
      .insert(folder)
      .into("folders")
      .returning("*")
      .then(folders => {
        return folders[0];
      });
  },
  deleteFolder(knex, id) {
    return knex("folders")
      .where({ id })
      .delete();
  },
  updateFolder(knex, id, folder) {
    return knex("folders")
      .where({ id })
      .update(folder);
  }
};
module.exports = FoldersService;
