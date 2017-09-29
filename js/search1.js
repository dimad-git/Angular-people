
 var query =  "4483d5f2e94aff4870fefa103a6d9c62";


$("#savePosition ul li ").click(function(e) {
  e.preventDefault();
  $("#savePosition ul li ").removeClass('activPosition');
  $(this).addClass('activPosition');
  if (this.id=="d1") query ="4483d5f2e94aff4870fefa103a6d9c62";
  else if (this.id=="d2") query ="f931506dccecb1ada03ad736c6bf8f3a";
  else if (this.id=="d3") query ="99d37fe986ae68a319233ae201330379";
  else if (this.id=="d4") query ="a96fd5808cddefe432f9b818957a28bd";
   
  mySearch.gitSearch($('#search'));
 
});


var mySearch = {
   ajaxSearch: undefined,
   current: undefined,
   gitSearch: function(e) {
       e = $('#search') || {};
        query = $(e).val() || query; 
    if (mySearch.current == query) return;
    mySearch.current = query;
    if (!query) alert("Please enter a term to search for");
    else {
     $('#results').html('Searching...');
     if (mySearch.ajaxSearch) mySearch.ajaxSearch.abort();
     mySearch.ajaxSearch = $.getJSON(mySearch.requestBaseUrl+query)
      .done(function(json) {
       json = json.files["angular.json"].content;
       json = JSON.parse(json);
       
       if (json) {
        if (json.length) { // works if return is array (it is) and determines if ANY results were returned
         var v="";
         $('#results').empty().append($('<ul />'));
        
         $.each(json, function(i, v) {
                   
           
          $('#results').append($('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12"  '+
         	'style="padding-left: 0 !important;"><div class="border-list row">'+
         	'<img src="'+v.author.avatar+'" alt="avatar">'+
         	'<a href="https://github.com/'+v.author.login+'"><h2>'+v.author.login+'</h2></a>'+
			'<div class="row inline"><p>contributions:</p><p>'+v.contrib+'</p></div>'+ 
			'<div class="row inline"><p>followers:</p><p>'+v.followers+'</p></div>'+
			'<div class="row inline"><p>repos:</p><p>'+v.repo+'</p></div>'+
			'<div class="row inline"><p>gists:</p><p>'+v.gist+'</p></div></div></div>'));
         });
        }
        else $('#results').html($('<h3 />', { text: 'No results found.' }));
       }
       else alert('Could not find any values.');
      })
      .fail(function(xhr, stat, err){ $('#results').html('ERROR: Please see console.'); console.log(stat, err); });
    }
   },
   requestBaseUrl: 'https://api.github.com/gists/',
   tmrSearch: undefined
  };
 
 $(function() {
    
  //alert("Please type the term to search GitHub for in the text field and hit the ENTER key.");
  mySearch.gitSearch($('#search'));
  
    $('#search')
   .on('blur', mySearch.gitSearch)
   .on('keypress', function(e) { if (e.which == 13) mySearch.gitSearch.apply(this, [e]); })
   .on('keydown', function(e) { clearTimeout(mySearch.tmrSearch); })
   .on('keyup', function(e) {
    var $this = this;
    mySearch.tmrSearch = setTimeout(function() { mySearch.gitSearch.apply($this, [e]); }, 2000);
   });
  
  $(document)
   .on('mouseenter', '#results li', function(e) { $(this).css({'color':'#ffffff'}); })
   .on('mouseleave', '#results li', function(e) { $(this).css({'color':'#000000'}); })
   .on('click', '#results li', function(e) {
    var msg = $(this).data('msgAlert');
    if (msg) alert(msg);
   });
 })

