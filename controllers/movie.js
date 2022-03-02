/**
 * /controllers/movie.js
 * Alamin Ahmed, 301250141
 * Movies App
 */
// create a reference to the model
let Movie = require('../models/movie');

// Gets all movies from the Database and renders the page to list all movies.
module.exports.movieList = function(req, res, next) {  
    Movie.find((err, movieList) => {
        // console.log(movieList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('movie/list', {
                title: 'Movie List', 
                movies: movieList
            })            
        }
    });
}

// Gets a movie by id and renders the details page.
module.exports.details = (req, res, next) => {
    // get the movie ide from the url param
    let id = req.params.id;
    // attempt to find the movie by the id
    Movie.findById(id, (err, movieToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('movie/details', {
                title: 'Movie Details', 
                movie: movieToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    // create a empty movie
    let movie = Movie()
    // render movie add/edit page
    res.render('movie/add_edit', {
        title: 'Movie Add',
        movie
    })
}

// Processes the data submitted from the Add form to create a new movie
module.exports.processAddPage = (req, res, next) => {
    // create a new movie model object with provided values
    let movie = Movie({
        Title: req.body.Title,
        Synopsis: req.body.Synopsis,
        Year: req.body.Year,
        Director: req.body.Director,
        Genre: req.body.Genre
    })

    // attempt to save the movie object in the database
    Movie.create(movie, (err, movie) =>{
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the movie list
            res.redirect('/movie/list');
        }
    });
}

// Gets a movie by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    // attempt to find the movie based on given movie id
    let id = req.params.id;
    Movie.findById(id, (err, movie) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            //show the edit view
            res.render('movie/add_edit', {
                title: 'Edit Movie', 
                movie,
            })
        }
    });

}

// Processes the data submitted from the Edit form to update a movie
module.exports.processEditPage = (req, res, next) => {
    // create a new movie object with all provided values
    let id = req.params.id
    let movie = Movie({
        _id: req.body.id,
        Title: req.body.Title,
        Synopsis: req.body.Synopsis,
        Year: req.body.Year,
        Director: req.body.Director,
        Genre: req.body.Genre
    });

    // attempt to update the movie
    Movie.updateOne({_id: id}, movie, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            // console.log(req.body);
            // refresh the movie list
            res.redirect('/movie/list');
        }
    });
}

// Deletes a movie based on its id.
module.exports.performDelete = (req, res, next) => {
    // find the movie with provided id and attempt to delete
    let id = req.params.id
    Movie.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/movie/list');
        }
    });

}