Stripe.setPublishableKey('pk_test_51Guy1pIlDohFxOFcsAftf95Mr75zKl3JvvT6R12ATO9lCJ3gV7rSH7Nuj9hpzxMF7io7LQ7XqGrExd0FW7RhXbZ500k13Urgn4');

let $form = $('#checkout-form');

$form.submit((event) => {
    $('#charge-error').addClass("d-none");
    $form.find('button').prop('disabled' , true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#card-name').val()
    }, stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response) {
    if (response.error) { // Problem!
  
      // Show the errors on the form
      $('#charge-error').text(response.error.message);
      $('#charge-error').removeClass("hidden");
      $form.find('button').prop('disabled', false); // Re-enable submission
  
    } else { // Token was created!
  
      // Get the token ID:
      var token = response.id;
  
      // Insert the token into the form so it gets submitted to the server:
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
  
      // Submit the form:
      $form.get(0).submit();

    }
  }
