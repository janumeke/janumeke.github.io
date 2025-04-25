const combos = [
    [4, 4, 5, 12], [4, 4, 6, 11], [4, 4, 7, 10], [4, 4, 8, 9],
    [4, 5, 5, 11], [4, 5, 6, 10], [4, 5, 7, 9], [4, 5, 8, 8],
    [4, 6, 6, 9], [4, 6, 7, 8],
    [4, 7, 7, 7],
    [5, 5, 5, 10], [5, 5, 6, 9], [5, 5, 7, 8],
    [5, 6, 6, 8], [5, 6, 7, 7], [6, 6, 6, 7],
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
        while(rn > 0){
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
    //4/4: 12%, 4/5 or 5/4: 32%, 5/5: 30%
    let rn = Math.random();
    let low;
    if(rn < 0.12){
        numbers[0] = 4;
        numbers[1] = 4;
        low = 5;
    }
    else if(rn < 0.44){
        numbers[0] = 4;
        numbers[1] = 5;
        low = 5;
    }
    else if(rn < 0.74){
        numbers[0] = 5;
        numbers[1] = 5;
        low = 5;
    }
    else{
        numbers[0] = _grn(4, 6);
        numbers[1] = _grn(6, 7);
        low = 6;
    }
    let high = 25 - numbers[0] - numbers[1] - low;
    if(high > 12)
        high = 12;
    numbers[2] = _grn(low, high);
    numbers[3] = 25 - numbers[0] - numbers[1] - numbers[2];
    numbers = _ro(numbers);
    return numbers;
}

//return a random [from, to] number
function _grn(from, to){
    if(from > to)
        [from, to] = [to, from];
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

function _ro(array){
    for(let i = 0; i <= array.length - 2; i++){
        let rn = _grn(i, array.length - 1);
        [array[i], array[rn]] = [array[rn], array[i]];
    }
    return array;
}