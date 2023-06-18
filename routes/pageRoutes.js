const express = require("express");
let movies = require("../movies");
const router = express.Router();

// Get all movies
router.get('/',(req,res)=>{
    res.json(movies)
});

// Get movie by id
router.get('/:id',(req,res)=>{
    const found = movies.some((movie)=>movie.id===parseInt(req.params.id));
    if(found)
    {
        res.json(movies.filter((movie)=>movie.id===parseInt(req.params.id)))
    }
    else{
        res.status(400).send("user not found");
    }
});

// Push a new movie
router.post('/',(req,res)=>{
    const newMovie = {
        id:req.body.id,
        name:req.body.name,
        rating:req.body.rating
    }

    const found = movies.some((movie)=> movie.id === newMovie.id);
    if(found)
    {
        res.status(404).send('Enter a unique id');
    }
    else{
        if(!newMovie.id||!newMovie.name||!newMovie.rating)
        {
            res.status(404).send("Please Enter Valid Entries");
        }
        else{
            movies.push(newMovie);
            res.json(movies);
        }
    }
})

// Delete movie
router.delete('/:id',(req,res)=>{
    const found = movies.some((movie)=>movie.id === parseInt(req.params.id));
    if(found)
    {
        movies=movies.filter((movie)=>movie.id != parseInt(req.params.id));
        res.json(movies);
    }
    else{
        res.status(404).send("movie on that id not found");
    }
});

// Update movie
router.put('/:id',(req,res)=>{
    const found = movies.some((movie)=>movie.id === parseInt(req.params.id));
    if(found)
    {
        const updateMovie = {
            name:req.body.name,
            rating:req.body.rating
        }
        movies.forEach((movie)=>{
            if(movie.id===parseInt(req.params.id))
            {
                movie.name = updateMovie.name ? updateMovie.name : movie.name,
                movie.rating = updateMovie.rating ? updateMovie.rating : movie.rating
            }
            res.send(movies);
        });
    }
    else{
        res.status(404).send("user not found");
    } 
})

module.exports = router;