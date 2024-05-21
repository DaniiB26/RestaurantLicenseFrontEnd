export const baseUrl = "http://localhost:8080";

export const getLogger = (tag) => (...args) => console.log(tag, ...args);

const log = getLogger("api");

export const withLogs = async (promise, fnName) => {
    const log = getLogger(fnName);
    log(`${fnName} - started`);
    try {
        const res = await promise;
        log(`${fnName} - succeeded`);
        return res.data;
    } catch (err) {
        log(`${fnName} - failed`, err);
        throw err;
    }
};

export const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const fileConfig = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};

export const authConfig = (token) => ({
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
});
