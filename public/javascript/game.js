$(function(){
    // Enables popover
    $("#player-display").popover({
        html : true, 
        content: function() {
          return $("#popover-content").html();
        },
        title: function() {
          return $("#popover-title").html();
        }
    });
});

$(function () {
    $('#favorite').popover({trigger: 'hover'})
    $('[data-toggle="popover"]').popover()
    $('.popover-dismiss').popover({trigger: 'focus'})
 
  })

  $(function () {
    $('#favorite').popover({trigger: 'hover'})
    $('[data-trigger="hover"]').popover()
  })

  $(function () {
    $('#comment-button').popover({trigger: 'hover'})
    $('[data-trigger="hover"]').popover()
  })

