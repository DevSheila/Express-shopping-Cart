// var stripe = Stripe('pk_test_51Hk7mdJ5RO5Uu0IHXFuGX0TY5ZjUQ5E0rD2kMF5aeckUBxrATEjVFmruY0SaxSothzk4hTFr0rGZg27atqJDCBnf00kpgi6uGX');
 

Stripe.setPublishableKey('pk_test_51Hk7mdJ5RO5Uu0IHXFuGX0TY5ZjUQ5E0rD2kMF5aeckUBxrATEjVFmruY0SaxSothzk4hTFr0rGZg27atqJDCBnf00kpgi6uGX')

var $form =$('checkout-form');

$form.submit(function(event){
    $form.find('button').prop('disabled',true);
    $Stripe.card.createToken({ 

        number:$('#card-number').val(),
        cvc:$('card-cvc').val,
        exp_month:$('card-expiry-year').val(),
        name:$('card-name'),val()
    },stripeResponseHandler);

    return false;

});

function stripeResponseHandler(status,response){
    if(response.error){
        $form.find('.charge-error').text(response.error.message);
        $form.find('.charge-error').removeClass('hidden');
        $form.find('button').prop('diasbled',false);//Re-enable submission


    }else{ //Token was created!

        //Get the token id
        var token = response.id;

        //Insert the token inot the form so it gets submitted to the server
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        $form.get(0).submit();
    
    
    }

    
}
