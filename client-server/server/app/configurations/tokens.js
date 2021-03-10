import pkg from 'jsonwebtoken';
const { verify, sign } = pkg;

const configurations = {
    tokenAlghorithm: "shhhhh",
    tokenExpireTime: '30d',
};

export const getDecodedToken = token => {
    return token ? verify(token, configurations.tokenAlghorithm, (error, decoded) => {
        return error ? error : decoded;
    }) : null;
};

export default function getJWTToken(data) {
    return sign({ data }, configurations.tokenAlghorithm, { expiresIn: configurations.tokenExpireTime });
}
export function getMe(request) {
    const decodedToken = getDecodedToken(request);
    if (decodedToken && decodedToken.data && new Date() < new Date((new Date(0)).setUTCSeconds(decodedToken.exp))) {
        return decodedToken.data;
    }
    
    return null;
}