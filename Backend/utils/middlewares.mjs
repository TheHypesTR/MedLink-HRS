export const logMiddleware = ((request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
});