import s from './MovieCast.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import searchMovies from '../../services/api-query';

const MovieCast = () => {
    const [movieCast, setMovieCast] = useState([]);
    const BASE_URL = 'https://api.themoviedb.org/3/movie/';
    const params = useParams();

    useEffect(() => {
        const searchMovieCast = async () => {
            try {
                const response = await searchMovies(
                    `${BASE_URL}${params.movieId}/credits`
                );

                setMovieCast(response.cast);
            } catch (error) {
                console.log(error);
            }
        };
        searchMovieCast();
    }, [params.movieId]);

    return (
        <ul className={s.wrapper}>
            {movieCast.map(actor => {
                const { id, profile_path, name, character } = actor;

                return (
                    <li key={id} className={s.actorWrapper}>
                        <div>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${
                                    profile_path ??
                                    '/d6TgUJpAVHC5tZVFHymYMD7rz2e.jpg'
                                }`}
                                alt={name}
                                width="200"
                            />
                        </div>

                        <h3 className={s.title}>{name}</h3>
                        <p className={s.text}>Character: {character}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default MovieCast;
