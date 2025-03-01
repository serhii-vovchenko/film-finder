import s from './MovieList.module.css';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ dataMovies }) => {
	const location = useLocation();

	if (dataMovies?.length === 0) {
		return;
	}

	const { results } = dataMovies;

	return (
		<>
			<ul className={s.wrapper}>
				{results?.map(movie => {
					return (
						<li key={movie.id} className={s.itemWrapper}>
							{
								<Link to={`/movies/${movie.id.toString()}`} state={location}>
									<div className={s.contentWrapper}>
										<div className={s.imgWrapper}>
											<img
												src={`https://image.tmdb.org/t/p/w500${
													movie.poster_path ?? '/2IYrYumfQ6ikCWowxdRAUShg1Hm.jpg'
												}`}
												alt={movie.title}
												width="220"
											/>
										</div>
										<p className={s.title}>{movie.title}</p>
									</div>
								</Link>
							}
						</li>
					);
				})}
			</ul>
		</>
	);
};

MovieList.propTypes = {
	dataMovies: PropTypes.array.isRequired,
};

export default MovieList;
