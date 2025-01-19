const envVars = {
    URL: import.meta.env.VITE_URL ,
  };
  
  const env = {
    REACT_APP_API_URL: `${envVars.URL}/api` ,
    REACT_APP_SERVER_URL: `${envVars.URL}`,
  };
  
  export default env;
  