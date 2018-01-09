$(document).ready(function() {
  $("#modal-1, #modal-2, #modal-3, #modal-4, #modal-5, #modal-6, #modal-7, #modal-8, #modal-9, #modal-10").on("change", function() {
    if ($(this).is(":checked")) {
      $("body").addClass("modal-open");
    } else {
      $("body").removeClass("modal-open");
    }
  });

  $(".modal-fade-screen, .modal-close").on("click", function() {
    $(".modal-state:checked").prop("checked", false).change();
  });

  $(".modal-inner").on("click", function(e) {
    e.stopPropagation();
  });
});