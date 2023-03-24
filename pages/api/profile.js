import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function user_data(req, res) {
    // If your access token is expired and you have a refresh token
    // `getAccessToken` will fetch you a new one using the `refresh_token` grant
    const { accessToken } = await getAccessToken(req, res, {
        scopes: ["openid", "profile", "email"]
    });
    const response = await fetch('http://127.0.0.1:8000/user-profile/', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const user_data = await response.json();
    res.status(200).json(user_data);
});
