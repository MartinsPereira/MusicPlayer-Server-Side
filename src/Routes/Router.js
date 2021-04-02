const { Router } = require('express');
const MusicController = require('../Controllers/MusicController')
const UserController = require('../Controllers/UserController')
const AlbumController = require('../Controllers/AlbumController')
const PlayListController = require('../Controllers/PlayListController')
const MyLibraryController = require('../Controllers/MyLibraryController')
const multer = require('multer')
const authMiddleware = require('../middlewares/auth');
const MyLibrary = require('../Models/MyLibrary');

const routes = Router();
const upload = multer();
routes.get('/procurar', authMiddleware, MusicController.search)
routes.get('/procurar/albuns', authMiddleware, AlbumController.search)
routes.get('/procurar/library', authMiddleware, MyLibraryController.searchMyLibrary)
routes.get('/procurar/albuns/todos', authMiddleware, AlbumController.searchAll)
routes.get('/procurar/playlists/todos', authMiddleware, PlayListController.searchAll)
routes.get('/users', authMiddleware, UserController.search)
routes.get('/list/playlist', authMiddleware, PlayListController.search)
routes.get('/playlist/:id', authMiddleware, PlayListController.searchOne)
routes.get('/album/:id', authMiddleware, AlbumController.searchOne)
routes.post('/adicionar/playlist/musica', authMiddleware, upload.none(), PlayListController.addMusic)
routes.post('/adicionar/library/playlist', authMiddleware, upload.none(), MyLibraryController.addPlayList)
routes.post('/adicionar/library/album', authMiddleware, upload.none(), MyLibraryController.addAlbum)
routes.post('/cadastrar/musica', authMiddleware, upload.single('img'), MusicController.create)
routes.post('/cadastrar/album', authMiddleware, upload.single('img'), AlbumController.create)
routes.post('/cadastrar/playlist', authMiddleware,upload.single('img'), PlayListController.create)
routes.post('/cadastrar/usuario',  UserController.create)
routes.delete('/remover/playlist/:playlistId', authMiddleware, PlayListController.removePlaylist)
routes.delete('/remover/Album/:albumId', authMiddleware, AlbumController.removeAlbum)
routes.delete('/remover/playlists/musica', authMiddleware, MusicController.removeMusic)
routes.delete('/remover/library/playlist', authMiddleware, MyLibraryController.removePlaylist)
routes.delete('/remover/library/album', authMiddleware, MyLibraryController.removeAlbum)
routes.post('/authenticate', upload.none(),  UserController.authenticate)

module.exports = routes;