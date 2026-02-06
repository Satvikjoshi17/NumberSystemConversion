// functions to convert datatypes between different formats
// DataTypes - binary , hexadecimal , decimal , octal .
// by using custom functions and logic 
function binaryToHexadecimal(binary) {
    for (let i=0;i<binary.length;i++){
        if (binary[i] !== '0' && binary[i] !== '1'){
            return "Invalid Binary Number";
        }
    }
    
    l=[]
    let hexadecimal =''
    const binarytohex ={
        "0000":"0","0001":"1","0010":"2","0011":"3","0100":"4","0101":"5","0110":"6","0111":"7",
        "1000":"8","1001":"9","1010":"A","1011":"B","1100":"C","1101":"D","1110":"E","1111":"F"
    }
    // logic for trailing zeros if number is not multiple of 4
    while (binary.length % 4 != 0) {
        binary = '0' + binary;
    }
    for (let i=0;i<binary.length;i+=4){
        l.push(binary.slice(i,i+4))

    }
    for (let i=0;i<l.length;i++){
        hexadecimal += binarytohex[l[i]];
    }
    return hexadecimal;
}
function binaryToDecimal(binary){
    for (let i=0;i<binary.length;i++){
        if (binary[i] !== '0' && binary[i] !== '1'){
            return "Invalid Binary Number";
        }
    }
    let decimal = 0;
    let l =binary.length -1;
    for (let i =0 ; i <=binary.length - 1; i++) {
        decimal += parseInt(binary[i]) * Math.pow(2 , l)
        l--;
        
}
    return decimal;
}
function binaryToOctal(binary){
    for (let i=0;i<binary.length;i++){
        if (binary[i] !== '0' && binary[i] !== '1'){
            return "Invalid Binary Number";
        }
    }
    let octal = ''
    const binarytooctal ={
        "000":"0","001":"1","010":"2","011":"3","100":"4","101":"5","110":"6","111":"7"
    }
    while (binary.length % 3 != 0) {
        binary = '0' + binary;
    }
    for (let i=0;i<binary.length;i+=3){
        octal += binarytooctal[binary.slice(i,i+3)];
    }
    return octal;
}
function hexadecimalToBinary(hexadecimal){
    let binary =''
    hexadecimal = hexadecimal.toUpperCase();
    const hextobinary ={
        "0":"0000","1":"0001","2":"0010","3":"0011","4":"0100","5":"0101","6":"0110","7":"0111",
        "8":"1000","9":"1001","A":"1010","B":"1011","C":"1100","D":"1101","E":"1110","F":"1111"
    }
    for (let i=0;i<hexadecimal.length;i++){
        if (!(hexadecimal[i] in hextobinary)){binary="Invalid Hexadecimal Number"; return binary;}
        else{
            binary += hextobinary[hexadecimal[i]];
        }
    }
    return binary;
}
function hexadecimalToDecimal(hexadecimal){
    let binary=hexadecimalToBinary(hexadecimal);
    return binaryToDecimal(binary);
}
function hexadecimalToOctal(hexadecimal){
    let binary=hexadecimalToBinary(hexadecimal);
    return binaryToOctal(binary);
}
function decimalToBinary(decimal){
    let binary ='';
    if (decimal === 0) return '0';
    else{
    while (decimal > 0) {
        binary = (decimal % 2).toString() + binary;
        decimal = Math.floor(decimal / 2);
    }
    return binary;}
}
function decimalToHexadecimal(decimal){
    let binary=decimalToBinary(decimal);
    return binaryToHexadecimal(binary);
}
function decimalToOctal(decimal){
    let binary=decimalToBinary(decimal);
    return binaryToOctal(binary);
}
function octalToBinary(octal){
    let binary ='';
    const octaltobinary ={
        "0":"000","1":"001","2":"010","3":"011","4":"100","5":"101","6":"110","7":"111"
    }
    for (let i=0;i<octal.length;i++){
        if (!(octal[i] in octaltobinary)){binary="Invalid Octal Number"; return binary;}
        else{
        binary += octaltobinary[octal[i]];}
    }
    return binary;
}
function octalToDecimal(octal){
    let binary=octalToBinary(octal);
    return binaryToDecimal(binary);
}
function octalToHexadecimal(octal){
    let binary=octalToBinary(octal);
    return binaryToHexadecimal(binary);
}