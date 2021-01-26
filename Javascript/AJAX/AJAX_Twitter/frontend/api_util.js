const APIUtil = {
  followUser: id => APIUtil.ChangeMyFollowStatus(id, "POST"),

  unfollowUser: id => APIUtil.ChangeMyFollowStatus(id, "DELETE"),

  ChangeMyFollowStatus: (id, method) => (
    $.ajax({
      url: `/users/${id}/follow`,
      dataType: "json",
      method
    })
  ),
  
  searchUsers: query => (
    $.ajax({
      url: `/users/search`,
      dataType: 'json',
      method: 'GET',
      data: { query }
    })
  ),

  createTweet: data => (
    $.ajax({
      url: `/tweets`,
      method: 'POST',
      dataType: 'json',
      data
    })
  ),

  fetchTweets: data => (
    $.ajax({
      url: '/feed',
      method: 'GET',
      dataType: 'json',
      data
    })
  )
}

module.exports = APIUtil;