const mainContainer=document.getElementById("Main");
function getName(){
    //Main DIV
    const getNameContainer=document.createElement('div');
    getNameContainer.classList.add("quiz-card");
     //TITLE
    const title=document.createElement("h1");
    title.textContent="Basic Web Development Quiz";
    title.classList.add('h1');
    getNameContainer.appendChild(title);
    
    //SUBSCRIPT
    const subscript=document.createElement('p');
    subscript.textContent="Test your knowledge on Html, Css, Javascript";
    subscript.classList.add('p');
    getNameContainer.appendChild(subscript);

    //div for input
    const inputDiv=document.createElement('div');
    inputDiv.classList.add('input-group');

    //label
    const label=document.createElement('label');
    label.textContent="Enter your name";
    label.classList.add('label');
    label.for="inputid";
    inputDiv.appendChild(label);

        //input
    const input=document.createElement('input');
    input.type="text";
    input.placeholder=" ";
    input.classList.add('input',"focus");
    input.id="inputid";
    inputDiv.appendChild(input);

    getNameContainer.appendChild(inputDiv);
    const newline=document.createElement('br');
    getNameContainer.appendChild(newline);

     //button
    const btn=document.createElement('button');
    btn.type="button";
    btn.classList.add("button");
    btn.textContent="Continue";
    getNameContainer.appendChild(btn);
    
     //whenclicked yeah
    btn.addEventListener('click',()=> {
        const name=input.value.trim();
        if(name===""){
            input.value="";
            input.placeholder="Enter your name first...";
             return;
        }
        //clears the mainoutput and proceedsss
        mainContainer.innerHTML="";
        selectCategory(name);
    });
    mainContainer.appendChild(getNameContainer);
}
//to continue sequence
function selectCategory(name){

    //create container to put to maincontainer
     const selecctCategoryContainer=document.createElement('div');
     selecctCategoryContainer.classList.add('quiz-card');

     //create header
      const header=document.createElement('h1');
      header.textContent="Select a Category";
      header.classList.add('h1');
      selecctCategoryContainer.appendChild(header);
      
    //create subscript
    const subscript=document.createElement('p');
    subscript.textContent="Hello "+name+"! Pick a category to Start.";
    subscript.classList.add('p');
    selecctCategoryContainer.appendChild(subscript);
    
    //create button selections
    categoryArray.forEach((item,index)=>{
      const btn=document.createElement("button");
       btn.type="button";
       btn.textContent=item.category;
       btn.classList.add('button');

       //add newline to put gap
       const newline=document.createElement('br');
       selecctCategoryContainer.appendChild(newline);
       
       //add onclick effects
       btn.addEventListener('click',()=>{
         //clear current display     
        mainContainer.innerHTML="";
        //continue sequence
            startQuiz(index,name);
       });      
       selecctCategoryContainer.appendChild(btn);
    });

    mainContainer.appendChild(selecctCategoryContainer);
}

function startQuiz(index,name){
    // create start quiz container
    const startQuizContainer=document.createElement('div');
    startQuizContainer.classList.add("quiz-card");

    //copying the contents of the chosen category using structuredClone function
    const chosen=structuredClone(categoryArray[index].questions);

    //shuffling forward the contents of array to randomise it yeah
    for(let i=0;i<chosen.length-1;i++){
        const x = Math.floor(Math.random()*10);
        const temp= chosen[i];
        chosen[i]=chosen[x];
        chosen[x]=temp;
    }
    //initialize traverse values
    let inside=0;
    let score=0;
    let level=10;
    
    let chosenAnswers=[];

    
    //will show question depending on traverse
      function displayQ(){

        //uppercontainer for sequence and score
        const leveldiv=document.createElement('div');
        leveldiv.classList.add('leveldiv');
         
        //left
        const questionSequence=document.createElement('div');
        questionSequence.textContent="Questions: "+(inside+1)+"/10";
        questionSequence.classList.add('levelp');

        leveldiv.appendChild(questionSequence);
        
        //rights
       const scorep=document.createElement('div');
        scorep.textContent=`Score: ${score}`;
        scorep.classList.add('levelp');
        leveldiv.appendChild(scorep);

        //levelBar
        const barContainer=document.createElement('div');
        barContainer.classList.add('barContainer');
         //add to card
        startQuizContainer.appendChild(leveldiv);

         //Level fluid haha
        const barfill=document.createElement('div');
         barfill.classList.add('barFill');
         barfill.style.width=`${level}%`;
         barContainer.appendChild(barfill);
         startQuizContainer.appendChild(barContainer);
          
         //questions area
         const questionshow=document.createElement('div');
         questionshow.classList.add('question-box');
    
         //text
         const text=document.createElement('h1');
         text.textContent=chosen[inside].question;
         text.classList.add('question-text');
         questionshow.appendChild(text);

         startQuizContainer.appendChild(questionshow);
        
         //shuffle choices becuase it is much better
         const choicecopy=structuredClone(chosen[inside].choices);

         for(let i=0;i<choicecopy.length-1;i++){
            //shuffling method
            const x=Math.floor(Math.random()*4);

            const temp=choicecopy[i];
            choicecopy[i]=choicecopy[x];
            choicecopy[x]=temp;
         }
         //creating div for buttons
         const qdiv=document.createElement('div');
         qdiv.classList.add('choices-container');
          
         //to make button for all items inside array
         choicecopy.forEach((item,Ndx)=>{
            const btn=document.createElement('button');
            btn.type="button";
            btn.textContent=item;
            btn.classList.add('choice-btn');
            qdiv.appendChild(btn);
           
         //add button functions
        btn.addEventListener('click',()=>{
            
            //if button value match the corrct answer it will turn green and show correct and continue
            if(item===chosen[inside].answer){
                //signify correct
                btn.classList.add("correct");
                score++;
               //createCorrectButton
               startQuizContainer.appendChild(document.createElement('br'));
               const res=document.createElement('div');
               res.textContent="Correct!";
               res.classList.add('answerbtn','correct');
               startQuizContainer.appendChild(res);
            }else{
                btn.classList.add("wrong");
                  //createCorrectButton
                startQuizContainer.appendChild(document.createElement('br'));
               const res=document.createElement('div');
               res.textContent="Wrong! The correct answer is "+chosen[inside].answer;
               res.classList.add('answerbtn','wrong');
               startQuizContainer.appendChild(res);
            }
             
            //Add to ChosenAnswers to display later
            chosenAnswers.push({
                Question:chosen[inside].question,
                yourAnswer: item,
                correctAns: chosen[inside].answer}
            );

            //disabling all buttons inside qdiv when clicked once
            const allchoices=qdiv.querySelectorAll('.choice-btn');
            allchoices.forEach(button => button.disabled = true);

            //continue button
            const nextButton=document.createElement('div');
            nextButton.textContent = inside+1 < 10 ? "Next Question" : "See results";
            nextButton.classList.add('next-btn');
            startQuizContainer.appendChild(nextButton);
             
            //update placement variables
            inside++;
            level+=10;
             //continue sequence if next button is clicked
            nextButton.addEventListener('click',()=>{
                if(inside+1<=10){
                    startQuizContainer.innerHTML="";
                    displayQ();
                }else{
                    mainContainer.innerHTML="";
                    showResults();
                }

            });

            

        });
        //show last sequence
        let showResults=()=>{ 
            //make result container
            const resultContainer=document.createElement('div');
            resultContainer.classList.add('quiz-card');
            //make header
           const header=document.createElement('h1');
           header.textContent="Quiz Finished!";
           header.classList.add('h1');
           resultContainer.appendChild(header);

           // score display
           const scoreview=document.createElement('h1');
           scoreview.textContent=score+"/10";
           scoreview.classList.add('h1');
           resultContainer.appendChild(scoreview);
           //name display
           const subscript=document.createElement('p');
           subscript.textContent=`${name}'s Final Score`;
           subscript.classList.add('p');
           resultContainer.appendChild(subscript);

           //scrollable results
           const historydiv=document.createElement('div');
           historydiv.classList.add('resultsContainer');
           
           //for each item to be put in scrollables yeah
          chosenAnswers.forEach((item,index)=>{

            // making container for question and answer
             const answersdiv=document.createElement('div');
             answersdiv.classList.add('result-card');
            
            //question
            const Q=document.createElement('p');
            Q.textContent=`${index+1}. ${item.Question}`;
            Q.classList.add('result-question');
            answersdiv.appendChild(Q);

            //show answer, if wrong, also show the correct answer
            const ans=document.createElement('p');
            ans.textContent=(item.yourAnswer===item.correctAns)? `Your answer: ${item.yourAnswer}`: `Your answer: ${item.yourAnswer} | Correct Answer: ${item.correctAns}`;
            ans.classList.add('result-answer');
            answersdiv.appendChild(ans);
            
            //condition it to have different backgrounds
            if(item.yourAnswer===item.correctAns){
             answersdiv.classList.add('result-correct');
            }else{
             answersdiv.classList.add('result-wrong');
            }
            historydiv.appendChild(answersdiv);
             resultContainer.appendChild(historydiv);
             
          });
          const again=document.createElement('button');
          again.type="button";
          again.textContent="Play Again";
          again.classList.add('next-btn');
          resultContainer.appendChild(again);
          again.addEventListener('click',()=>{
             mainContainer.innerHTML=""; 
            getName();
          });


          mainContainer.appendChild(resultContainer);

        
        }

         });
        startQuizContainer.appendChild(qdiv);

      }
      
      displayQ();  
        

    

     mainContainer.appendChild(startQuizContainer);

}

//start of sequence hehehhehehe
getName();



//array of objects to feed quiz yeahh
const categoryArray = [
  {
    category: "HTML",
    questions: [
      {
        question: "What does HTML stand for?",
        choices: [
          "Hyper Text Markup Language",
          "Home Tool Markup Language",
          "Hyperlinks Text Management Language",
          "High Text Machine Language"
        ],
        answer: "Hyper Text Markup Language"
      },
      {
        question: "Which tag is used for the largest heading?",
        choices: ["<h6>", "<heading>", "<h1>", "<head>"],
        answer: "<h1>"
      },
      {
        question: "Which tag is used to create a paragraph?",
        choices: ["<p>", "<text>", "<para>", "<paragraph>"],
        answer: "<p>"
      },
      {
        question: "Which tag creates a hyperlink?",
        choices: ["<a>", "<link>", "<href>", "<url>"],
        answer: "<a>"
      },
      {
        question: "Which tag inserts an image?",
        choices: ["<img>", "<image>", "<pic>", "<src>"],
        answer: "<img>"
      },
      {
        question: "What attribute defines image source?",
        choices: ["href", "src", "link", "alt"],
        answer: "src"
      },
      {
        question: "Which tag creates a line break?",
        choices: ["<lb>", "<break>", "<br>", "<newline>"],
        answer: "<br>"
      },
      {
        question: "Which tag defines a table row?",
        choices: ["<tr>", "<td>", "<th>", "<table>"],
        answer: "<tr>"
      },
      {
        question: "Which tag defines a list item?",
        choices: ["<li>", "<ul>", "<ol>", "<list>"],
        answer: "<li>"
      },
      {
        question: "Which tag defines a document title?",
        choices: ["<title>", "<head>", "<meta>", "<header>"],
        answer: "<title>"
      }
    ]
  },
  {
    category: "CSS",
    questions: [
      {
        question: "What does CSS stand for?",
        choices: [
          "Cascading Style Sheets",
          "Creative Style System",
          "Color Style Syntax",
          "Computer Style Sheets"
        ],
        answer: "Cascading Style Sheets"
      },
      {
        question: "Which property changes text color?",
        choices: ["font-color", "color", "text-color", "fgcolor"],
        answer: "color"
      },
      {
        question: "Which property controls font size?",
        choices: ["text-size", "font-size", "size", "text-style"],
        answer: "font-size"
      },
      {
        question: "How do you select an element with id 'box'?",
        choices: [".box", "#box", "box", "*box"],
        answer: "#box"
      },
      {
        question: "Which property adds background color?",
        choices: ["bg-color", "color", "background-color", "background-style"],
        answer: "background-color"
      },
      {
        question: "Which CSS is used for layout?",
        choices: ["Flexbox", "HTML", "JS", "PHP"],
        answer: "Flexbox"
      },
      {
        question: "Which property makes text bold?",
        choices: ["font-weight", "bold", "text-bold", "style"],
        answer: "font-weight"
      },
      {
        question: "Which unit is relative?",
        choices: ["px", "cm", "em", "mm"],
        answer: "em"
      },
      {
        question: "Which property aligns text center?",
        choices: ["align", "text-align", "center", "position"],
        answer: "text-align"
      },
      {
        question: "Which selector targets all elements?",
        choices: ["all", "*", "body", "html"],
        answer: "*"
      }
    ]
  },
  {
    category: "JavaScript",
    questions: [
      {
        question: "Which keyword declares a variable?",
        choices: ["var", "let", "const", "All of the above"],
        answer: "All of the above"
      },
      {
        question: "Which symbol is used for comments?",
        choices: ["//", "/* */", "<!-- -->", "#"],
        answer: "//"
      },
      {
        question: "Which method prints to console?",
        choices: ["log()", "print()", "console.log()", "echo()"],
        answer: "console.log()"
      },
      {
        question: "Which is a data type?",
        choices: ["number", "string", "boolean", "All of the above"],
        answer: "All of the above"
      },
      {
        question: "Which keyword creates a function?",
        choices: ["function", "def", "fun", "create"],
        answer: "function"
      },
      {
        question: "Which operator compares value and type?",
        choices: ["==", "===", "=", "!="],
        answer: "==="
      },
      {
        question: "Which structure repeats code?",
        choices: ["loop", "if", "switch", "function"],
        answer: "loop"
      },
      {
        question: "Which is NOT a loop?",
        choices: ["for", "while", "repeat", "do-while"],
        answer: "repeat"
      },
      {
        question: "What does DOM stand for?",
        choices: [
          "Document Object Model",
          "Data Object Model",
          "Display Object Method",
          "Document Oriented Module"
        ],
        answer: "Document Object Model"
      },
      {
        question: "Which keyword is used for constants?",
        choices: ["let", "var", "const", "static"],
        answer: "const"
      }
    ]
  }
   /* incase of Additional category{
    category: "Cybersecurity & Safety",
  questions: [
    {
      question: "Which of the following is considered the strongest password?",
      choices: ["P@ssword123!", "johndoerocks99", "Tr3e$B@rk_42M", "1234567890"],
      answer: "Tr3e$B@rk_42M"
    },
    {
      question: "What is the name of a trick where scams look like legitimate emails to steal your data?",
      choices: ["Phishing", "Diving", "Spamming", "Caching"],
      answer: "Phishing"
    },
    {
      question: "What does '2FA' stand for in account security?",
      choices: ["Two-Factor Authentication", "Two-File Access", "Fast-Access Format", "Forward-Facing Algorithm"],
      answer: "Two-Factor Authentication"
    },
    {
      question: "Which protocol ensures that data sent over a website is encrypted and secure?",
      choices: ["HTTP", "HTTPS", "FTP", "SMTP"],
      answer: "HTTPS"
    },
    {
      question: "What type of malware locks your computer files and demands payment to unlock them?",
      choices: ["Spyware", "Adware", "Ransomware", "Trojan horse"],
      answer: "Ransomware"
    },
    {
      question: "What should you do if a website unexpectedly downloads a file onto your device?",
      choices: ["Open it instantly", "Delete it without opening", "Rename the file", "Send it to a friend"],
      answer: "Delete it without opening"
    },
    {
      question: "What is the main purpose of a network Firewall?",
      choices: ["Speed up internet connection", "Monitor and block unauthorized traffic", "Clean up temporary browser files", "Store user account passwords"],
      answer: "Monitor and block unauthorized traffic"
    },
    {
      question: "Which of these is the safest practice when using public Wi-Fi at a coffee shop?",
      choices: ["Checking your bank statement", "Using a Virtual Private Network (VPN)", "Leaving file sharing turned on", "Saving passwords to public forms"],
      answer: "Using a Virtual Private Network (VPN)"
    },
    {
      question: "What is malicious software designed to secretly monitor your screen and keystrokes called?",
      choices: ["Spyware", "Cookies", "Bloatware", "Firmware"],
      answer: "Spyware"
    },
    {
      question: "Why should you keep your computer's Operating System updated?",
      choices: ["To clear browser history", "To patch critical security vulnerabilities", "To reduce hard drive storage", "To uninstall older programs"],
      answer: "To patch critical security vulnerabilities"
    }
  ]
}*/
];
