const getFortune = () => {
    const fortunes = [
        'Conquer your fears or they will conquer you.',
        'Rivers need springs.',
        'Do not fear what you do not know.',
        'You will have a pleasant surprise.',
        'Whenever possible, keep it simple.',
    ];

    const randomNumber = Math.floor(Math.random() * fortunes.length);
    return fortunes[randomNumber];
}

module.exports = {
    getFortune,
}