// Autoscroll and nav styling

$('a').on('click', function(event) {
  if (this.hash !== '') {
    event.preventDefault();
    let hash = this.hash;
    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 55
      },
      800,
      'swing',
      function() {
        window.location.hash = hash;
      }
    );
  }
});

$('.nav-logo').click(function(event) {
  event.preventDefault();
  $('body,html').animate(
    {
      scrollTop: 0
    },
    800
  );
});

$(window).scroll(function() {
  let a = 10;
  let pos = $(window).scrollTop();
  if (pos > a) {
    $('nav ul').addClass('nav-ul-scroll');
    $('.nav-logo').addClass('nav-logo-scroll');
  } else {
    $('nav ul').removeClass('nav-ul-scroll');
    $('.nav-logo').removeClass('nav-logo-scroll');
  }
});

$(function() {
  $(document).scroll(function() {
    let $nav = $('.handle');
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

$('.arrow-wrapper').click(function(event) {
  event.preventDefault();
  $('html, body').animate(
    {
      scrollTop: $('#contest').offset().top
    },
    800
  );
});

$('.new-arrow').click(function(event) {
  event.preventDefault();
  $('html, body').animate(
    {
      scrollTop: $('#register').offset().top
    },
    800
  );
});

$('.handle').on('click', function(event) {
  $('nav ul').toggleClass('showing');
});

$('nav ul a').on('click', function(event) {
  $('nav ul').toggleClass('showing');
});

// makes the parallax elements
function parallaxIt() {
  // create variables
  let $fwindow = $(window);
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  let $contents = [];
  let $backgrounds = [];

  // for each of content parallax element
  $('[data-type="content"]').each(function(index, e) {
    let $contentObj = $(this);

    $contentObj.__speed = $contentObj.data('speed') || 1;
    $contentObj.__fgOffset = $contentObj.offset().top;
    $contents.push($contentObj);
  });

  // for each of background parallax element
  $('[data-type="background"]').each(function() {
    let $backgroundObj = $(this);

    $backgroundObj.__speed = $backgroundObj.data('speed') || 1;
    $backgroundObj.__fgOffset = $backgroundObj.offset().top;
    $backgrounds.push($backgroundObj);
  });

  // update positions
  $fwindow.on('scroll resize', function() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    $contents.forEach(function($contentObj) {
      let yPos = $contentObj.__fgOffset - scrollTop / $contentObj.__speed;

      $contentObj.css('top', yPos);
    });

    $backgrounds.forEach(function($backgroundObj) {
      let yPos = -(
        (scrollTop - $backgroundObj.__fgOffset) /
        $backgroundObj.__speed
      );

      $backgroundObj.css({
        backgroundPosition: '50% ' + yPos + 'px'
      });
    });
  });

  // triggers winodw scroll for refresh
  $fwindow.trigger('scroll');
}

parallaxIt();

// Register form

$('.register-form').on('submit', event => {
  event.preventDefault();

  let firstname = $('.firstname').val();
  let lastname = $('.lastname').val();
  let email = $('.email').val();

  $.ajax({
    method: 'POST',
    url: '/api/users/register',
    data: JSON.stringify({ firstname, lastname, email }),
    contentType: 'application/json',
    dataType: 'json',

    success: response => {
      $('.success').prop('hidden', false);
      $('.firstname').val('');
      $('.lastname').val('');
      $('.email').val('');
    },
    error: error => {
      console.log(error);
    }
  });
});
