<?php
session_start();
if (isset($_GET['action']) && $_GET['action'] === 'restart') {
    session_destroy();  
    session_start();
    header("Location: Trial.php");
    exit; 
}
function returnPcChoice():string{

    $choices=["rock","paper","scissors"];
   $pcchoice=array_rand($choices);
   return $choices[$pcchoice];
}
function play($PChoice,$PCChoice) :string{
    if($PChoice===$PCChoice){
        return "TIE";
    }
    
    $Combination=$PChoice."-".$PCChoice;
    return match($Combination){
         'rock-scissors','paper-rock','scissors-paper'=>'player',
         default=>'computer'
    };
}

 if(isset($_POST['user'])){
    $_SESSION['player']=preg_replace('/\s+/','',($_POST['user']));
    $_SESSION['PCSCORE']=0;
    $_SESSION['SCORE']=0;
  if((isset($_COOKIE[$_SESSION['player']]))){
      $_SESSION['PSCORE']=$_COOKIE[$_SESSION['player']];
     setcookie($_SESSION['player'],"",time() -36000,"/" );
 }
 }

 if(isset($_POST['choice'])){
   $selected=$_POST['choice'];
   $pcselected=returnPcChoice();
   if($selected==='exit'){
     $_SESSION['STATUS']='END';
    
    setcookie($_SESSION['player'],$_SESSION['SCORE'],time() + 60*60*24 ,"/");
   } else{
   $_SESSION['CHOICE']=match($selected){
       'rock'=>'jackenpoy/rck-l.gif',
       'paper'=>'jackenpoy/paper-l.gif',
       'scissors'=> 'jackenpoy/sciss-l.gif'
   };
   $_SESSION['PCCHOICE']=match($pcselected){
       'rock'=>'jackenpoy/rck-r.gif',
       'paper'=>'jackenpoy/paper-r.gif',
       'scissors'=> 'jackenpoy/sciss-r.gif'
   };
   $result=play($selected,$pcselected);
   if($result==='player'){
      $_SESSION['SCORE']++;
   }elseif($result==='TIE'){
    //nothing happens haha
   }else{
    $_SESSION['PCSCORE']++; 
   }
   }
   
  
 }


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style> td,th{ text-align: center; border:1px solid; border-color: gray; width: 50%;
        } 
         body {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            margin: 0;
            background-color: #f4f4f9;
            font-family: Arial, sans-serif;
        }

        table {
            background: #ffffff;
            width: 100%;
            max-width: 1000px; /* Aligns table width to a clean landscape block */
            table-layout: fixed; /* Forces strict 50% split for columns */
        }
        p{
            text-align: left; color: blue;
        }
    </style>
    <title>test
    </title>
</head>
<body>
    <?php if(!isset($_SESSION['STATUS'])):?>
    <table>
     <tr><th colspan="2">Rock Paper Scissors Game</th></tr>
     <tr>
        <td colspan="1"><img src="<?php echo htmlspecialchars($_SESSION['CHOICE'] ?? 'jackenpoy/filler.png'); ?>" alt="Human Choice" style=""></td>
    <td colspan="1"><img src="<?php echo htmlspecialchars($_SESSION['PCCHOICE'] ?? 'jackenpoy/filler.png'); ?>" alt="Computer Choice"></td>
     </tr>
     <tr colspan="2"><td>Human Player</td><td>Computer Player</td></tr> 
     <?php if(!isset($_SESSION['player'])): ?>
     <tr>
    <td colspan="2" style="text-align: left;">
        <form action="Trial.php" method="post" id="loginform">
        <label>Enter your name:</label>
        <input type="text" name="user">
     </form>
     </td>
     </tr>
     <tr><td colspan="2"><button type="submit" form="loginform">Login</button></td></tr>
      <?php else: ?>
        <tr> 
       
        <td colspan="2" style="text-align: left;">
             <form method="POST" action="Trial.php" id="SELECTION">
            <input type="radio"  name="choice" value="rock"><label for="choice">ROCK</label>
            <input type="radio" name="choice" value="paper"><label for="choice">PAPER</label>
            <input type="radio" name="choice" value="scissors"><label for="choice">SCISSORS</label>
        </form>
        <p>Player Name:<?php echo htmlspecialchars($_SESSION['player'])?></p>
           <?php if(isset($_SESSION['PSCORE'])):?>
          <p>Previous Score:<?php echo htmlspecialchars($_SESSION['PSCORE'])?></p>
            <?php endif; ?>
        <p>Your Score:<?php echo htmlspecialchars($_SESSION['SCORE'])?></p>
        <p>Computer Score:<?php echo htmlspecialchars($_SESSION['PCSCORE'])?></p>
           </td>   
    </tr>
       <tr> <td colspan="2"><button form="SELECTION" type="submit">Play</button><button form="SELECTION" type="submit" name="choice" value="exit">End</button></td></tr>
     <?php endif;?>
    </table>
    <?php else:?>
        <div>
               <p>Thank you very much for playing, <?php echo htmlspecialchars($_SESSION['player']??'player') ?>....</p>    
               <p>Your Score is <?php echo htmlspecialchars($_SESSION['SCORE']) ?></p>
               <p>click here to <a href="Trial.php?action=restart" target="_self">play</a> again</p>
        </div>
               <?php endif; ?>
    
</body>
</html>