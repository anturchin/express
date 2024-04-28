const getFortune = () => {
    const fortunes = [
        'рекам нужны истоки',
        'не бойся неведомого',
        'тебя ждет приятный сюрприз',
        'будь проще везде, где только можно',
    ];

    const randomNumber = Math.floor(Math.random() * fortunes.length);
    return fortunes[randomNumber];
}

module.exports = {
    getFortune,
}