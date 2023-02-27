const pupperter = require("puppeteer");

console.log("before");

let currPage;

const loginLink = "https://www.hackerrank.com/auth/login";

const email = "devendrarana@zapbuild.com";
const password = "devendra@123";

const answers= [
    `int simpleArraySum(vector<int> ar)
    {
        int iSum = 0;
        
        for(int i = 0; i < ar.size(); i++)
            iSum += ar[i];
        return iSum;
    }`,
    `vector<int> compareTriplets(vector<int> a, vector<int> b) 
    {
        vector<int> alice;
        vector<int> bob;
        vector<int> pointscount;
        
        for(int i = 0; i < a.size(); i++)
        {
            if(a[i] > b[i])
            {
                alice.push_back(1);
            }
            else if(a[i] < b[i])
            {
                bob.push_back(1);
            }
        }
        
        pointscount.push_back(alice.size());
        pointscount.push_back(bob.size());
        
        return pointscount;
    }`
]

// it will launch the browser, with viewPort :null means be default
const browserOpen = pupperter.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maxmimized"],
});

browserOpen
    .then(function (browserObj) {
        // this promise returns the first page of the browser
        let browserOpenPromise = browserObj.newPage();
        return browserOpenPromise;
    })
    .then(function (newTab) {
        // new tab of the browser, we can gothrough google home [age but if needed the new tab we can use this]
        currPage = newTab;
        let hankerrankPromise = currPage.goto(loginLink);
        return hankerrankPromise;
    }).then(function () {
        // this promise selecting the the input box with id input-1 , types the email with the delay of 50 sec means to show
        let emailEntered = currPage.type("input[id='input-1']", email,{delay:50});
        return emailEntered;
    }).then(function () {
        let passwordEntered = currPage.type("input[type='password']", password,{delay:50});
        return passwordEntered;
    }).then(function () {
        let loginClicked = currPage.click("button[data-analytics='LoginPassword']", { delay: 50 });
        return loginClicked;
    }).then(function (){
        let waitAndClickSelector=waitAndClick(" .topic-card a[data-attr1='algorithms']", currPage);
        return waitAndClickSelector;
    }).then(function(){
        let getWarmup =waitAndClick("input[value='warmup']",currPage);
        return getWarmup;
    })
    .then(function(){
        let allChanglledQuestions = currPage.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
        return allChanglledQuestions;
    }).then(function(questionsLength){
        let questions=questionsLength[0];
        let questionsSolverPromise=questionSolver(currPage,questions,answers[0]);
        return questionsSolverPromise;
    })
    .catch(function (error) {
        console.log(error)
    })



function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
       let waitForModelPrmoise= cPage.waitForSelector(selector);
       waitForModelPrmoise.then(function(){
        let clickModal =cPage.click(selector);
        return clickModal;
       }).then(function(){
        resolve();
       }).catch(function(err){
        reject(err)
       });
    });
}

// monaco-editor no-user-select  vs
function questionSolver(page,questions,answer){
    return new Promise(function(resolve , reject){
        let questionGotClicked= questions.click();
        // return questionGotClicked;
        questionGotClicked.then(function(){
            let EditorInFocus =waitAndClick('.monaco-editor.no-user-select.vs',currPage);
            return EditorInFocus;
        }).then(function(){
            let textAgainstCustomInput = waitAndClick('.checkbox-input',currPage);
            return textAgainstCustomInput;
        }).then(function(){
            let textArea=currPage.waitForSelector('textarea.custominput');
            console.log(textArea,"textarea")
            return textArea;
        }).then(function(){
            return page.type('textarea.custominput',answer , {delay:50});
        }).then(function(){
            let altControlPressed = page.keyboard.down('Control');
            return altControlPressed
        }).then(function(){
            let altAPressed = page.keyboard.press('A',{delay:100});
            return altAPressed
        }).then(function(){
            let altXPressed = page.keyboard.press('X',{delay:100});
            return altXPressed
        }).then(function(){
            let CntrlPressed = page.keyboard.up('Control');
            return CntrlPressed;
        }).then(function(){
            let mainEditorPressedFocus=waitAndClick('.monaco-editor.no-user-select.vs',currPage);
            return mainEditorPressedFocus;
        }).then(function(){
            let CntrlPressed = page.keyboard.down('Control');
            return CntrlPressed;
        }).then(function(){
            let altAPressed = page.keyboard.press('A',{delay:100});
            return altAPressed
        }).then(function(){
            let altVPressed = page.keyboard.press('V',{delay:100});
            return altVPressed
        }).then(function(){
            let CntrlPressed = page.keyboard.up('Control');
            return CntrlPressed;

        }).then(function(){
            return page.click('.hr-monaco__run-code',{delay:50})
        }).then(function(){
            resolve();
        }).catch(function(error){
            reject();
        })


    })
}
