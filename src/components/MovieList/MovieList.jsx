import s from './MovieList.module.css';

import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ dataMovies }) => {
    const { results } = dataMovies;
    const location = useLocation();

    const basePath =
        location.pathname === '/' || location.pathname === '/movies'
            ? '/movies/'
            : location.pathname;

    if (dataMovies.length === 0) {
        return;
    }

    return (
        <>
            <ul className={s.wrapper}>
                {results.map(movie => {
                    return (
                        <li key={movie.id} className={s.itemWrapper}>
                            {
                                <Link
                                    to={`${basePath}${movie.id.toString()}`}
                                    state={location}
                                >
                                    <div className={s.imgWrapper}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${
                                                movie.poster_path ??
                                                '/2IYrYumfQ6ikCWowxdRAUShg1Hm.jpg'
                                            }`}
                                            alt={movie.title}
                                            width="180"
                                        />
                                    </div>
                                    <p className={s.title}>{movie.title}</p>
                                </Link>
                            }
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default MovieList;
