const { post } = require('request');
var request = require('request-promise');
const cheerio = require("cheerio")
module.exports.searchTag=  function(req, res){
    // console.log(req.body)
    if(req.body.next){
        req.body.next = req.body.next.toString();
        var variables = {"tagSlug":req.body.searchTag,"mode":"HOT","paging":{"limit":5,"to":req.body.next}}
    }
    else{
        var variables = {"tagSlug":req.body.searchTag,"mode":"HOT","paging":{"limit":5}}
    }
    req.body.searchTag = req.body.searchTag.replace(/\s+/g,"-");
    console.log(req.body.searchTag)
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

                return res.status(200).json({
                    data: JSON.parse(response),
                    contentHTML:contentHTML,
                    message: "Search Completed"
                });
            })
            .catch((err)=>{
                console.log(err);
            });


    }
}

module.exports.fetchBlog = async function(req, res){
    console.log(req.body)
    let options = {
        'url': req.body.url,
        transform: body => cheerio.load(body)
    }
    var contentHTML;
        await request(options)
        .then(function($){
            console.log("*****\n");
            // console.log($('article>div>div>section>div>div').html());
            $('article>div>div>section>div>div').each((i, elem)=>{
                contentHTML += $(elem).html(); 
                // console.log($(elem).html()+"\n");
            })
        })
        return res.render('blog',{
            contentHTML:contentHTML,
        });    
}