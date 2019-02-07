$(function() {
	  var cursor;
	  $('#caret').click(function() {
	    $('input').focus();
	    cursor = window.setInterval(function() {
	      if ($('#cursor').css('visibility') === 'visible') {
	        $('#cursor').css({
	          visibility: 'hidden'
	        });
	      } else {
	        $('#cursor').css({
	          visibility: 'visible'
	        });
	      }
	    }, 500);
	
	  });
	
	  $('input').keyup(function() {
	    $('#caret span').text($(this).val());
	  });
});
