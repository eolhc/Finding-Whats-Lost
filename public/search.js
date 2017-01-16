$(document).ready(function() {


  $('#node-search-btn').click(function(event) {
    event.preventDefault();
    var searched_node = $('#searched-node').val()
    var url = '/search';

    console.log('click')
    $.get(url, {searched_node: searched_node})
      .done(function(response) {
        var loc_id = response.data_space;
        console.log(loc_id)
        $('.level__rooms').children().each(function(){
          //to add in ajax call  to back end and back end logic for retrieving room data
          if ($(this).data("space") == loc_id) {
            $(this).find($('.cls-1-4')).css("fill","blue");
          }
        });

      }, "json")
  });
});
