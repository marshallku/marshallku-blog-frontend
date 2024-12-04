export const pickRandom = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

export const generateRandomName = () => {
    const adjectives = [
        "빠른",
        "느린",
        "큰",
        "작은",
        "아름다운",
        "멋진",
        "귀여운",
        "똑똑한",
        "게으른",
        "용감한",
        "겁많은",
        "행복한",
        "슬픈",
        "재미있는",
        "지루한",
        "친절한",
        "사나운",
        "순한",
    ];

    const animals = [
        "호랑이",
        "사자",
        "곰",
        "토끼",
        "여우",
        "늑대",
        "고양이",
        "강아지",
        "코끼리",
        "기린",
        "원숭이",
        "팬더",
        "소",
        "양",
        "닭",
        "돼지",
        "오리",
        "뱀",
        "개구리",
        "물고기",
    ];

    const randomAdjective = pickRandom(adjectives);
    const randomAnimal = pickRandom(animals);

    return `${randomAdjective} ${randomAnimal}`;
};
