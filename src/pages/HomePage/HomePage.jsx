import s from './HomePage.module.css';

import { useEffect, useState } from 'react';

import MovieList from '../../components/MovieList/MovieList';
import searchMovies from '../../services/api-query';

const HomePage = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day';

    useEffect(() => {
        const searchTrendingMoviesToday = async () => {
            try {
                const response = await searchMovies(BASE_URL);

                setTrendingMovies(response);
            } catch (error) {
                console.log(error);
            }
        };
        searchTrendingMoviesToday();
    }, []);

    return (
        <div className={s.wrapper}>
            <h1>Trending today</h1>
            <MovieList dataMovies={trendingMovies} />
        </div>
    );
};

export default HomePage;
