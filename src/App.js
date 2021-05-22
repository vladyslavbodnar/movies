import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddToFavorites from "./components/AddToFavorites";
import MoviesList from "./components/MoviesList";
import RemoveFromFavorites from "./components/RemoveFromFavorites";
import Header from "./components/Header";

function App() {
    const [movies, setMovies] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem("movies_theme") === "true");

    const fetchMovies = (value) => {
        fetch(`http://www.omdbapi.com/?s=${value}&apikey=3c6d9873`)
            .then((response) => response.json())
            .then((movies) => {
                if (movies.Search) {
                    setMovies(movies.Search);
                }
            });
    };

    const saveToLocalStorage = (movies) => {
        localStorage.setItem("movies_favorites", JSON.stringify(movies));
    };

    const handleAddToFavorites = (movie) => {
        let access = true;
        for (const favMovie of favoriteMovies) {
            if(favMovie.imdbID === movie.imdbID) {
                access = false;
            }
        }
        if (access) {
            const newFavoriteMovies = [...favoriteMovies, movie];
            setFavoriteMovies(newFavoriteMovies);
            saveToLocalStorage(newFavoriteMovies);
        }
    };

    const handleRemoveFromFavorites = (movie) => {
        const newFavoriteMovies = favoriteMovies.filter((favoriteMovie) => favoriteMovie.imdbID !== movie.imdbID);
        setFavoriteMovies(newFavoriteMovies);
        saveToLocalStorage(newFavoriteMovies);
    };

    const handleTheme = () => {
        setIsDarkTheme(prev => !prev);
    };

    useEffect(() => {
        fetchMovies(searchValue);
    }, [searchValue]);

    useEffect(() => {
        localStorage.setItem("movies_theme", isDarkTheme);
    }, [isDarkTheme]);

    useEffect(() => {
        setFavoriteMovies(JSON.parse(localStorage.getItem("movies_favorites")));
    }, []);
    return (
        <Router>
            <div className={isDarkTheme ? "app dark" : "app"}>
                <Header title="React movies db" titleType="h1" value={searchValue} onChange={setSearchValue} onClick={handleTheme} />
                <Switch>
                    <Route exact path="/">
                        <MoviesList movies={movies} onClickFavorites={handleAddToFavorites} favoriteBtn={AddToFavorites} />
                    </Route>
                    <Route path="/favorites">
                        <MoviesList movies={favoriteMovies} onClickFavorites={handleRemoveFromFavorites} favoriteBtn={RemoveFromFavorites} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
