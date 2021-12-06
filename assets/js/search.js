function ajaxCall(form){
    $.ajax({
    type:'post',
    url:'/search/tag',
    data: $('#'+form).serialize(),
    success: function(data){
        console.log(data.data);
        for(let post of data.data.data.tagFeed.items){
          let img = `<img src="https://miro.medium.com/max/1000/${post.post.previewImage.id}" class="card-img-top" alt="..." style="min-height:60%; max-height:60%">`;
          let altImg = `<img src="/images/bulb.png" class="card-img-top" alt="..." style="max-height:60%"></img>`;
          let card = `<div class="card">
          <a style="display:none">${post.post.mediumUrl}</a>
            <div id="card-author" class="card-footer">
            <small class="text-muted">Creator: ${post.post.creator.name}</small>
            </div>
            ${post.post.previewImage.id ? img:altImg}
            <div class="card-body">
            <h5 class="card-title">${post.post.title}</h5>
              <p class="card-text">${post.post.previewContent.subtitle}</p>
              </div>
              <form id="fetch-blog" action="/fetch/blog" target="_blank" method="POST">
              <input type="hidden" value="${post.post.mediumUrl}" name="url">
              <button type="submit">Fetch Blog</button>
              </form>
              <div class="card-footer">
              <small class="text-muted">Published 3 mins ago | ${Math.floor(post.post.readingTime)+1} min Read</small>
              </div>
              </div>`
              $('#card-list').append(card)
            }
        $('#next').val(data.data.data.tagFeed.pagingInfo.next.to)

          // $('#fetch-blog').submit((e)=>{
          //     e.preventDefault();

          //     $.ajax({
          //         type:'post',
          //         url:'/fetch/blog',
          //         data: $('#fetch-blog').serialize(),
          //         success: function(data){
          //             console.log(data);
          //         },
          //         error: function(error){
          //             console.log(error.responseText);
          //         }
          //     })
          //     // event.preventDefault();
          //     console.log("here")
          // })
        // $('#layout-main').append(data.contentHTML)
    },
    error: function(error){
        console.log(error.responseText);
    }
  })
}

$('#search-form').submit(function(e){
  $('#searchTag').val($('#searchBox').val())
    e.preventDefault();
  $('#card-list').empty();
    ajaxCall('search-form');
})
$('#next-blogs').submit(function(e){
  e.preventDefault();
  $('#card-list').empty();
  ajaxCall('next-blogs');
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