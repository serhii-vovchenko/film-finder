import s from './MovieDetailsPage.module.css';
import clsx from 'clsx';

import { Suspense, useEffect, useRef, useState } from 'react';
import {
    NavLink,
    Link,
    Outlet,
    useLocation,
    useParams,
} from 'react-router-dom';

import searchMovies from '../../services/api-query';

const MovieDetailsPage = () => {
    const [movieDetails, setMovieDetails] = useState([]);
    const [movieGenres, setMovieGenres] = useState([]);

    const BASE_URL = 'https://api.themoviedb.org/3/movie/';

    const params = useParams();
    const location = useLocation();
    const goBack = useRef(location?.state || '/movies');

    const buildLinkClass = ({ isActive }) => {
        return clsx(s.link, isActive && s.active);
    };

    useEffect(() => {
        const searchMovieDetailsForId = async () => {
            const response = await searchMovies(`${BASE_URL}${params.movieId}`);
            try {
                setMovieDetails(response);
                setMovieGenres(response.genres);
            } catch (error) {
                console.log(error);
            }
        };
        searchMovieDetailsForId();
    }, [params.movieId]);

    const { poster_path, title, vote_average, overview } = movieDetails;

    return (
        <div className={s.wrapper}>
            <div className={s.btn}>
                <Link to={goBack.current}>Go back</Link>
            </div>
            <div className={s.movieInfo}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                    width="400"
                    className={s.img}
                />
                <div className={s.movieDetails}>
                    <h1 className={s.title}>{title}</h1>
                    <p className={s.text}>
                        User Score: {Math.round(vote_average * 10)}%
                    </p>
                    <h3 className={s.h3}>Overview</h3>
                    <p className={s.text}>{overview}</p>
                    <h3 className={s.h3}>Genres</h3>

                    <ul className={s.genres}>
                        {movieGenres.map(item => {
                            return (
                                <li key={item.id} className={s.text}>
                                    {item.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className={s.additional}>
                <h3 className={s.h3}>Additional information</h3>
                <ul className={s.additionalList}>
                    <li className={s.additionalLink}>
                        <NavLink to={'cast'} className={buildLinkClass}>
                            Cast
                        </NavLink>
                    </li>
                    <li className={s.additionalLink}>
                        <NavLink to={'reviews'} className={buildLinkClass}>
                            Reviews
                        </NavLink>
                    </li>
                </ul>
                <Suspense fallback={<h3 className={s.loader}>Loading...</h3>}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
