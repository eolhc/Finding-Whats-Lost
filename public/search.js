$(document).ready(function() {


  $('#item-search-btn').click(function(event) {
    event.preventDefault();

    var searched_item = $('#searched-item').val()
    var url = '/search';


    //ajax call to backend to retrieve location
    $.get(url, {searched_item: searched_item})
      .done(function(response) {
        var loc_id = response.data_space;
        console.log(loc_id)

        $('.level__rooms').children().each(function(){
          if ($(this).data("space") == loc_id) {
            //open up relevant floor

            //add in animation
            // var tl = new TimelineMax({delay:5}),
            // svgRoot = $('')
            //highlight location
            $(this).find($('.cls-1')).css("fill","blue");
          } else {
            $(this).find($('.cls-1')).css("fill","white");
          }
        });

      }, "json")
  });
});
