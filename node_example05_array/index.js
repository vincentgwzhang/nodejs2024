{
    let arr = [1, 2, 3, 4];
    console.log(arr.toString());
}

{
    let arr = ['a', 'b', 'c', 'd'];
    console.log(arr.join());
    console.log(arr.join(""));
    console.log(arr.join("-"));
}

{
    let arr = ['a', 'b', 'c', 'd'];
    console.log(arr.pop());
    console.log(arr.join(""));
}

{
    let arr = ['a', 'b', 'c', 'd'];
    console.log(arr.push('e'));
    console.log(arr.join(""));
}

{
    let arr = ['a', 'b', 'c', 'd'];
    console.log(arr.shift());
    console.log(arr.toString());
}

{
    let arr = ['a', 'b', 'c', 'd'];
    console.log(arr.unshift('e'));
    console.log(arr.toString());
}

{
    let arr = ['a', 'b', 'c', 'd'];
    delete arr[2];
    console.log(arr.toString());
}

{
    let arr = ['a', 'b', 'c', 'd'];
    delete arr[2];
    arr.pop();
    console.log(arr.pop());//undefined
    console.log(arr.toString());
}

{
    let arr1 = ['a', 'b', 'c', 'd'];
    let arr2 = ['e', 'f', 'g', 'h'];
    let arr3 = arr1.concat(arr2);
    console.log(arr1.toString());
    console.log(arr3.toString());
}

{
    let arr1 = ['a', 'b', 'c', 'd'];
    arr1.sort();
    console.log(arr1.toString());
}