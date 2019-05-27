'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {

    const numbers = [
        {key: 0, value: [' _ ', '| |', '|_|']},
        {key: 1, value: ['   ', '  |', '  |']},
        {key: 2, value: [' _ ', ' _|', '|_ ']},
        {key: 3, value: [' _ ', ' _|', ' _|']},
        {key: 4, value: ['   ', '|_|', '  |']},
        {key: 5, value: [' _ ', '|_ ', ' _|']},
        {key: 6, value: [' _ ', '|_ ', '|_|']},
        {key: 7, value: [' _ ', '  |', '  |']},
        {key: 8, value: [' _ ', '|_|', '|_|']},
        {key: 9, value: [' _ ', '|_|', ' _|']}
    ]

    bankAccount = bankAccount.split('\n');
    let accountNumber = '';


    for (let i = 0; i < 9; i++) {
        let number = numbers.find(num => {
            return num.value[0] === bankAccount[0].substring(i * 3, i * 3 + 3)
                && num.value[1] === bankAccount[1].substring(i * 3, i * 3 + 3)
                && num.value[2] === bankAccount[2].substring(i * 3, i * 3 + 3)
        })

        accountNumber += number.key;
    }

    return parseInt(accountNumber);
    throw new Error('Not implemented');
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    const words = text.split(' ');
    let result = [];
    let line = '';
    words.forEach(word => {
        if (line.length + word.length > columns) {
            result.push(line.trim())
            line = word + ' ';
        } else {
            line += word + ' ';
        }
    })
    result.push(line.trim())
    for (let r of result)
        yield r
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

    hand = hand.map(h => {
        return h.length === 3 ? [h.substring(0, 2), h.substring(2)] : [h[0], h[1]]
    }).sort((a, b) => cards.indexOf(a[0]) - cards.indexOf(b[0]))

    let flag = true;
    for (let i = 0; i < 4; i++) {
        if (hand[i][0] === '2' && hand.some(el => el[0] === 'A'))
            continue
        if (hand[i + 1][0] === 'A' && hand.some(el => el[0] === '2'))
            continue
        if (cards.indexOf(hand[i + 1][0]) - cards.indexOf(hand[i][0]) !== 1)
            flag = false
    }

    if (hand.every((card, i) => {
        return card[1] === hand[0][1]
    }) && flag) return PokerRank.StraightFlush

    let count = 0
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (hand[i][0] === hand[j][0]) {
                count++
            }
        }
        if (count === 4)
            return PokerRank.FourOfKind
        if (count === 3) {
            let card = hand[i];
            return hand.some(el => {
                return hand.some(h => {
                    return h[0] === el[0] && el[0] !== card[0] && h !== el;

                })
            }) ? PokerRank.FullHouse : PokerRank.ThreeOfKind
        } else count = 0;
    }

    if (hand.every((card, i) => {
        return card[1] === hand[0][1]
    })) return PokerRank.Flush

    let temp = hand.map(h => h[0]).filter((h, i, arr) => arr.indexOf(h) !== arr.lastIndexOf(h))
    if (temp.length === 4)
        return PokerRank.TwoPairs

    if (temp.length === 2)
        return PokerRank.OnePair

    flag = true;
    for (let i = 0; i < 4; i++) {
        if (hand[i][0] === '2' && hand.some(el => el[0] === 'A'))
            continue
        if (hand[i + 1][0] === 'A' && hand.some(el => el[0] === '2'))
            continue
        if (cards.indexOf(hand[i + 1][0]) - cards.indexOf(hand[i][0]) !== 1)
            flag = false
    }
    if (flag)
        return PokerRank.Straight

    return PokerRank.HighCard
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 *
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
    throw new Error('Not implemented');
}


module.exports = {
    parseBankAccount: parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
