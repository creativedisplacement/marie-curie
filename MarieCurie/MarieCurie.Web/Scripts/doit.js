var volunteering = function () {
    
    var usingLocationPlaceholder = "Using your location...";
    // Search location

    function initialisionEvents() {

        $('#location').on('click', function (evt) {
            $('#location-group').removeClass('has-error');
        });

        $('.activity').on('click', function(evt) {
            evt.preventDefault();
            setActivityButtonState(this);
        });

        $('.activities_holder').on('click', '.activity', function(evt) {
            evt.preventDefault();
            setActivityButtonState(this);
        });

        $('.interest').on('click', function(evt) {
            evt.preventDefault();
            setInterestButtonState(this);
        });

        $('.interests_holder').on('click', '.interest', function(evt) {
            evt.preventDefault();
            setInterestButtonState(this);
        });

        $('#role-submit').on('click', function(evt) {
            evt.preventDefault();
            locationLookupAndSearch();
        });

        $('#default-submit').on('click', function (evt) {
            evt.preventDefault();
            locationLookupAndSearch();
        });

        $(document).keypress(function (e) {
            if (e.which == 13) {
                locationLookupAndSearch();
            }
        });

        $('#find-location-volunteering').on('click', function (evt) {
            evt.preventDefault();

            if (navigator.geolocation) {
                $('#location').val('');
                $('#location').attr("placeholder", "Looking up your location...");

                navigator.geolocation.getCurrentPosition(function (position) {
                    $('#location').attr("placeholder", usingLocationPlaceholder);
                    $("input[name=lat]").val(position.coords.latitude);
                    $("input[name=lng]").val(position.coords.longitude);
                    $('#location-group').removeClass('has-error');
                });
            }
        });
    }

    function locationLookupAndSearch() {
        var location = $('#location').val();
        var placeholder = $('#location').attr("placeholder");

        if (location) {
            $.ajax({
                url: '//maps.googleapis.com/maps/api/geocode/json',
                data: { address: location, components: "country:GB", sensor: true },
                success: function(data) {
                    try {
                        if (data.status == "OK") {
                            //$('#location').val(data.results[data.results.length - 1].formatted_address);
                            $("input[name=lat]").val(data.results[data.results.length - 1].geometry.location.lat);
                            $("input[name=lng]").val(data.results[data.results.length - 1].geometry.location.lng);
                            $('#role-search').submit();
                            return;
                        }
                    } catch (ex) {
                        $('#location-group').addClass('has-error');
                        return;
                    }
                }
            });
        } else {

            if (placeholder == usingLocationPlaceholder) {
                $('#role-search').submit();
                return 0;
            } else {
                $('#location-group').addClass('has-error');
            }
        }
    }

    function setActivityButtonState(activity) {
        if ($('i', activity).hasClass('fa-minus-circle')) {
            $('.selected_activities input[value=' + $(activity).data('activity') + ']').remove();

            if ($(activity).parent().hasClass('activities_holder')) {
                $('.activity').each(function () {
                    if ($(this).data('activity')==$(activity).data('activity'))
                        $('i', this).removeClass('fa-minus-circle').addClass('fa-plus-circle');
                });
                $(activity).remove();
            } else {
                $('i', activity).removeClass('fa-minus-circle').addClass('fa-plus-circle');
                var txt = $(activity).text();
                $('.activities_holder button').each(function () {
                    if ($(this).text() == txt) $(this).remove();
                });
            }

            if ($('.activities_holder button').length==0)
                $('.activities_holder .btn-dashed').removeClass('hidden');
        }
        else {
            $('.selected_activities').append('<input type="checkbox" name="activities" checked="checked" value="' + $(activity).data('activity') + '"/>');
            $('i', activity).removeClass('fa-plus-circle').addClass('fa-minus-circle');
            // Add button to list
            if (!$('.activities_holder .btn-dashed').hasClass('hidden')) $('.activities_holder .btn-dashed').addClass('hidden');
            $('.activities_holder').append('<button class="btn btn-info btn-lg activity" data-activity=' + $(activity).data('activity') + '>' + $(activity).text() + '<i class="fa fa-minus-circle"></i></button>');
        }
    }

    function setInterestButtonState(interest) {
        if ($('i', interest).hasClass('fa-minus-circle')) {
            $('.selected_interests input[value=' + $(interest).data('interest') + ']').remove();

            if ($(interest).parent().hasClass('interests_holder')) {
                $('.interest').each(function () {
                    if ($(this).data('interest') == $(interest).data('interest'))
                        $('i', this).removeClass('fa-minus-circle').addClass('fa-plus-circle');
                });
                $(interest).remove();
            } else {
                $('i', interest).removeClass('fa-minus-circle').addClass('fa-plus-circle');
                var txt = $(interest).text();
                $('.interests_holder button').each(function () {
                    if ($(this).text() == txt) $(this).remove();
                });
            }

            if ($('.interests_holder button').length == 0)
                $('.interests_holder .btn-dashed').removeClass('hidden');
        }
        else {
            $('.selected_interests').append('<input type="checkbox" name="interests" checked="checked" value="' + $(interest).data('interest') + '"/>');
            $('i', interest).removeClass('fa-plus-circle').addClass('fa-minus-circle');
            // Add button to list
            if (!$('.interests_holder .btn-dashed').hasClass('hidden')) $('.interests_holder .btn-dashed').addClass('hidden');
            $('.interests_holder').append('<button class="btn btn-info btn-lg interest" data-interest=' + $(interest).data('interest') + '>' + $(interest).text() + '<i class="fa fa-minus-circle"></i></button>');
        }
    }
    //* ==========================================
    //* Public methods
    //* ==========================================
    return {
        Init: function () {
            initialisionEvents();
        },
    };
}();