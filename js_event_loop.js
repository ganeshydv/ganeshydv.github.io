let n=2;

for(let i = 0; i <4; i++) {
    setTimeout(function() {
        console.log(n);
        // n=3;
    }, 1000);
    n=4;
}
n=6;