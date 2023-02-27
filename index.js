const pupperter=require('puppeteer');
console.log('before');
let currPage;
const browserOpen=pupperter.launch({headless:false});


browserOpen.then(function(browser){
     const page=browser.pages();
     return page
}).then(function(browserPage){
    currPage=browserPage[0];
    let googlePage = currPage.goto("https://www.google.com/");
     return googlePage
}).
then(function(){
    // waiting to appear on the page
    let pagewillReturn =currPage.waitForSelector("input[type='text']",{visible:true});
    return pagewillReturn;
}).then(function(){
    // type any element on that page , with the refrence to query selector
    let keyboardPress=currPage.type("input[type='text']","https://www.youtube.com/watch?v=-9l8CBKTx6o");
    return keyboardPress
}).then(function(){
    // keyboard to type press special charcater
    let keywordWillBePressed=currPage.keyboard.press('Enter');
    return keywordWillBePressed;

}).then(function (){
    let elementPromise=currPage.waitForSelector("a.X5OiLe",{visible:true});
    return elementPromise;
}).then(function(){
    // mouse click and event can be done with this to
    let pageWithNextValue= currPage.click("a.X5OiLe");
    return pageWithNextValue;
})
.catch(function(err){
    console.log(err,"err")
})

console.log("After")