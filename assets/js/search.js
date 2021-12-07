function parseDate(date)
{
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    // parsedDate = dd + '/' + mm + '/' + yyyy + ` ${hour(0)}:${minute(0)}: ${second(0)}`;
    let parsedDate = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + mins + ':' + secs;
    return parsedDate;
}
function ajaxCall(tag, next){
  console.log(`hello/friend/${tag}&next=${next}`)
  console.log(tag)
    $.ajax({
    type:'get',
    url: `/search/tag/?tag=${tag}&next=${next}`,
    // data: $('#'+form).serialize(),
    success: function(data){
        console.log(data.data);
        if(Array.isArray(data.data)){
          // console.log("hello");
          $('#not-found').css("display", "block");
          data.data.forEach((i)=>{

            let button = ` <button id="next-blogs-button"class="search-btn suggested-btn" value="${i}">${i}
            </button>`
            $(' .suggested-tag-div').append(button)
          })
          let suggestedBtn = document.querySelectorAll(".suggested-btn");
          for(let i=0; i<suggestedBtn.length; i++){
            suggestedBtn[i].addEventListener('click', function(){
                $('#not-found').css("display", "none");
                $('#searchBox').val(suggestedBtn[i].value)
                ajaxCall(suggestedBtn[i].value);
            })
          }
        }
        else{

          for(let post of data.data.data.tagFeed.items){
            let img = `<img src="https://miro.medium.com/max/1000/${post.post.previewImage.id}" class="card-img-top" alt="..." style="min-height:60%; max-height:60%">`;
            let altImg = `<img src="/images/bulb.png" class="card-img-top" alt="..." style="max-height:60%"></img>`;
            let date = new Date(post.post.firstPublishedAt)
            date = date.getUTCDate() + '-' + (date.getUTCMonth() + 1)+ '-' + date.getUTCFullYear();
            let card = `<div class="card">
            <a style="display:none">${post.post.mediumUrl}</a>
              <div id="card-author" class="card-footer">
              <small class="text-muted">Creator: ${post.post.creator.name}</small>
              <small class="text-muted" style="float:right"><i class="fas fa-heart"></i>&nbsp;:&nbsp;${post.post.clapCount}&nbsp;<i class="fas fa-thumbs-up"></i>&nbsp;:&nbsp;${post.post.voterCount}&nbsp; <i class="fas fa-comments"></i>&nbsp;:&nbsp;${post.post.postResponses.count}</small>
  
              </div>
              ${post.post.previewImage.id ? img:altImg}
              <div class="card-body">
              <h5 class="card-title">${post.post.title}</h5>
                <p class="card-text">${post.post.previewContent.subtitle}</p>
                </div>
                <form id="fetch-blog" action="/fetch/blog" target="_blank" method="POST">
                <input type="hidden" value="${post.post.clapCount}" name="clapCount">
                <input type="hidden" value="${post.post.creator.name}" name="creator">
                <input type="hidden" value="${date}" name="date">
                <input type="hidden" value=" ${Math.floor(post.post.readingTime)+1}" name="readingTime">
                <input type="hidden" value="https://miro.medium.com/max/1000/${post.post.previewImage.id}" name="creatorImageUrl">
                <input type="hidden" value="${post.post.id}" name="postId">
                <input type="hidden" value="${post.post.mediumUrl}" name="url">
                <button type="submit">Fetch Blog</button>
                </form>
                <div class="card-footer">
                <small class="text-muted">Publishing Date: ${date} </small>
                <small style="float:right"> ${Math.floor(post.post.readingTime)+1} min Read</small>
                </div>
                </div>`
                $('#card-list').append(card)
              }
          $('#next').val(data.data.data.tagFeed.pagingInfo.next.to)
          $('#next-blogs').css("display", "block");
  
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
        }
    },
    error: function(error){
        console.log(error.responseText);
    }
  })
}

$('#search-button').click(function(e){
  $('#card-list').empty();
  ajaxCall($('#searchBox').val());
})
$('#next-blogs-button').click(function(e){
  $('#card-list').empty();
  ajaxCall($('#searchBox').val(), $('#next').val());
})
// $('#search-form').submit(function(e){
//   $('#searchTag').val($('#searchBox').val())
//     e.preventDefault();
//   $('#card-list').empty();
//     ajaxCall('search-form');
// })
// let tagForms = document.querySelectorAll(".next-blog")
// tagForms.forEach((i)=>{
//   // i.submit(function(e){
//   //   e.preventDefault();
//   //   $('#card-list').empty();
//   //   ajaxCall('next-blogs');
//   // })
//   for(let i=0; i<tagForms.length; i++){
//     tagForms[i].submit(function(e){
//         e.preventDefault();
//         $('#card-list').empty();
//         ajaxCall('next-blogs');
//       })
//   }
//   console.log(i)
// })
// $('#next-blogs').submit(function(e){
//   e.preventDefault();
//   $('#card-list').empty();
//   ajaxCall('next-blogs');
// })
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