// API'lerin Metod'ları ve Url'larının Konsol Çıktılarını Verir.
export const logMiddleware = ((request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
});