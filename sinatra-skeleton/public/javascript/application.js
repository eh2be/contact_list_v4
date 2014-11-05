$(function() {

  // $("#submit_button").on("click", function(e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   submit();
  // });

  function submit(e)
  {
    e.stopPropagation(); //Browser, do not submit
    e.preventDefault();

    $.post('/contacts', $(this).serialize())
      .then(function onSuccess(data)
      {
        console.log('Success!', data);
        add_contact_to_table(data);
      }, function onError(error)
      {
        console.error("Error :(", error);
      });

    // $.post('/contacts', { 
    //   "firstname": $("#firstname").val(), 
    //   "lastname": $("#lastname").val(),
    //   "email": $("#email").val(),
    //   "phone": $("#phone").val()
    // }, function(data)
    //   {
    //   if (data.result) {
    //     alert("Successfully created ID #" + data.id);
    //   }
    // }, 'json');
  };

  function delete_contact(id) {
    $.post('/contacts/' + id, {
      }, function(data) {
      }, 'json');
  };

  function add_contact_to_table(contact)
  {
    $(contactTemplate(contact)).appendTo("#contacts");
  }

  $('#new_contact_form').on('submit', submit);

  $("#contacts").on("click", "button.gm-delete", function() {
    var id = $(this).data('contact-id');
    delete_contact(id);
    $(this).parent().parent().fadeOut();
  });

  var contactTemplate = _.template(
    "<tr>" + 
    "<td><%= firstname %></td>" +
    "<td><%= lastname %></td>" +
    "<td><%= email %></td>" +
    "<td><%= phone %></td>" +
    "<td><button class='btn btn-danger gm-edit' data-contact-id=\"<%= id %>\">Edit</button></td>"+
    "<td><button class='btn btn-danger gm-delete' data-contact-id=\"<%= id %>\">Delete</button></td>"+
    "</tr>");

  // ' \' '
  // " \" "

  // $.getJSON('/contacts', function(data) {
  //   $.each(data, function(index, value) {
  //     add_contact_to_table(value);
  //   });
  // });

  $.getJSON('/contacts', function(data)
  {
    data.forEach(add_contact_to_table);
  });

});

// also want to:
// 1. edit a contact
// 2. delete a contact
// 3. find a contact