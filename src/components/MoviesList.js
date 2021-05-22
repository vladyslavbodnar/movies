import Title from "./Title";

export default function MoviesList({ movies, favoriteBtn, onClickFavorites }) {
    const FavoriteBtn = favoriteBtn;
    return (
        <div className="movies-list">
            {movies.length ? (
                movies.map((movie, i) => (
                    <div className="movie" key={i}>
                        <img src={movie.Poster} alt={`${movie.Title} logo`} className="movie__logo" />
                        <div onClick={() => onClickFavorites(movie)} className="movie__favorite">
                            <FavoriteBtn />
                        </div>
                        <div className="movie__title">
                            <Title title={movie.Title} type="h3" />
                        </div>
                    </div>
                ))
            ) : (
                <Title title="No data" type="h2" />
            )}
            {}
        </div>
    );
}
