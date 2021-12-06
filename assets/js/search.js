$('#search-form').submit(function(e){
    e.preventDefault();
    $.ajax({
        type:'post',
        url:'/search/tag',
        data: $('#search-form').serialize(),
        success: function(data){
            console.log(data.data);
            for(let post of data.data.data.tagFeed.items){
                let card = `<div class="card">
                <a style="display:none">${post.post.mediumUrl}</a>
                <div class="card-footer">
                  <small class="text-muted">Creator: ${post.post.creator.name}</small>
                </div>
                <div class="card-body">
                  <h5 class="card-title">${post.post.title}</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                <form id="fetch-blog" action="">
                    <input type="hidden" value="${post.post.mediumUrl}" name="url">
                    <button type="submit">Fetch Blog</button>
                </form>
                <div class="card-footer">
                  <small class="text-muted">Published 3 mins ago | ${Math.floor(post.post.readingTime)+1} min Read</small>
                </div>
              </div>`
                $('#card-list').append(card)
                $('#fetch-blog').submit((e)=>{
                    e.preventDefault();
    
                    $.ajax({
                        type:'post',
                        url:'/fetch/blog',
                        data: $('#fetch-blog').serialize(),
                        success: function(data){
                            console.log(data);
                        },
                        error: function(error){
                            console.log(error.responseText);
                        }
                    })
                    // event.preventDefault();
                    console.log("here")
                })
            }
            // $('#layout-main').append(data.contentHTML)
        },
        error: function(error){
            console.log(error.responseText);
        }
    })
})

{/* <div class="card text-center">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  <div class="card-footer text-muted">
    2 days ago
  </div>
</div> */}

// $('#fetch-blog').click((event)=>{
//     // event.preventDefault();
//     console.log("here")
// })