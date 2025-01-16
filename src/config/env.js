const envVars = {
    URL: import.meta.env.URL || "http://localhost:5005",
  };
  
  const env = {
    REACT_APP_API_URL: `${envVars.URL}/api` ,
    REACT_APP_SERVER_URL: `${envVars.URL}`,
  };
  
  console.log(env.REACT_APP_API_URL);
  
  export default env;
  