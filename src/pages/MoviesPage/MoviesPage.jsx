import s from './MoviePage.module.css';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import MovieList from '../../components/MovieList/MovieList';
import searchMovies from '../../services/api-query';

const MoviesPage = () => {
    const [searchUserMovies, setSearchUserMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const BASE_URL = 'https://api.themoviedb.org/3/search/movie?page=1&query=';
    const userQuery = searchParams.get('query') ?? '';

    const userSearchOnSubmit = event => {
        event.preventDefault();
        const queryText = event.target.elements.userSearch.value;

        if (!queryText) {
            return;
        }

        searchParams.set('query', queryText.toLowerCase());
        setSearchParams(searchParams);

        event.target.reset();
    };

    useEffect(() => {
        const searchHandleMovies = async () => {
            const response = await searchMovies(`${BASE_URL}${userQuery}`);
            try {
                setSearchUserMovies(response);
            } catch (error) {
                console.log(error);
            }
        };
        searchHandleMovies();
    }, [userQuery]);

    return (
        <>
            <form onSubmit={userSearchOnSubmit} className={s.form}>
                <input
                    type="text"
                    name="userSearch"
                    placeholder="What movie do you want to find?"
                    className={s.input}
                />
                <button type="submit" className={s.btn}>
                    Search
                </button>
            </form>
            <MovieList dataMovies={searchUserMovies} />
        </>
    );
};

export default MoviesPage;
