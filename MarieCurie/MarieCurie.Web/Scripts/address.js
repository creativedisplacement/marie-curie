$(document).ready(function () {
	
	// Hide no addresses found error message on load
	$('.no-address-msg').hide();
	
	//var
    //  addressOne = $('#collector-address-1'),
    //  addressTwo = $('#collector-address-2'),
    //  addressThree = $('#collector-address-3'),
    //  addressTown = $('#collector-city'),
    //  addressPostcode = $('#collector-postcode'),
    //  buildingName = $('#building-number'),
    //  $buildingFormWrapper = $('#building-number-form');
    var postCodeResults = [];

	// Show/hide post code finder at page load
	$('.address-wrapper').each(function () {

	    //var memberId = $(this).attr("data-memberid");

	    var $addressOne = $('.address-fields .collector-address-1', $(this)).first();
	    var $addressTown = $('.address-fields .collector-city', $(this)).first();
	    var $addressPostcode = $('.collector-postcode', $(this)).first();

	    if ($addressOne.val() != '' && $addressTown.val() != '' && $addressPostcode.val() != '') {
		    hidePostCodeFinder($(this));
		} else {
		    showPostCodeFinder($(this));
		    $('.address-select', $(this)).hide();
		}
	});
	

	// Search for address by postcode
	$('.btnAddressFinder').on('tap click vclick', function (evt) {
		evt.preventDefault();

	    //var memberId = $(this).attr("data-memberid");
	    var $addressWrapper = $(this).closest('.address-wrapper');

		var $addressPostcode = $('.collector-postcode', $addressWrapper).first();
		var $buildingName = $('.building-number', $addressWrapper).first();
		var $ddlAddressSelect = $('.ddl-address-select', $addressWrapper).first();

		var data = { postcode: $addressPostcode.val(), buildingName: $buildingName.val() };

		$('.spinAddressFinder', $addressWrapper).show();

		$.post("/Address/AddressLookUp", data, function (result) {
			// Set the message for the drop-down if we need to use it
			var chooseMessage = 'Please choose';

			// If the building name / number lookup failed to find one, amend the message
			if (result.BuildingNameFail)
				chooseMessage = 'No matching address found - Please choose';

			$('.spinAddressFinder', $addressWrapper).hide();

			// Reset the drop-down - remove any options
			$('option', $ddlAddressSelect).remove();

			// Reset the not-found error message
			$('.no-address-msg', $addressWrapper).hide();

			postCodeResults = result.list;

			if (result.list.length == 0) {
				// No results so show error message 
			    $('.address-select', $addressWrapper).hide();
			    $('.no-address-msg', $addressWrapper).show();
			} else if (result.list.length === 1) {
				// One result so fill the full address fields and hide the lookup form
			    addIndexedAddressToFields($addressWrapper, 0);
				hidePostCodeFinder($addressWrapper);
			} else if (result.isValid === false) {
				// Address lookup broken
			    $('.address-select', $addressWrapper).show();
				$('<option disabled selected>--' + result.ErrorMessage + '--</option>').appendTo($ddlAddressSelect);
			}
			else {
				// We got a bunch of possible addresses so fill the drop-down with them
			    $('.address-select', $addressWrapper).show();
				$('<option disabled selected>-- ' + chooseMessage + ' --</option>').appendTo($ddlAddressSelect);
				$(result.list).each(function (index, item) {
					$('<option value=' + index + '>' + item.FormattedAddress + '</option>').appendTo($ddlAddressSelect);
				});
			}
		}).fail(function (xhr) {
		});
	});

	// Select an address from the drop-down
	$('.ddl-address-select').on('change', function (evt) {
		var selectedOpt = $(this).find(':selected');
		var $addressWrapper = $(this).closest('.address-wrapper');
		addIndexedAddressToFields($addressWrapper, selectedOpt.attr('value'));
		hidePostCodeFinder($addressWrapper);
	});

	// Allow manual address entry
	$('.manualAddressLink').on('tap click vclick', function (event) {
		event.preventDefault();
		var $addressWrapper = $(this).closest('.address-wrapper');
		hidePostCodeFinder($addressWrapper);
	});

    // Used in donation form
	$('.btnContinue').click(function () {
	    var $addressWrapper = $(this).closest('form').find('.address-wrapper');
	    hidePostCodeFinder($addressWrapper);
    });

	function addIndexedAddressToFields($addressWrapper, addressIndex) {
		var resultAddress = postCodeResults[addressIndex],
            nameNumber = resultAddress.Address.Number.trim(),
            firstLine = (nameNumber !== '') ? nameNumber + ', ' + resultAddress.Address.AddressLine1 : resultAddress.Address.AddressLine1;

		$('.collector-address-1', $addressWrapper).val(firstLine);
		$('.collector-address-2', $addressWrapper).val(resultAddress.Address.AddressLine2);
		$('.collector-address-3', $addressWrapper).val(resultAddress.Address.AddressLine3);
		$('.collector-city', $addressWrapper).val(resultAddress.Address.Town);
		$('.collector-postcode', $addressWrapper).val(resultAddress.Address.Postcode);
	};

	// When you hide the postcode finder, you also display the full address fields
	function hidePostCodeFinder($addressWrapper) {
	    $('.address-fields', $addressWrapper).show();
	    $('.address-select', $addressWrapper).hide();
	    $('.postcode-lookup-form', $addressWrapper).hide();
	    $('.building-number-form', $addressWrapper).hide();
	}

	// When you show the postcode finder, you hide the full address fields
	function showPostCodeFinder($addressWrapper) {
	    $('.address-fields', $addressWrapper).hide();
	    $('.postcode-lookup-form', $addressWrapper).show();
	    $('.building-number-form', $addressWrapper).show();
	}

});

