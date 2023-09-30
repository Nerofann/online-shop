$(function() {
    $('#form-register').on('submit', function(evt) {
        evt.preventDefault();

        
        $.ajax({
            url: '/register',
            type: 'POST',
            dataType: 'json',
            data: $(this).serialize()
        }).done(function(resp) {
            Swal.fire(
                resp.title, 
                resp.message, 
                resp.type
            ).then(function() {
                if(resp.status) {
                    location.href = '/login';
                }
            });
        })
    });
});