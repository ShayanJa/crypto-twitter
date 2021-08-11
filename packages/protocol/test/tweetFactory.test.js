const { expect } = require("chai");

describe("Tweet Factory", function() {
  let tweetFactory;
  let sender;
  beforeEach(async function () {
    const TweetFactory = await ethers.getContractFactory("TweetFactory");
    tweetFactory = await TweetFactory.deploy();
    
    await tweetFactory.deployed();
    
    const accounts = await ethers.getSigners();
    sender = accounts[0]
  })
  
  it("Should create a tweet", async function() {
    const reqMessage = "what's up everyone"
    await tweetFactory.tweet(reqMessage)
    const {id, message, userId} = await tweetFactory.getTweet(0);
    expect(message).to.equal(reqMessage)
  });
  
  it("Should get all tweets", async function() {
    const reqMessage = "what's up everyone"
    for (var i=0; i < 100; i++) {
      await tweetFactory.tweet(reqMessage)
    }

    const tweets = await tweetFactory.getUserTweetIds(await sender.getAddress());
    const {id, message, userId} = await tweetFactory.getTweet(tweets[0]);
    
    expect(tweets.length).to.equal(100)
    expect(userId).to.equal(await sender.getAddress())
  });
  
  it("Should delete a tweet", async function() {
    const reqMessage = "what's up everyone"
    await tweetFactory.tweet(reqMessage)

    await tweetFactory.deleteTweet(0)
    const tweets = await tweetFactory.getUserTweetIds(await sender.getAddress());
    const {id, message, userId} = await tweetFactory.getTweet(tweets[0]);
    
    // expect(tweets.length).to.equal(0)
    expect(userId).to.equal("0x0000000000000000000000000000000000000000")
  });
});
