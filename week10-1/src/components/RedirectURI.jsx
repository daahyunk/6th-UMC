const getRedirectURI = () => {
    const { hostname } = window.location;
  
    if (hostname === 'localhost' && window.location.port === '5174') {
      return 'http://localhost:5174/login/auth';
    } else if (hostname === 'localhost' && window.location.port === '5173') {
      return 'http://localhost:5173/login/auth';
    } else if (hostname === 'umc-movie-week10.netlify.app') {
      return 'https://umc-movie-week10.netlify.app/login/auth';
    } else if (hostname === 'main--umc-movie-week10.netlify.app') {
      return 'https://main--umc-movie-week10.netlify.app/login/auth';
    }
  
    return '';
  };
  
  export default getRedirectURI;
  