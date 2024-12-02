import postPledge from "../api/post-pledges";

async function test() {
  try {
    const data = await postPledge("67", 9, "good", true);
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}
test();
export default test;
