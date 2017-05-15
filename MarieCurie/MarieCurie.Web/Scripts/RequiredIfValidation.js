jQuery.validator.addMethod('requiredif', function (value, element, params) {
    var $testProperty = $('#' + params.propertyname);
    var testPropertyValue = $testProperty.val();
    var testValue = params.propertyvalue;
    var testValues = params.propertyvalues;

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
        if (testPropertyValue != testValue || (testPropertyValue == testValue && value.trim()))
            return true;
    }

    // We are testing against a number of possible values of testProperty
    if (testValues) {
        var testValuesSplit = testValues.split('|');

        for (var i = 0; i < testValuesSplit.length; i++) {
            if (testPropertyValue == testValuesSplit[i] && !value.trim()) {
                return false;
            }
        }

        return true;
    }

    return false;
}, '');

jQuery.validator.unobtrusive.adapters.add('requiredif', ['propertyname', 'propertyvalue', 'propertyvalues'], function (options) {
    options.rules['requiredif'] = options.params;
    options.messages['requiredif'] = options.message;
});

