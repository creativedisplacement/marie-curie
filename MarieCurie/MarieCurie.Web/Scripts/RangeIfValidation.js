jQuery.validator.addMethod('rangeif', function (value, element, params) {
    var $testProperty = $('#' + params.propertyname);
    var testPropertyValue = $testProperty.val();
    var testValue = params.propertyvalue;
    var testValues = params.propertyvalues;
    var rangeMin = parseInt(params.rangemin, 10);
    var rangeMax = parseInt(params.rangemax, 10);
    var valueInt = parseInt(value, 10);

    if ($testProperty.length == 0)
        return true;

    if (!$testProperty.val())
        return true;

    if (!testValue && !testValues)
        return true;

    // Check to see if the test property is a boolean, so we can happily compare values in lower case
    if (testValue && (testValue.toLowerCase() === 'true' || testValue.toLowerCase() === 'false')) {
        testValue = testValue.toLowerCase();
        testPropertyValue = testPropertyValue.toLowerCase();
    }

    // We are testing against a single value of testProperty
    if (testValue) {
        if (testPropertyValue != testValue || (testPropertyValue == testValue && valueInt >= rangeMin && valueInt <= rangeMax))
            return true;
    }

    // We are testing against a number of possible values of testProperty
    if (testValues) {
        var testValuesSplit = testValues.split('|');

        for (var i = 0; i < testValuesSplit.length; i++) {
            if (testPropertyValue == testValuesSplit[i] && (valueInt < rangeMin || valueInt > rangeMax)) {
                return false;
            }
        }

        return true;
    }

    return false;
}, '');

jQuery.validator.unobtrusive.adapters.add('rangeif', ['rangemin', 'rangemax', 'propertyname', 'propertyvalue', 'propertyvalues'], function (options) {
    options.rules['rangeif'] = options.params;
    options.messages['rangeif'] = options.message;
});

