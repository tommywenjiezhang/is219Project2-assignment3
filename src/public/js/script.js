(function ($) {
    $('#citiesTable').DataTable();


    $(".create_new").hover(function() {
        $( this ).append( $( "<span>  Create new City</span>" ) );
    }, function() {
        $( this ).find( "span" ).last().remove();
    })
    $(".submit_delete").click(function(event){
            let id = $(this).parent().prop('name');
            console.log(id)
            $.ajax({
                method:"POST",
                url:"/city/"+id+"?_method=DELETE",
                success: (data,status) =>{
                 window.location.reload()
                }
            })
        }
    )

})(jQuery);


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

