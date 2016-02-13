$(document).ready(function() {
   
   //Initialze with tweet button disabled until typing begins: 
   $('#tweet-submit').prop('disabled', true);
   
   //Tweet-actions hidden on load
   $('.tweet-actions').hide();
   
   //Stats and Reply function hidden on load
   $('.stats, .reply').hide();
   var showStats = false;  //sets status as hidden for click function
   
   //Open the new tweet editing section (new tweet only)
    $('#tweet-content .tweet-compose').on('focus', function(e){
        e.preventDefault();
        $('#tweet-content .tweet-compose').css('height', '5em');
        $('#tweet-content #tweet-controls').show();
    });
    
    $('#tweet-content .tweet-compose').on('blur', function(){
        $('#tweet-content .tweet-compose').css('height', '2.5em');
        $('#tweet-content #tweet-controls').hide();
    });
    
    //Show reply and stats on click in tweet section 
    $('.tweet').on('click', function(){
        if(!showStats) {
            $(this).find('.stats, .reply').slideDown('slow');
            return showStats = true;
        } else {
            $(this).find('.stats, .reply').slideUp('slow');
            return showStats = false;
        }
    });
    
    
    //Tweet actions hidden unless on mouseover of specific tweet
    $('.tweet').mouseover(function(){
        $(this).find('.tweet-actions').show();
    });
    
    $('.tweet').mouseout(function() {
       $('.tweet-actions').hide(); 
    });
    
    
    //Show image tooltips
    $('[data-toggle="tooltip"]').tooltip({
        placement: 'top'
    });


    //Changes character count when user types
    $('.tweet-compose').keyup(function(){
        var textCount = 140 - $('.tweet-compose').val().length;
        $('#char-count').html(textCount);
        
        //changes button status to red at 10 chars or less
        if(textCount <= 10) {
            $('#char-count').css('color', 'red');
        } else {
            $('#char-count').css('color', 'inherit');
        }
        //Disable button when no text or too much text
        if(textCount === 140 || textCount < 0) {
            $('#tweet-submit').prop('disabled', true);
        } else {
            $('#tweet-submit').prop('disabled', false);
        }
    });
    
    //Create a new tweet element and append to the tweets group
    $('#tweet-controls button').click(function(){
        console.log('clicked');
        var newTweet = $('.tweet:first').clone();
        var newText = $('.tweet-compose').val();
        newTweet.find('.avatar').attr('src', 'img/alagoon.jpg');
        newTweet.find('.fullname').html('Some Dude');
        newTweet.find('.username').html('@SomeDude');
        newTweet.find('.tweet-text').html(newText);
        
        newTweet.prependTo('#stream');
        
        
        //Reset tweet entry area
        $('.tweet-compose').val('');
        $('.tweet-compose').css('height', '2.5em');
        $('#tweet-controls').hide();
    });
    
});
