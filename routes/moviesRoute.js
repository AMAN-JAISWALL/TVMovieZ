
import express from 'express';
import { addMoviesHandler, deletehandler, editMovieHandler, getAllMoviesHandler } from '../controller/moviesController.js';

const router = express.Router();

router.post('/addMovies',addMoviesHandler);
router.post('/getAllMovies',getAllMoviesHandler);
router.post('/editMovie',editMovieHandler);
router.post('/deleteMovie',deletehandler)

export default router;