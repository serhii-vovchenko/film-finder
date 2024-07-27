import s from './MovieReviews.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import searchMovies from '../../services/api-query';

const MovieReviews = () => {
    const [movieReviews, setMovieReviews] = useState([]);

    const BASE_URL = 'https://api.themoviedb.org/3/movie/';

    const params = useParams();

    useEffect(() => {
        const searchMovieReviews = async () => {
            const response = await searchMovies(
                `${BASE_URL}${params.movieId}/reviews`
            );
            try {
                setMovieReviews(response.results);
            } catch (error) {
                console.log(error);
            }
        };
        searchMovieReviews();
    }, [params.movieId]);

    return (
        <ul className={s.wrapper}>
            {!movieReviews.length ? (
                <p>We don't have any reviews for this movie.</p>
            ) : (
                movieReviews.map(item => {
                    const { id, author, content } = item;
                    return (
                        <li key={id} className={s.post}>
                            <h3 className={s.title}>Author: {author}</h3>
                            <p className={s.text}>{content}</p>
                        </li>
                    );
                })
            )}
        </ul>
    );
};

export default MovieReviews;
