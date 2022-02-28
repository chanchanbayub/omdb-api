
$("#search-button").click(function(e) {
    e.preventDefault();
    $("#movie-list").html('');
    $.ajax({
        url: "http://www.omdbapi.com/",
        type: "GET",
        dataType: "JSON",
        data: {
            "apikey" : "79885cff",
            "s" : $("#search-movie").val()
        },
        success: function(response) {
           if (response.Response === "True") {
                let movies = response.Search;
                $.each(movies, function(e, data) {
                    $("#movie-list").append(
                        `<div class="col-md-4">
                         <div class="container">
                            <div class="card mb-2">
                                <img src="${data.Poster}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h6 class="card-subtitle mb-2 text-muted">${data.Type}</h6>
                                <h5 class="card-title">${data.Title}</h5>
                                <p class="card-text">${data.Year}</p>
                                <a href="#" class="card-link" data-toggle="modal" data-id="${data.imdbID}" data-target="#exampleModal" id="see-detail">See Detail</a>
                            </div>
                      </div>
                        </div> 
                   </div>`
                    );
                });
           } else {
               $("#movie-list").append(
                   `<div class="col">
                        <div class="container">
                            <h1 class="text-center"> ${response.Error} </h1>
                        </div> 
                   </div>`
               );
           }
        }
    });
    $("#search-movie").val('');
});

$("#movie-list").on('click','#see-detail',function(e) {
    let id = $(this).data('id');
    $("#modal-poster").html('');
    $.ajax({
        url: "http://www.omdbapi.com/",
        type: "GET",
        dataType: "JSON",
        data: {
            "apikey" : "79885cff",
            "i" : id
        },
        success:function(response) {
            // console.log(response);
            $(".modal-title").html(`${response.Title}`);
            $("#modal-poster").append(
                `<div class="container-fluid">
                <div class="row">
                  <div class="col-md-6">
                  <div class="card">
                      <img src="${response.Poster}" class="card-img-top" alt="...">
                    </div>
                  </div>
                  <div class="col-md-6">
                  <ul class="list-group">
                    <li class="list-group-item">Title : ${response.Title}</li>
                    <li class="list-group-item">Writter : ${response.Writer}</li>
                    <li class="list-group-item">Genre : ${response.Genre}</li>
                    <li class="list-group-item">Type : ${response.Type}</li>
                    <li class="list-group-item">Year : ${response.Year}</li>
                  </ul>
                  </div>
                </div>
              </div>`
            );
        }
    })
}); 
