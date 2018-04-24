var isRealString = (inputString) => {
    return typeof inputString === "string" && inputString.trim().length > 0;
};

module.exports = {isRealString}