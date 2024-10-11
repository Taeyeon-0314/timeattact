export async function ssg() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/10");
  const data = res.json();
  return data;
}

const SSGPage = () => {
  return <div>page</div>;
};
export default SSGPage;
