jQuery.validator.addMethod("mustbechecked", function (value, element, params) {
    return $(element).is(':checked');
});

jQuery.validator.unobtrusive.adapters.add('mustbechecked', [], function (options) {
    options.rules['mustbechecked'] = options.params;
    if (options.message) {
        options.messages['mustbechecked'] = options.message;
    }
});
