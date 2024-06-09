const refreshAccessToken = async () => {
  await fetch(`/api/login/spotify/refresh`);
};

export default refreshAccessToken;
