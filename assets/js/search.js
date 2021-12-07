function parseDate(date)
{
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    // parsedDate = dd + '/' + mm + '/' + yyyy + ` ${hour(0)}:${minute(0)}: ${second(0)}`;
    let parsedDate = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + mins + ':' + secs;
    return parsedDate;
}

function insertTagButtons(dataArray, divClass){
  // console.log(dataArray)
  // $('.'+divClass).empty();
  dataArray.forEach((i)=>{
      let button = ` <button id="next-blogs-button"class="search-btn suggested-btn" value="${i}">${i}</button>`
      $('.'+divClass).append(button)
  })
  let suggestedBtn = document.querySelectorAll(".suggested-btn");
  for(let i=0; i<suggestedBtn.length; i++){
    suggestedBtn[i].addEventListener('click', function(){
        $('#not-found').css("display", "none");
        $('#card-list').empty();
        $('.'+divClass).empty();
        $('#searchBox').val(suggestedBtn[i].value)
        ajaxCall(suggestedBtn[i].value);
    })
  }
}

function ajaxCall(tag, next){
  // console.log(tag)
    $.ajax({
    type:'get',
    url: `/search/tag/?tag=${tag}&next=${next}`,
    success: function(data){
        // console.log(data);
        if(data.db){
          // console.log("working");
          // console.log(data)
          $('.search-tag-div').empty();
          for(let post of data.data){
            let img = `<img src="https://miro.medium.com/max/1000/${post.imageId}" class="card-img-top" alt="..." style="min-height:60%; max-height:60%">`;
            let altImg = `<img src="/images/bulb.png" class="card-img-top" alt="..." style="max-height:60%"></img>`;
            let date = new Date(parseInt(post.firstPublishedAt))
            console.log(date);
            date = date.getUTCDate() + '-' + (date.getUTCMonth() + 1)+ '-' + date.getUTCFullYear();
            let card = `<div class="card">
            <a style="display:none">${post.mediumUrl}</a>
              <div id="card-author" class="card-footer">
              <small class="text-muted">Creator: ${post.creatorName}</small>
              <small class="text-muted" style="float:right"><i class="fas fa-heart"></i>&nbsp;:&nbsp;${post.clapCount}&nbsp;<i class="fas fa-thumbs-up"></i>&nbsp;:&nbsp;${post.voterCount}&nbsp; <i class="fas fa-comments"></i>&nbsp;:&nbsp;${post.responseCount}</small>
  
              </div>
              ${post.imageId ? img:altImg}
              <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.contentPreview}</p>
                </div>
                <form id="fetch-blog" action="/fetch/blog" target="_blank" method="POST">
                <input type="hidden" value="${post.clapCount}" name="clapCount">
                <input type="hidden" value="${post.creatorName}" name="creator">
                <input type="hidden" value="${date}" name="date">
                <input type="hidden" value=" ${Math.floor(post.readingTime)+1}" name="readingTime">
                <input type="hidden" value="https://miro.medium.com/max/1000/${post.imageId}" name="creatorImageUrl">
                <input type="hidden" value="${post.postId}" name="postId">
                <input type="hidden" value="${post.mediumUrl}" name="url">
                <button type="submit" class="search-btn" style="width:80%;">Fetch Blog</button>
                </form>
                <div class="card-footer">
                <small class="text-muted">Publishing Date: ${date} </small>
                <small style="float:right"> ${Math.floor(post.readingTime)+1} min Read</small>
                </div>
                </div>`
                $('#card-list').append(card)
          }
          $(' .search-tag-div').css("display", "flex");
          insertTagButtons(data.existingTag, 'search-tag-div');    
          console.log(data.next)
          $('#next').val(data.next)
          $('#next-blogs').css("display", "block");
          return;
        }
        else if(Array.isArray(data.data)){
          $('#not-found').css("display", "block");
          insertTagButtons(data.data, 'suggested-tag-div');
          return;
        }
        else{
            // console.log(data.existingTag)
            for(let post of data.data.data.tagFeed.items)
            {
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
                  <button type="submit" class="search-btn" style="width:80%;">Fetch Blog</button>
                  </form>
                  <div class="card-footer">
                  <small class="text-muted">Publishing Date: ${date} </small>
                  <small style="float:right"> ${Math.floor(post.post.readingTime)+1} min Read</small>
                  </div>
                  </div>`
              $('#card-list').append(card)
            }
          $('.search-tag-div').empty();
          $(' .search-tag-div').css("display", "flex");
          insertTagButtons(data.existingTag, 'search-tag-div');
          $('#next').val(data.data.data.tagFeed.pagingInfo.next.to)
          $('#next-blogs').css("display", "block");
          return;             
        }
    },
    error: function(error){
        console.log(error.responseText);
    }
  })
}

$('#search-button').click(function(e){
  $('#not-found').css("display", "none");
  $('#card-list').empty();
  ajaxCall($('#searchBox').val());
  // $('footer').css("bottom", '0')
})

$('#next-blogs-button').click(function(e){
  $('#not-found').css("display", "none");
  $('#card-list').empty();
  ajaxCall($('#searchBox').val(), $('#next').val());
})
