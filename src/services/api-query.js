import axios from 'axios';

// API_KEY = '062073734c8e6570cf502b21f3f66c20';

const options = {
    headers: {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjIwNzM3MzRjOGU2NTcwY2Y1MDJiMjFmM2Y2NmMyMCIsIm5iZiI6MTcyMTgyNDE5My43OTQzLCJzdWIiOiI2NmEwZjE5ZjYxN2VlY2VlYmIyNjNiZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jqLdkzdHM0OzjON4GZidl2KHQSvt92XZdFDZTd0-y0k',
    },
};

const searchMovies = async url => {
    const response = await axios.get(url, options);

    return response.data;
};

export default searchMovies;
