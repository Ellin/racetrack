// requireKey creates a middleware that authenticates a socket connection 
// with a user provided key against the required accessKey
export function requireKey(accessKey) {
    return (socket, next) => {
        const key = socket.handshake.auth?.key;
        if (!key) {
            return next(new Error("Access key required"));
        }

        if (key === accessKey) {
            next();
        } else {
            next(new Error("Invalid access key"));
        }
    };
}