const combos = [
    [4, 4, 5, 12], [4, 4, 6, 11], [4, 4, 7, 10], [4, 4, 8, 9],
    [4, 5, 5, 11], [4, 5, 6, 10], [4, 5, 7, 9], [4, 5, 8, 8],
    [4, 6, 6, 9], [4, 6, 7, 8],
    [4, 7, 7, 7],
    [5, 5, 5, 10], [5, 5, 6, 9], [5, 5, 7, 8],
    [5, 6, 6, 8], [5, 6, 7, 7],
    [6, 6, 6, 7],
];

function GRN_COMBO(){
    let combo = combos[_grn(0, combos.length - 1)];
    combo = _ro(combo);
    return combo;
}

function GRN_ALLOT(){
    let numbers = [4, 4, 4, 4];
    for(let i = 1; i <= 9; i++){
        let excludeCount = 0;
        for(let j = 0; j <= 3; j++)
            if(numbers[j] >= 12)
                excludeCount++;
        //count from first <12 number as 0 and skip >=12
        let rn = _grn(0, 3 - excludeCount);
        let j = 0;
        while(numbers[j] >= 12)
            j++;
        while(rn > 0 || numbers[j] >= 12){
            if(numbers[j] < 12)
                rn--;
            j++;
        }
        numbers[j]++;
    }
    return numbers;
}

function GRN_RANGE(){
    let numbers = [];
    for(let i = 0; i <= 2; i++){
        let high = 25;
        for(let j = 0; j < i; j++)
            high -= numbers[j];
        for(let j = i + 1; j <= 3; j++)
            high -= 4;
        if(high > 12)
            high = 12;
        numbers[i] = _grn(4, high);
    }
    numbers[3] = 25 - numbers[0] - numbers[1] - numbers[2];
    numbers = _ro(numbers);
    return numbers;
}

function GRN_CROOK(){
    let numbers = [];
    let rn;
    /*
        4, 4: 50% * 24% = 12%
        4, 5: 50% * 47% = 23.5%
        4, 6: 50% * 19% = 9.5%
        4, 7: 50% * 10% = 5%
        5, 5: 41% * 59% = 24.19%
        5, 6: 41% * 41% = 16.81%
        6, 6: 9%
    */
    rn = Math.random();
    if(rn < 0.5){
        numbers[0] = 4;
        rn = Math.random();
        if(rn < 0.24)
            numbers[1] = 4;
        else if(rn < 0.71)
            numbers[1] = 5;
        else if(rn < 0.9)
            numbers[1] = 6;
        else
            numbers[1] = 7;
    }
    else if(rn < 0.91){
        numbers[0] = 5;
        rn = Math.random();
        if(rn < 0.59)
            numbers[1] = 5;
        else
            numbers[1] = 6;
    }
    else{
        numbers[0] = 6;
        numbers[1] = 6;
    }
    /*
    n3 + n4 = a fixed number and n4 has an upper limit, so n3 has a lower limit
        n4 <= 12
        n3 = 25 - n1 - n2 - n4
        ==>>
        n3 >= 25 - n1 - n2 - 12
    */
    let low = Math.max(numbers[1], 25 - numbers[0] - numbers[1] - 12);
    /*
    n3 + n4 = a fixed number and n3 <= n4, so n3 <= half the number
        n3 + n4 = 25 - n1 - n2
        n3 <= n4
        ==>>
        n3 + n3 <= 25 - n1 - n2
    n1 >= 4 and n2 >= 4, so n3 + n4 <= 17, so n3 <= 8.5
        n1, n2 >= 4
        ==>>
        25 - n1 - n2 <= 17
        ==>>
        n3 <= 8.5
    */
    let high = Math.floor((25 - numbers[0] - numbers[1]) / 2);
    numbers[2] = _grn(low, high);
    numbers[3] = 25 - numbers[0] - numbers[1] - numbers[2];
    numbers = _ro(numbers);
    return numbers;
}

//return a random [from, to] integral
function _grn(from, to){
    if(from > to)
        [from, to] = [to, from];
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

//return a copy of array in random order
function _ro(array){
    for(let i = 0; i <= array.length - 2; i++){
        let rn = _grn(i, array.length - 1);
        [array[i], array[rn]] = [array[rn], array[i]];
    }
    return array;
}