const express = require("express");
const FoldersService = require("./folders-service");
const xss = require("xss");
const foldersRouter = express.Router();
const jsonParser = express.json();

const serializeFolder = folderId => ({
  id: folderId.id,
  name: xss(folderId.name)
});

foldersRouter
  .route("/folders")
  .get((req, res, next) => {
    FoldersService.getFolders(req.app.get("db"))
      .then(folders => {
        res.json(folders.map(serializeFolder));
        res.json(folders);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { name } = req.body;
    const newFolder = { name };
    FoldersService.addFolder(req.app.get("db"), newFolder)
      .then(folder => {
        res
          .status(201)
          .location(`/folders/${folder.id}`)
          .json(folder);
      })
      .catch(next);
  });

foldersRouter.route("/:folder_id").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  FoldersService.getById(knexInstance, req.params.folder_id)
    .then(folder => {
      if (!folder) {
        return res.status(404).json({
          error: { message: `Folder doesn't exist` }
        });
      }
      res.json(folder);
    })
    .catch(next);
});

module.exports = foldersRouter;
