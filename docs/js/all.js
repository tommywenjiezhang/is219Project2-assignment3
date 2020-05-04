(function ($) {
    $('#citiesTable').dataTable({
        "ajax": "http://localhost:9080/api/v1/cities",
        "columns": [
            { "data": "id" },
            { "data": "fldName" },
            { "data": "fldLat" },
            { "data": "fldLong" },
            { "data": "fldCountry" },
            { "data": "fldAbbreviation" },
            { "data": "fldCapitalStatus" },
            { "data": "fldPopulation" }
        ]
    });
})(jQuery);