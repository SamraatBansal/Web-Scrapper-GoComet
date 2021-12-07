const { post } = require('request');
var request = require('request-promise');
const cheerio = require("cheerio")
const cardContent = require('../models/cardContent')
const SearchHistory = require('../models/SearchHistory')

module.exports.searchTag=  async function(req, res){
  // console.log(req.body)
  console.log(req.query);
  req.query.tag = req.query.tag.replace(/\s+/g,"-");
  req.query.tag = req.query.tag.toLowerCase();
  let exisitingTag = await SearchHistory.findOne({tag:req.query.tag})
                      .populate({
                        path:'cards'
                      });
                      
                      let searchTag = await SearchHistory.find({}).sort('-createdAt')
                      let searchTagsArray = [];
                      for(let i of searchTag){
                        searchTagsArray.push(i.tag);
                      }  
            // console.log(exisitingTag)        
  if(exisitingTag && req.query.next=='undefined')
  {
      return res.status(200).json({
        data: exisitingTag.cards,
        db: true,
        existingTag: searchTagsArray,
        next: exisitingTag.next,
        message: "Fetched from DB"
    });
  }

  if(req.query.next!='undefined')
  {
      req.query.next = req.query.next.toString();
      var variables = {"tagSlug":req.query.tag,"mode":"HOT","paging":{"to":req.query.next,"limit":10,}}
      console.log(variables)
  }
  else{
      var variables = {"tagSlug":req.query.tag,"mode":"HOT","paging":{"limit":10}}
  }
  // console.log(req.body.searchTag)
  if(req.xhr){
      var options = {
      'method': 'POST',
      'url': 'https://medium.com/_/graphql',
      'headers': {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          query: `query TagFeedQuery($paging: PagingOptions, $tagSlug: String, $mode: TagFeedMode) {
        tagFeed(paging: $paging, tagSlug: $tagSlug, mode: $mode) {
          items {
            ... on TagFeedItem {
              feedId
              reason
              moduleSourceEncoding
              postProviderExplanation {
                reason
                topic {
                  name
                  __typename
                }
                __typename
              }
              post {
                ...TagFeedItem_post
                __typename
              }
              __typename
            }
            __typename
          }
          pagingInfo {
            next {
              limit
              to
              __typename
            }
            __typename
          }
          __typename
        }
      }
      
      fragment TagFeedItem_post on Post {
        id
        title
        mediumUrl
        creator {
          id
          __typename
        }
        previewContent {
          subtitle
          __typename
        }
        previewImage {
          id
          __typename
        }
        firstPublishedAt
        voters(paging: {limit: 3}) {
          items {
            user {
              ...FacePile_user
              __typename
            }
            __typename
          }
          __typename
        }
        postResponses {
          count
          __typename
        }
        allowResponses
        isLimitedState
        ...MultiVote_post
        ...PostPreviewAvatar_post
        ...BookmarkButton_post
        ...CreatorActionOverflowPopover_post
        ...PostListingReadingTime_post
        ...PostPresentationTracker_post
        ...PostFooterSocialPopover_post
        ...usePostUrl_post
        __typename
      }
      
      fragment MultiVote_post on Post {
        id
        clapCount
        creator {
          id
          ...SusiClickable_user
          __typename
        }
        isPublished
        ...SusiClickable_post
        collection {
          id
          slug
          __typename
        }
        isLimitedState
        ...MultiVoteCount_post
        __typename
      }
      
      fragment SusiClickable_post on Post {
        id
        mediumUrl
        ...SusiContainer_post
        __typename
      }
      
      fragment SusiContainer_post on Post {
        id
        __typename
      }
      
      fragment SusiClickable_user on User {
        ...SusiContainer_user
        __typename
        id
      }
      
      fragment SusiContainer_user on User {
        ...SignInOptions_user
        ...SignUpOptions_user
        __typename
        id
      }
      
      fragment SignInOptions_user on User {
        id
        name
        __typename
      }
      
      fragment SignUpOptions_user on User {
        id
        name
        __typename
      }
      
      fragment MultiVoteCount_post on Post {
        id
        ...PostVotersNetwork_post
        __typename
      }
      
      fragment PostVotersNetwork_post on Post {
        id
        voterCount
        recommenders {
          name
          __typename
        }
        __typename
      }
      
      fragment PostPreviewAvatar_post on Post {
        __typename
        id
        collection {
          id
          name
          ...CollectionAvatar_collection
          __typename
        }
        creator {
          id
          username
          name
          ...UserAvatar_user
          ...userUrl_user
          __typename
        }
      }
      
      fragment CollectionAvatar_collection on Collection {
        name
        avatar {
          id
          __typename
        }
        ...collectionUrl_collection
        __typename
        id
      }
      
      fragment collectionUrl_collection on Collection {
        id
        domain
        slug
        __typename
      }
      
      fragment UserAvatar_user on User {
        __typename
        id
        imageId
        mediumMemberAt
        name
        username
        ...userUrl_user
      }
      
      fragment userUrl_user on User {
        __typename
        id
        customDomainState {
          live {
            domain
            __typename
          }
          __typename
        }
        hasSubdomain
        username
      }
      
      fragment BookmarkButton_post on Post {
        visibility
        ...SusiClickable_post
        ...AddToCatalogBookmarkButton_post
        __typename
        id
      }
      
      fragment AddToCatalogBookmarkButton_post on Post {
        ...AddToCatalogBase_post
        __typename
        id
      }
      
      fragment AddToCatalogBase_post on Post {
        id
        viewerEdge {
          catalogsConnection {
            catalogsContainingThis(type: LISTS) {
              catalogId
              catalogItemIds
              __typename
            }
            predefinedContainingThis {
              catalogId
              predefined
              catalogItemIds
              __typename
            }
            __typename
          }
          ...editCatalogItemsMutation_postViewerEdge
          ...useAddItemToPredefinedCatalog_postViewerEdge
          __typename
          id
        }
        ...WithToggleInsideCatalog_post
        __typename
      }
      
      fragment useAddItemToPredefinedCatalog_postViewerEdge on PostViewerEdge {
        id
        catalogsConnection {
          predefinedContainingThis {
            catalogId
            version
            predefined
            catalogItemIds
            __typename
          }
          __typename
        }
        __typename
      }
      
      fragment editCatalogItemsMutation_postViewerEdge on PostViewerEdge {
        id
        catalogsConnection {
          catalogsContainingThis(type: LISTS) {
            catalogId
            version
            catalogItemIds
            __typename
          }
          predefinedContainingThis {
            catalogId
            predefined
            version
            catalogItemIds
            __typename
          }
          __typename
        }
        __typename
      }
      
      fragment WithToggleInsideCatalog_post on Post {
        id
        viewerEdge {
          catalogsConnection {
            catalogsContainingThis(type: LISTS) {
              catalogId
              __typename
            }
            predefinedContainingThis {
              predefined
              __typename
            }
            __typename
          }
          __typename
          id
        }
        __typename
      }
      
      fragment CreatorActionOverflowPopover_post on Post {
        allowResponses
        id
        statusForCollection
        isLocked
        isPublished
        clapCount
        mediumUrl
        pinnedAt
        pinnedByCreatorAt
        curationEligibleAt
        mediumUrl
        responseDistribution
        visibility
        ...useIsPinnedInContext_post
        pendingCollection {
          id
          name
          creator {
            id
            __typename
          }
          avatar {
            id
            __typename
          }
          domain
          slug
          __typename
        }
        creator {
          id
          ...MutePopoverOptions_creator
          ...auroraHooks_publisher
          __typename
        }
        collection {
          id
          name
          creator {
            id
            __typename
          }
          avatar {
            id
            __typename
          }
          domain
          slug
          ...MutePopoverOptions_collection
          ...auroraHooks_publisher
          __typename
        }
        ...ClapMutation_post
        ...NewsletterV3EmailToSubscribersMenuItem_post
        __typename
      }
      
      fragment MutePopoverOptions_creator on User {
        id
        __typename
      }
      
      fragment MutePopoverOptions_collection on Collection {
        id
        __typename
      }
      
      fragment ClapMutation_post on Post {
        __typename
        id
        clapCount
        ...MultiVoteCount_post
      }
      
      fragment useIsPinnedInContext_post on Post {
        id
        collection {
          id
          __typename
        }
        pendingCollection {
          id
          __typename
        }
        pinnedAt
        pinnedByCreatorAt
        __typename
      }
      
      fragment auroraHooks_publisher on Publisher {
        __typename
        ... on Collection {
          isAuroraEligible
          isAuroraVisible
          viewerEdge {
            id
            isEditor
            __typename
          }
          __typename
          id
        }
        ... on User {
          isAuroraVisible
          __typename
          id
        }
      }
      
      fragment NewsletterV3EmailToSubscribersMenuItem_post on Post {
        id
        creator {
          id
          newsletterV3 {
            id
            subscribersCount
            __typename
          }
          __typename
        }
        isPublishToEmail
        isNewsletter
        __typename
      }
      
      fragment FacePile_user on User {
        __typename
        id
        imageId
        name
      }
      
      fragment PostListingReadingTime_post on Post {
        readingTime
        __typename
        id
      }
      
      fragment PostPresentationTracker_post on Post {
        id
        visibility
        previewContent {
          isFullContent
          __typename
        }
        collection {
          id
          slug
          __typename
        }
        __typename
      }
      
      fragment PostFooterSocialPopover_post on Post {
        id
        mediumUrl
        title
        ...SharePostButton_post
        __typename
      }
      
      fragment SharePostButton_post on Post {
        id
        __typename
      }
      
      fragment usePostUrl_post on Post {
        id
        creator {
          id
          customDomainState {
            live {
              domain
              __typename
            }
            __typename
          }
          hasSubdomain
          username
          __typename
        }
        collection {
          id
          domain
          slug
          __typename
        }
        isSeries
        mediumUrl
        sequence {
          slug
          __typename
        }
        uniqueSlug
        __typename
      }`,
          variables: variables
        })
      };
      
      request(options)
          .then(async function (response) {
              let data = JSON.parse(response);
              var contentHTML;
              console.log(data);
              if(!data.data.tagFeed){
                  let options = {
                      'url': `https://medium.com/search/tags?q=${req.query.tag}`,
                      transform: body => cheerio.load(body)
                  }
                  let tagArray = [];
                      await request(options)
                      .then(function($){
                          console.log("*****\n");
                          
                          $(' .tags').children().each((index, elem)=>{
                              console.log($(elem).text())
                              tagArray.push($(elem).text());
                          })
                      })
                      return res.status(200).json({
                        data: tagArray,
                        message: "No result found! Try this instead"
                    }); 
              }
              let checkExist = await SearchHistory.findOne({tag:req.query.tag});
              if(!checkExist){

                let search = await SearchHistory.create(req.query);
                for(let card of data.data.tagFeed.items){
                  let doc = await cardContent.create(card.post);
                  doc.imageId = card.post.previewImage.id;
                  doc.creatorName = card.post.creator.name;
                  doc.contentPreview = card.post.previewContent.subtitle;
                  doc.responseCount = card.post.postResponses.count;
                  doc.postId = card.post.id;
                  await doc.save();
                  await search.cards.push(doc.id);
                  search.next = data.data.tagFeed.pagingInfo.next.to;
                  await search.save();
                  // console.log(doc+"$$$$$$$");
                }
              }
              let searchTag = await SearchHistory.find({}).sort('-createdAt')
              let existingTag = [];
              for(let i of searchTag){
                  existingTag.push(i.tag);
              }
              return res.status(200).json({
                  data,
                  existingTag,
                  message: "Search Completed"
              });
          })
          .catch((err)=>{
              console.log(err);
          });

  }
}

module.exports.fetchBlog = async function(req, res){
    // console.log(req.body)
    let blogDetails = req.body;
    let crawlOptions = {
        'url': req.body.url,
        transform: body => cheerio.load(body)
    }
    var contentHTML;
    const start = Date.now();
    let time;
    var responsesArr = [];

        await request(crawlOptions)
        .then(async function($){
          time = (Date.now()-start)/1000;  
          console.log("*****\n");

          var options = 
          {
            'method': 'POST',
            'url': 'https://medium.com/_/graphql',
            'headers': {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `query PagedThreadedPostResponsesQuery($postId: ID!, $postResponsesPaging: PagingOptions, $sortType: ResponseSortType) {
                  post(id: $postId) {
                    id
                    ...CloseDiscussion_post
                    responsesCount
                    postResponses {
                      count
                      __typename
                    }
                    responseRootPost {
                      post {
                        id
                        __typename
                      }
                      responseDepth
                      __typename
                    }
                    threadedPostResponses(paging: $postResponsesPaging, sortType: $sortType) {
                      autoExpandedPostIds
                      pagingInfo {
                        next {
                          limit
                          to
                          __typename
                        }
                        __typename
                      }
                      posts {
                        ... on Post {
                          ...StoryResponse_threadedStoryResponse_post
                          ...SimpleResponse_threadedSimpleResponse_post
                          ...SimpleResponse_threadedSimpleResponse_defaultPostResponses
                          __typename
                        }
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                }
                
                fragment CloseDiscussion_post on Post {
                  id
                  responsesLocked
                  isLockedResponse
                  __typename
                }
                
                fragment SimpleResponse_threadedSimpleResponse_post on Post {
                  id
                  createdAt
                  firstPublishedAt
                  latestPublishedAt
                  title
                  creator {
                    id
                    name
                    username
                    imageId
                    mediumMemberAt
                    viewerEdge {
                      id
                      isBlocking
                      __typename
                    }
                    ...userUrl_user
                    ...UserMentionTooltip_user
                    __typename
                  }
                  clapCount
                  viewerEdge {
                    id
                    clapCount
                    __typename
                  }
                  isPublished
                  voterCount
                  responsesCount
                  postResponses {
                    count
                    __typename
                  }
                  allowResponses
                  latestRev
                  recommenders {
                    id
                    name
                    __typename
                  }
                  mediumUrl
                  content {
                    bodyModel {
                      paragraphs {
                        text
                        __typename
                      }
                      ...getSlateBodyFromPostBodyModel_bodyModel
                      __typename
                    }
                    __typename
                  }
                  collection {
                    id
                    slug
                    __typename
                  }
                  isLimitedState
                  inResponseToType
                  responseDistribution
                  ...PostPresentationTracker_post
                  ...PostScrollTracker_post
                  ...ResponseQuote_post
                  __typename
                }
                
                fragment PostPresentationTracker_post on Post {
                  id
                  visibility
                  previewContent {
                    isFullContent
                    __typename
                  }
                  collection {
                    id
                    slug
                    __typename
                  }
                  __typename
                }
                
                fragment PostScrollTracker_post on Post {
                  id
                  collection {
                    id
                    __typename
                  }
                  sequence {
                    sequenceId
                    __typename
                  }
                  __typename
                }
                
                fragment ResponseQuote_post on Post {
                  inResponseToMediaResource {
                    href
                    mediumQuote {
                      quoteId
                      startOffset
                      endOffset
                      paragraphs {
                        ...TextParagraph_paragraph
                        __typename
                      }
                      ...buildQuotePreviewParagraph_quote
                      __typename
                      id
                    }
                    __typename
                    id
                  }
                  __typename
                  id
                }
                
                fragment buildQuotePreviewParagraph_quote on Quote {
                  paragraphs {
                    id
                    text
                    type
                    markups {
                      end
                      start
                      type
                      __typename
                    }
                    __typename
                  }
                  startOffset
                  endOffset
                  __typename
                  id
                }
                
                fragment TextParagraph_paragraph on Paragraph {
                  type
                  hasDropCap
                  ...Markups_paragraph
                  ...ParagraphRefsMapContext_paragraph
                  __typename
                  id
                }
                
                fragment Markups_paragraph on Paragraph {
                  name
                  text
                  hasDropCap
                  dropCapImage {
                    ...MarkupNode_data_dropCapImage
                    __typename
                    id
                  }
                  markups {
                    type
                    start
                    end
                    href
                    anchorType
                    userId
                    linkMetadata {
                      httpStatus
                      __typename
                    }
                    __typename
                  }
                  __typename
                  id
                }
                
                fragment MarkupNode_data_dropCapImage on ImageMetadata {
                  ...DropCap_image
                  __typename
                  id
                }
                
                fragment DropCap_image on ImageMetadata {
                  id
                  originalHeight
                  originalWidth
                  __typename
                }
                
                fragment ParagraphRefsMapContext_paragraph on Paragraph {
                  id
                  name
                  text
                  __typename
                }
                
                fragment getSlateBodyFromPostBodyModel_bodyModel on RichText {
                  paragraphs {
                    id
                    name
                    text
                    type
                    markups {
                      type
                      start
                      end
                      href
                      anchorType
                      userId
                      linkMetadata {
                        httpStatus
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                
                fragment userUrl_user on User {
                  __typename
                  id
                  customDomainState {
                    live {
                      domain
                      __typename
                    }
                    __typename
                  }
                  hasSubdomain
                  username
                }
                
                fragment UserMentionTooltip_user on User {
                  id
                  name
                  username
                  bio
                  imageId
                  mediumMemberAt
                  ...UserAvatar_user
                  ...UserFollowButton_user
                  __typename
                }
                
                fragment UserAvatar_user on User {
                  __typename
                  id
                  imageId
                  mediumMemberAt
                  name
                  username
                  ...userUrl_user
                }
                
                fragment UserFollowButton_user on User {
                  ...UserFollowButtonSignedIn_user
                  ...UserFollowButtonSignedOut_user
                  __typename
                  id
                }
                
                fragment UserFollowButtonSignedIn_user on User {
                  id
                  __typename
                }
                
                fragment UserFollowButtonSignedOut_user on User {
                  id
                  ...SusiClickable_user
                  __typename
                }
                
                fragment SusiClickable_user on User {
                  ...SusiContainer_user
                  __typename
                  id
                }
                
                fragment SusiContainer_user on User {
                  ...SignInOptions_user
                  ...SignUpOptions_user
                  __typename
                  id
                }
                
                fragment SignInOptions_user on User {
                  id
                  name
                  __typename
                }
                
                fragment SignUpOptions_user on User {
                  id
                  name
                  __typename
                }
                
                fragment StoryResponse_threadedStoryResponse_post on Post {
                  id
                  responsesCount
                  postResponses {
                    count
                    __typename
                  }
                  creator {
                    viewerEdge {
                      id
                      isBlocking
                      __typename
                    }
                    ...userUrl_user
                    ...UserMentionTooltip_user
                    __typename
                    id
                  }
                  clapCount
                  previewContent {
                    bodyModel {
                      paragraphs {
                        text
                        type
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  responseDistribution
                  ...PostPresentationTracker_post
                  ...ResponseHeader_postHacky
                  ...ResponseQuote_post
                  __typename
                }
                
                fragment ResponseHeader_postHacky on Post {
                  createdAt
                  creator {
                    ...UserAvatar_user
                    viewerEdge {
                      id
                      isBlocking
                      __typename
                    }
                    __typename
                    id
                  }
                  mediumUrl
                  __typename
                  id
                }
                
                fragment SimpleResponse_threadedSimpleResponse_defaultPostResponses on Post {
                  responsesCount
                  postResponses {
                    count
                    __typename
                  }
                  threadedPostResponses(paging: {limit: 10}, sortType: $sortType) {
                    __typename
                    autoExpandedPostIds
                    pagingInfo {
                      next {
                        limit
                        to
                        __typename
                      }
                      __typename
                    }
                    posts {
                      ... on Post {
                        ...StoryResponse_threadedStoryResponse_post
                        ...SimpleResponse_threadedSimpleResponse_post
                        __typename
                        id
                      }
                      __typename
                    }
                  }
                  __typename
                  id
                }`,
                variables: {
                  "postId": req.body.postId,
                  "postResponsesPaging": {
                    "limit": 10
                  },
                  "sortType": "TOP"
                }
              })
          };
          await request(options)
          .then(async function (response) {
              let data = JSON.parse(response);
              for(let post of data.data.post.threadedPostResponses.posts){
                let creatorName = post.creator.name;
                let creatorImage = post.creator.imageId;
                var temp = ""
                for(let para of post.content.bodyModel.paragraphs){
                   temp += para.text + "\n"
                }
                let obj = {creatorName,creatorImage,temp}
                responsesArr.push(obj);
              }
              // console.log(responsesArr)
          })
          .catch((err)=>{
              console.log(err);
          });

            // console.log($('article>div>div>section>div>div').html());
            $('article>div>div>section>div>div').each((i, elem)=>{
                contentHTML += $(elem).html(); 
                // console.log($(elem).html()+"\n");
                contentHTML.replace("https://miro.medium.com/max/60", "https://miro.medium.com/max/1000")
            })
            
        })
        console.log(responsesArr)
        return res.render('blog',{
            contentHTML:contentHTML,
            time,
            comments: responsesArr,
            blogDetails
        });    
}