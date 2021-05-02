// Check off specific todos by clicking
$("ul").on("click", "li", function () {
  $(this).toggleClass("completed");
  /*
  if ($(this).css("color") === "rgb(128, 128, 128)") {
    $(this).css({
      color: "black",
      textDecoration: "none",
    });
  } else {
    $(this).css({
      color: "gray",
      textDecoration: "line-through",
    });
  }
  */
});

// Click on X to delete Todo
$("ul").on("click", "span", function () {
  $(this)
    .parent()
    .fadeOut(500, function () {
      $(this).remove();
    });
  event.stopPropagation();
});

$("input[type='text']").keypress(function (event) {
  if (event.which === 13) {
    const todoTest = $(this).val();
    $(this).val("");
    // create a new li and add to ul
    $("ul").append(
      `<li><span><i class="fa fa-trash"></i></span> ${todoTest}</li>`
    );
  }
});

$(".fa-plus").click(function () {
  $("input[type='text']").fadeToggle();
});
