$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  //////////** main slider **//////////
  var mainswiper = new Swiper(".main-slider .swiper-container", {
    spaceBetween: 15,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".main-slider .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".main-slider .swiper-btn-next",
      prevEl: ".main-slider .swiper-btn-prev",
    },
  });
  //////////** products slider **//////////
  var productswiper = new Swiper(".products-slider-1 .swiper-container", {
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 23,
      },
      1199: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    pagination: {
      el: ".products-slider-1 .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".products-slider-1 .swiper-btn-next",
      prevEl: ".products-slider-1 .swiper-btn-prev",
    },
  });
  //////////** .products-slider-2 **//////////
  var serviceswiper = new Swiper(".products-slider-2 .swiper-container", {
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 23,
      },
      1199: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    pagination: {
      el: ".products-slider-2 .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".products-slider-2 .swiper-btn-next",
      prevEl: ".products-slider-2 .swiper-btn-prev",
    },
  });
  //////////** .products-slider-3 **//////////
  var serviceswiper = new Swiper(".products-slider-3 .swiper-container", {
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 23,
      },
      1199: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    pagination: {
      el: ".products-slider-3 .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".products-slider-3 .swiper-btn-next",
      prevEl: ".products-slider-3 .swiper-btn-prev",
    },
  });
  ///////// **product-qty** /////////
  $(".qty-plus").on("click", function () {
    var $parentElm = $(this).parents(".item-qty");
    var maxVal = parseInt($parentElm.find(".qty-input").attr("data-max"));
    var value = $parentElm.find(".qty-input").val();
    if (value < maxVal) {
      value++;
    }
    $parentElm.find(".qty-input").val(value);
  });
  $(".qty-minus").on("click", function () {
    var $parentElm = $(this).parents(".item-qty");
    var minVal = parseInt($parentElm.find(".qty-input").attr("data-min"));
    var value = $parentElm.find(".qty-input").val();
    if (value > minVal) {
      value--;
    }
    $parentElm.find(".qty-input").val(value);
  });
  ///////// ** menu ** /////////
  if ($(window).width() <= 991) {
    $(".menu-btn").click(function () {
      $("nav").addClass("active");
      $(".menu-overlay").fadeIn(300);
      $("body").addClass("overflow");
    });
    $(".menu-overlay,.menu-close").click(function () {
      $("nav").removeClass("active");
      $(".menu-overlay").fadeOut(400);
      $("body").removeClass("overflow");
    });
    $(".mo-nav-item .drop-link").click(function (e) {
      e.preventDefault();
      $(this).siblings(".drop-down").slideToggle(400);
      $(".mo-nav-item .drop-link")
        .not(this)
        .siblings(".drop-down")
        .slideUp(400);
      $(this).toggleClass("active");
      $(".mo-nav-item .drop-link").not(this).removeClass("active");
    });
  }
  ///////// ** select address ** /////////
  $(".adress-item>input").on("change", function () {
    if ($(this).is(":checked")) {
      var addressText = $.trim($(this).siblings(".address-text").text());
      $(".locationInput").val(addressText);
      $("#addressBook-modal").modal("hide");
    }
  });
  ///////// ** select time ** /////////
  $(".select-date").on("click", function () {
    if ($("input.select-date").is(":checked")) {
      $("#date-modal").modal("show");
    }
  });
  if ($(window).width() > 1199) {
    $(".datePicker").flatpickr({
      locale: document.dir == "rtl" ? "ar" : "en",
      minDate: "today",
      dateFormat: "d M Y",
      defaultDate: "today",
    });
  }
  ///////// ** select2 ** /////////
  $(".new-address-select").select2();
  ///////// ** gallery thumbs ** /////////
  var productThumbs = new Swiper(".product-thumbs", {
    slidesPerView: 4,
    // loop: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      0: {
        spaceBetween: 10,
      },
      767: {
        spaceBetween: 15,
      },
      1199: {
        spaceBetween: 15,
      },
    },
  });
  var productImgs = new Swiper(".product-imgs", {
    spaceBetween: 1,
    // loop: true,
    thumbs: {
      swiper: productThumbs,
    },
  });
  lazyLoad();

  $(".success-btn").click(function () {
    Swal.fire({
      icon: "success",
      title: "شكرًا لإختيارك متجرنا",
      text: "ستصلك رسالة في أقرب وقت بموعد وصول المندوب",
      confirmButtonText: "متابعة التسوق",
    });
  });
});
function uploadImg(input) {
  $(input).siblings(".single-filename").html(input.files[0].name);
  console.log(input.files[0].name);
}
function lazyLoad() {
  const images = document.querySelectorAll(".lazy-img");

  const optionsLazyLoad = {
    //  rootMargin: '-50px',
    // threshold: 1
  };

  const imageObserver = new IntersectionObserver(function (enteries) {
    enteries.forEach(function (entery) {
      if (!entery.isIntersecting) {
        return;
      } else {
        preloadImage(entery.target);
        imageObserver.unobserve(entery.target);
      }
    });
  }, optionsLazyLoad);

  images.forEach(function (image) {
    imageObserver.observe(image);
  });
}

function preloadImage(img) {
  img.src = img.getAttribute("data-src");
  img.onload = function () {
    img.parentElement.classList.remove("loading-img");
    img.parentElement.classList.add("loaded-img");
    img.parentElement.parentElement.classList.add("lazy-head-img");
  };
}
//otp code animation
$(".otp-form *:input[type!=hidden]:first").focus();
let otp_fields = $(".otp-form .otp-field"),
  otp_value_field = $(".otp-form .otp-value");
otp_fields
  .on("input", function (e) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9]/g, "")
    );
    let opt_value = "";
    otp_fields.each(function () {
      let field_value = $(this).val();
      if (field_value != "") opt_value += field_value;
    });
    otp_value_field.val(opt_value);
  })
  .on("keyup", function (e) {
    let key = e.keyCode || e.charCode;
    if (key == 8 || key == 46 || key == 37 || key == 40) {
      // Backspace or Delete or Left Arrow or Down Arrow
      $(this).prev().focus();
    } else if (key == 38 || key == 39 || $(this).val() != "") {
      // Right Arrow or Top Arrow or Value not empty
      $(this).next().focus();
    }
  })
  .on("paste", function (e) {
    let paste_data = e.originalEvent.clipboardData.getData("text");
    let paste_data_splitted = paste_data.split("");
    $.each(paste_data_splitted, function (index, value) {
      otp_fields.eq(index).val(value);
    });
  });
//otp timer
const classExists =
  document.getElementsByClassName("countDown-cont").length > 0;
if (classExists) {
  startTimer();
  function startTimer() {
    var presentTime = document.getElementById("counter").innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond(timeArray[1] - 1);
    if (s == 59) {
      m = m - 1;
    }
    if ((m + "").length == 1) {
      m = "0" + m;
    }
    if (m < 0) {
      m = "59";
    }
    document.getElementById("counter").innerHTML = m + ":" + s;
    setTimeout(startTimer, 1000);
  }

  function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
      sec = "0" + sec;
    } // add zero in front of numbers < 10
    if (sec < 0) {
      sec = "59";
    }
    return sec;
  }
}

//modal overlay
$(document).on("show.bs.modal", ".modal", function () {
  const zIndex = 1040 + 10 * $(".modal:visible").length;
  $(this).css("z-index", zIndex);
  setTimeout(() =>
    $(".modal-backdrop")
      .not(".modal-stack")
      .css("z-index", zIndex - 1)
      .addClass("modal-stack")
  );
});
$("#request-submit").click(function () {
  setTimeout(() => $("body").addClass("modal-open"), 500);
});
