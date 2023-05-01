// synchronous [solidity]
//asynchronous [javascript]

// In asynchronous programming, we can keep the code running simultaneously while coding

/* Synchronous:
1. Put popcorn in microwave
2. Wait for popcorn to finish
3. Pour drinks for everyone
*/

/* Asynchronous:
1. Put popcorn in the microwave
2. Wait for popcorn to finish while pouring drinks for everyone
*/

/* Promise based functions:
1. Pending
2. Fulfilled
3. Rejected
*/

async function setupMovieNight() {
  await cookPopCorn();
  await pourDrinks();
  startMovie();
} /* This is a situation. You want to first cook popcorn, then pour drinks
    and then start movie. You want to tell the compiler to wait until one 
    function returns confirmation. This is where async is used. Async allows 
    you to use await keyword which will wait till one function returns a 
    desired value and then move on to the next function */

function cookPopcorn() {
  return Promise();
}
