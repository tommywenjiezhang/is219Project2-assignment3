(function ($) {
    $('#citiesTable').DataTable();
    $(".submit_delete").click(function(event){
        let id = $(this).parent().prop('name');
        console.log(id)
        $.ajax({
            method:"POST",
            url:"/"+id+"?_method=DELETE",
            success: (data,status) =>{
                window.location.reload()
            }
        })
        }



        )


})(jQuery);



