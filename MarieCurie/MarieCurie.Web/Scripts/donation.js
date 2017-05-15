$(document).ready(function() {

    /* Update the git aid section on page load */
    setDonationPageGiftAidInfo();

    // Hide donation block error messages on load
    $('.donate-content .tab-pane .donation-amount-error').hide();
    $('.donate-content form .form-group').removeClass('has-error');

    // Hide no addresses found error message on load
    $('#no-address-msg').hide();

    // Catch the back button/link click in the donation forms
    $('#donationForm a.donate-back, #paymentDetailsForm a.donate-back').click(function(event) {
        donationGoBack(event, $(this));
    });

    $('#donation-amount-change').on('click', function(evt) {
        var newDonation = $("#txt-donation").val();
        if (newDonation != '') {
            $('#selectedDonation').html("£" + newDonation);
            $('#hiddenDonation').val(newDonation);
        }
    });

    //This is a NASTY function. Never delete user's input without giving them some understanding of why.... Love UX
    //$('.numbersOnly').keyup(function() {
   //     
   //     this.value = this.value.replace(/[^0-9\.]/g, '');
   // });


    /*  Gift aid block in donation page  */
    $('#txt-donation').on('focusout', function() {
        setDonationPageGiftAidInfo();
    });

    function setDonationPageGiftAidInfo() {
        var amount = parseFloat($('#txt-donation').val());
        var giftAidAmount = amount + calculateGiftAid(amount);

        // Amend giftaid section with donation amount and giftaid amount
        $('#donation-amount').text(amount);
        $('#total-amount').text(giftAidAmount.toFixed(2));
    };

    /*  Calculate gift aid  */
    function calculateGiftAid(amount) {
        var giftaid = amount * 0.25;
        return giftaid;
    };

    //==
    //== Donation Block ==//

    // Submit event for form
    $('.donate-content form.donate-specific-form').submit(function(e) {
        var $amountField = $(this).find('.donate-amount');

        if (validateAmount($amountField))
            $('.donate-content .tab-pane .donation-amount-error').hide();
        else
            e.preventDefault();
    });

    // Validate input value
    function validateAmount($amountField) {
        if (!$amountField.val() || isNaN($amountField.val())) {
            displayZeroError($amountField);
            $amountField.closest('.form-group').addClass('has-error');
            $amountField.focus();
            return false;
        }

        if ($amountField.val() < 1) {
            displayLowError($amountField);
            $amountField.closest('.form-group').addClass('has-error');
            $amountField.focus();
            return false;
        }

        $amountField.closest('.form-group').removeClass('has-error');
        return true;
    }

    // Display zero amount error
    function displayZeroError($amountField) {
        $('.donate-content .tab-pane .donation-amount-error').hide();

        $amountField.closest('.tab-pane').find('.zero-amount').show();
    }

    // Display low amount error
    function displayLowError($amountField) {
        $('.donate-content .tab-pane .donation-amount-error').hide();

        $amountField.closest('.tab-pane').find('.low-amount').show();
    }

    // Go back when the back button/link is clicked
    function donationGoBack(event, $backElement) {
        var backDistance = $backElement.data('backdistance');

        if (backDistance) {
            event.preventDefault();
            window.history.go(-1 * backDistance);
        } else if ($backElement.attr('href') && $backElement.attr('href') != '#') {
            return true;
        } else {
            event.preventDefault();
            window.history.back();
        }
        return false;
    }

    // Setup hooking into the unobstrusive form validation
    $('#paymentDetailsForm').addTriggersToJqueryValidate().triggerElementValidationsOnFormValidation();

    // Hook into the sort codes validation to allow only one error message to be displayed
    $('.sortcodes').elementValidation(function(element, result) {
        var msgCount = 0;

        if ($('span#sortCodeError1').hasClass('field-validation-error')) {
            msgCount++;
        }

        if ($('span#sortCodeError2').hasClass('field-validation-error')) {
            if (msgCount > 0) {
                $('span#sortCodeError2').removeClass('field-validation-error').addClass('field-validation-valid');
                $('span#sortCode2-error').remove();
            }
            msgCount++;
        }

        if ($('span#sortCodeError3').hasClass('field-validation-error')) {
            if (msgCount > 0) {
                $('span#sortCodeError3').removeClass('field-validation-error').addClass('field-validation-valid');
                $('span#sortCode3-error').remove();
            }
        }
    });

    // Move focus to the next sort code box when 2 digits have been entered
    $('input#sortCode1').keyup(function (e) {
        if ($(this).val().length >= 2 && !(e.keyCode == 16 || e.keyCode == 9)) {
            $('input#sortCode2').focus();
        }
    });

    $('input#sortCode2').keyup(function(e) {
        if ($(this).val().length >= 2 && !(e.keyCode == 16 || e.keyCode == 9)) {
            $('input#sortCode3').focus();
        }
    });

});

