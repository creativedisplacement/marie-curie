$(document).ready(function () {

    var triggerredControls = [];

    function isControlTriggerredAlready(controlId) {
        var found = $.inArray(controlId, triggerredControls) > -1;

        if (!found) {
            triggerredControls.push(controlId);
        }
        return found;
    }

    // Trigger SEO event
    $('form').find(':input').blur(function () {
        var controlId = this.id;
        triggerControlEvent(controlId);
    });

    $("#btnContinue").click(function () {
        var controlId = this.id;
        triggerControlEvent(controlId);
    });
    
    $("#btnDonate").click(function () {
        var controlId = this.id;
        triggerControlEvent(controlId);
    });

    function triggerControlEvent(controlId) {
        if (!isControlTriggerredAlready(controlId)) {
            if ((controlId != 'sortCode1') && (controlId != 'sortCode2')) {
                dataLayer.push({
                    'event': 'FormFieldEvent',
                    'eventCategory': 'DonationForm',
                    'eventAction': 'DonationFormFields',
                    'eventLabel': getDonationPageTriggeredControl() + $("#" + controlId).data('seotag')
                });
            }
        }
    }

    function getDonationPageTriggeredControl() {
        var pageType = getDonationType();

        switch (pageType) {
        case 'Single':
            return 'PersonalDetailsPage_SingleDonation_';
        case 'Regular':
            return 'PersonalDetailsPage_RegularDonation_';
        default:
            return 'PaymentDetailsPage_RegularDonation_';
        }
    }

    function getDonationType() {
        return $("#hdn-donationType").data('donationtype');
    }
});

