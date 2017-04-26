(function() {

  const newButton = document.querySelectorAll('.new__reveal');
  var count = true;
  $(newButton).click(function() {
    // console.log('animate');
    if (count === true) {
      $('.new__form').animate({height: "300px"}, "swing");
      count = false;
    } else {
      $('.new__form').animate({height: "0"});
      count = true;
    }
    $('.new__form input').toggle();
  });
})();
