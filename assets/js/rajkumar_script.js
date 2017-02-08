// JavaScript Document


(function() {

	var bodyEl = document.body,
		content = document.querySelector( '.content-wrap' ),
		openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		isOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		// close the menu element if the target it´s not the menu element or one of its descendants..
		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
	}

	function toggleMenu() {
		if( isOpen ) {
			classie.remove( bodyEl, 'show-menu' );
		}
		else {
			classie.add( bodyEl, 'show-menu' );
		}
		isOpen = !isOpen;
	}

	init();
	
	 

})();

$(document).ready(function(e) {

	var win_width = window.innerWidth;
	if(win_width > 600){
    $("#nice").niceScroll();
	/*
	* for color add this
	* {cursorcolor:"#43cb89"}*/
	}
	
});




$(".menu a").click(function(e) {
    $("body").removeClass("show-menu");
});
$("#open-button").click(function(e) {
    $("body").addClass("show-menu");
});





//Contact Form

$("#contactform").submit(function(e) { 
			e.preventDefault();
			console.log('submit');
			var name  = $("#name").val();
			var email    = $("#email").val();	
			var comments    = $("#message").val();
			
			
			var postchecks = userSendMailStatus(name, email, comments);
		});
		$('#name, #email, #message').focusin(function(){
			$(this).removeClass("error");
		});
		$('#message').focusin(function(){
			if($(this).val()=='* Message') {
				$(this).val('');
			}
		});
		$('#message').focusout(function(){
			if($(this).val()=='') {
				$(this).val('* Message');
			}
		});
		
		function checkValidEmailAddress(emailAddress) {
    	var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    
		return pattern.test(emailAddress);
	};
	
	var mailsendstatus;
	
	function userSendMailStatus(uname, uemail, message) {
		// checking for some valid user name
		
		if(!uname) {
			$("#name").addClass("error");
		}
		else if(uname.length > 3) {
			$("#name").removeClass("error");
		}
		
				
		// checking for valid email
		if(!checkValidEmailAddress(uemail)) {
			$("#email").addClass("error");
		}
		else if(checkValidEmailAddress(uemail)) {
			$("#email").removeClass("error");
		}
		if( message == '* Message' || message == '' ) {
			$("#message").addClass("error");
		}
		else if(message.length > 5 && message != '* Message' )  {
			$("#message").removeClass("error");	
		}
		
		
		//$("#subber .error").fadeOut('slow');
		
		
		
		// ajax form post
		if(uname.length > 3 && checkValidEmailAddress(uemail) && message.length > 5 && message != '* Message' ) {
			

			mailsendstatus = true;
			$(".subber").html('<img src="img/send_loader.gif" width=42" height="42">');
		
			$.ajax(
				{
					type: 'POST',
					url: 'sendmail.php',
					data: $("#contactform").serialize(),
					success: function(data) {
						if(data == "yes") {
							$(".subber").html('<div class="deliver_msg"> Message received, I&rsquo;ll get back to you soon.</div>');
						
						}else {
							$(".subber").html('<div class="deliver_msg"> OOPS! error, please try again. </div>');
						}
					}
				}
			); // close sending email ajax call	
		}
			
		$("#name").text("");
		$("#email").text("");
		$("#message").text("");
		
		return mailsendstatus;
	}// Contact Form ends
	
/*	var beepOne = $("#theam_music")[0];
$(".logo").mouseenter(function() {
		beepOne.play();
	});*/