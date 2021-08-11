pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract TweetFactory {
  struct Tweet {
    uint256 id;
    string message;
    address userId;
    // uint256 numLikes
  }
  mapping (uint256 => Tweet) Tweets;
  mapping (address => uint256[]) UserTweets; //return all tweet ids from a user
  uint256 private tweet_count;
  
  function getTweetCount() public view returns (uint256) {
    return tweet_count;
  }
  
  function getTweet(uint256 _tweetId) public view returns (uint256 id, string memory message, address userId) {
    Tweet storage tweet = Tweets[_tweetId];
    return (tweet.id, tweet.message, tweet.userId);
  }
  
  function getUserTweetIds(address _user) public view returns (uint256[] memory) {
    return UserTweets[_user];
  }
  
  // Create a tweet using a message  
  function tweet(string memory message) public {
    Tweet memory userTweet = Tweet(tweet_count, message, msg.sender);
    Tweets[tweet_count] = userTweet;
    UserTweets[msg.sender].push(tweet_count);
    tweet_count = tweet_count + 1;
  }
  
  // Delete a tweet by Id
  function deleteTweet(uint256 _id) public {
    (uint256 id, string memory message, address userId) = getTweet(_id);
    require(msg.sender == userId);
    delete(Tweets[_id]);
  }
  
  // Like a tweet
  function like(uint256 tweetId) public {
    
  }
  
}