

 $(window).scroll(function() {
  if ($(this).scrollTop() > 200){  
    $('#Nav').addClass("sticky");
  }
  else{
    $('#Nav').removeClass("sticky");
  }
});



 