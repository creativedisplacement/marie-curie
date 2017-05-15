
// Start: Gift Type Event

    function checkNoOfGuestInGiftTypeEvent() {
        var places = document.getElementById("noOfPlaces");

        // Show/Hide participants names
        if (places.options[places.selectedIndex].value == 1) {
            $("#dvGuestsName").hide();
            $("#dvGuestsName").removeClass("has-error");
        } else {
            $("#dvGuestsName").show();
            $("#errorGuestsName").hide();
        }

        // Update number people for tour
        var tourMembers = $('#tourMembersCount');
        tourMembers.find('option').remove();
        for (var count = 1; count <= places.options[places.selectedIndex].value; count++) {
            tourMembers.append('<option value="'+count +'">' + count + '</option>');
        }
    }

    function checkTourInteresetedInGiftTypeEvent() {
        if ($("#chkTourInterested").is(":checked")) {
            $("#dvTourMembersCount").show();
        } else {
            $("#dvTourMembersCount").hide();
        }
    }

// End: Gift Type Event

// Start: MC Swim Type Event
    function cancelMemberInMCSwims(teamMemberId) {
        $('#'+teamMemberId).remove();
    }
// End: MC Swim Type Event

    $(document).ready(function() {

        // Start: Special Event multi-price options
        var $mpOptionDropDowns = $('#special-event-mp-options select');
        var $mpOptionNumPlaces = $('#NumberOfPlaces');
        var $mpOptionForm = $('#special-event-mp-options').closest('form');

        $mpOptionDropDowns.change(function() {
            var totalPlaces = 0;
            $mpOptionDropDowns.each(function () {
                totalPlaces += parseInt($(this).val(), 10);
            });
            $mpOptionNumPlaces.val(totalPlaces);
        });

        $mpOptionForm.submit(function () {
            $mpOptionNumPlaces.valid();
        });

        // End: Special Event multi-price options
    });