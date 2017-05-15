$(document).ready(function () {

    updateCatFilters();

    $('#filters-list-iya input.category-filter').change(function () {
        toggleFilterChildren($(this));

        // All ancestors up the DOM tree (allows for multiple level hierarchy)
        var $parentCheckboxes = $(this).closest('li.filter').parents('li.filter').find('> .media > .media-body > .checkbox input.category-filter');

        // If a child gets unticked, untick all ancestors up the DOM tree
        if ($parentCheckboxes.length > 0 && $(this).prop('checked') == false) {
            $parentCheckboxes.prop('checked', false);
        }

        // If a child gets ticked and all its siblings are ticked, recursively try to tick all ancestors
        recurseTryToCheckParents($(this));

        // Finally update the filters
        updateCatFilters();
    });

    $('#txtSearchKeyWord').on('click', function (evt) {
        $('#dvLocationErrorMsg').addClass('hidden');
        $('#location-group').removeClass('has-error');
    });

    $('#filters-clear').on('click', function(evt) {
        evt.preventDefault();
        $('#filters-list-iya input.category-filter').prop('checked', false);
        updateCatFilters();
    });




    function locationLookupAndSearch() {
        var location = $('#txtSearchKeyWord').val();
        if (location) {
            $.ajax({
                url: '//maps.googleapis.com/maps/api/geocode/json',
                data: { address: location, components: "country:GB", sensor: true },
                success: function (data) {
                    try {
                        if (data.status == "OK") {
                            $('#hdnSearchLatitude').val(data.results[0].geometry.location.lat);
                            $('#hdnSearchLongitude').val(data.results[0].geometry.location.lng);
                            $('#inYourAreaSearchPage').submit();
                            return;
                        }
                    } catch (ex) {
                        $('#txtSearchKeyWord').addClass('has-error');
                        return;
                    }
                },
                error: function () {
                    if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
                        $('#location-group').addClass('has-error');
                        $('#dvLocationErrorMsg').removeClass('hidden');
                    }
                    return;
                }
            });
        } else {
            $('#location-group').addClass('has-error');
            $('#dvLocationErrorMsg').removeClass('hidden');
            return;
        }
    }



    $('#inYourAreaSearchPage button[type=submit]').on('click', function (evt) {
        evt.preventDefault();
        locationLookupAndSearch();
    });

    function recurseTryToCheckParents($checkbox) {
        // Immediate ancestor
        var $immediateParentCheckbox = $checkbox.closest('ul.filters-list').closest('li.filter').find('> .media > .media-body > .checkbox input.category-filter');

        // If immediate parent checkbox exists and this checkbox is ticked, tick parent if this ones siblings are all ticked
        if ($immediateParentCheckbox.length > 0 && $checkbox.prop('checked')) {
            var $parentUl = $immediateParentCheckbox.closest('li.filter').find('ul.filters-list');
            var $siblingCheckBoxes = $parentUl.find('input.category-filter');
            var $checkedSiblings = $parentUl.find('input.category-filter:checked');

            // If the number of sibling checkboxes equals the number of checked, check the parent
            if ($siblingCheckBoxes.length === $checkedSiblings.length) {
                $immediateParentCheckbox.prop('checked', true);

                // Recursively try to check the next parent up the tree
                recurseTryToCheckParents($immediateParentCheckbox);
            }
        }
    }

    function toggleFilterChildren($parentFilter) {
        var isParentChecked = $parentFilter.prop('checked');
        $parentFilter.closest('li.filter').find('ul.filters-list li.filter input.category-filter').prop('checked', isParentChecked);
    }

    function updateCatFilters() {
        var selectedFilterIds = '';
        var selectedFilterNames = '';

        $('#filters-list-iya input.category-filter:checked').each(function () {
            selectedFilterIds += selectedFilterIds.length > 0 ? ',' : '';
            selectedFilterIds += $(this).data('id');
            selectedFilterNames += selectedFilterNames.length > 0 ? ',' : '';
            selectedFilterNames += $(this).data('name');
        });

        $('#iya-selected-filter-ids').val(selectedFilterIds);
        $('#iya-selected-filter-names').val(selectedFilterNames);
    }







    //function locationLookupAndSearch() {
    //    var location = $('#txtSearchKeyWord').val();

    //    if (location) {
    //        $.ajax({
    //            url: '//maps.googleapis.com/maps/api/geocode/json',
    //            data: { address: location, components: "country:GB", sensor: true },
    //            success: function (data) {
    //                try {
    //                    if (data.status == "OK") {
    //                        $('#hdnSearchLatitude').val(data.results[data.results.length - 1].geometry.location.lat);
    //                        $('#hdnSearchLongitude').val(data.results[data.results.length - 1].geometry.location.lng);
    //                        $('#inYourAreaSearchPage').submit();
    //                        return;
    //                    }
    //                } catch (ex) {
    //                    $('#txtSearchKeyWord').addClass('has-error');
    //                    return;
    //                }
    //            },
    //            error: function () {
    //                if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
    //                    $('#location-group').addClass('has-error');
    //                    $('#dvLocationErrorMsg').removeClass('hidden');
    //                }
    //                return;
    //            }
    //        });
    //    } else {
    //        $('#location-group').addClass('has-error');
    //        $('#dvLocationErrorMsg').removeClass('hidden');
    //        return;
    //    }
    //}

































    //function locationLookupAndSearch() {
        
    //    var location = $('#txtSearchKeyWord').val();
    //    //$.support.cors = true;
    //    if (location) {
    //        //alert(location);
    //        $.ajax({
    //            cache: false,
    //            crossDomain: true,
    //            url: '//maps.googleapis.com/maps/api/geocode/json',
    //            contentType: 'application/json; charset=utf-8',
    //            dataType: 'json',
    //            data: { address: location, components: "country:GB", sensor: true },
    //            success: function (data) {
    //                try {
    //                    //alert('Success');
    //                    if (data.status == "OK") {
    //                        $('#hdnSearchLatitude').val(data.results[data.results.length - 1].geometry.location.lat);
    //                        $('#hdnSearchLongitude').val(data.results[data.results.length - 1].geometry.location.lng);
    //                        $('#inYourAreaSearchPage').submit();
    //                        return;
    //                    }
    //                } catch (ex) {
    //                    //alert('Success with exception');
    //                    $('#txtSearchKeyWord').addClass('has-error');
    //                    return;
    //                }
    //            },
    //            error: function (jqXHR, textStatus, errorThrown) {
    //                //alert(jqXHR);
    //                //alert(textStatus);
    //                //alert(errorThrown);

    //                //alert('Error: Above condition');
    //                if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
    //                    $('#location-group').addClass('has-error');
    //                    $('#dvLocationErrorMsg').removeClass('hidden');
    //                    //alert('Error: In condition');
    //                }
    //                //alert('Error: Below condition');
    //                return;
    //            }
    //        });
    //    } else {
    //        $('#location-group').addClass('has-error');
    //        $('#dvLocationErrorMsg').removeClass('hidden');
    //        return;
    //    }
    //}

    $('label.iYASerchResultItem').each(function (index, element) {
        var formattedAddress = getGoogleFormattedAddress($(this).data('latitude'), $(this).data('longitude'));
        $(this).text(formattedAddress);
    });

    function getGoogleFormattedAddress(latitude, longitude) {
        var latitudeLongitude = latitude + ',' + longitude;
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            data: { latlng: encodeURI(latitudeLongitude) },
            success: function (data) {
                try {
                    if (data.status == "OK") {
                        return data.results[0].formatted_address;
                    }
                } catch (ex) {
                    return 'error';
                }
            },
            error: function () {
                return 'error';
            }
        });
    }

    $('#btnMiniSearch').on('click', function (evt) {
        evt.preventDefault();
        miniLocationLookupAndSearch();
    });


    function miniLocationLookupAndSearch() {
        var location = $('#txtSearchKeyWord').val();

        if (location) {
            $.ajax({
                url: '//maps.googleapis.com/maps/api/geocode/json',
                data: { address: location, components: "country:GB", sensor: true },
                success: function (data) {
                    try {
                        if (data.status == "OK") {
                            $('#hdnSearchLatitude').val(data.results[data.results.length - 1].geometry.location.lat);
                            $('#hdnSearchLongitude').val(data.results[data.results.length - 1].geometry.location.lng);
                            $('#inYourAreaSearchPage').submit();
                            return;
                        }
                    } catch (ex) {
                        miniLocationErrorMessage();
                    }
                },
                error: function () {
                    miniLocationErrorMessage();
                }
            });
        } else {
            miniLocationErrorMessage();
        }
    }

    function miniLocationErrorMessage() {
        $('#location-group').addClass('has-error');
        $('#dvLocationErrorMsg').removeClass('hidden');
        return;
    }

});
