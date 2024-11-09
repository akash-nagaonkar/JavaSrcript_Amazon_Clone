// const xhr = new XMLHttpRequest();

// xhr.addEventListener("load", () => {
//   const res = xhr.response;
//   const data = JSON.parse(res);
//   const albumData = data.reduce((acc, post) => {
//     if (acc[post.userId]) {
//       acc[post.userId].push(post);
//     } else {
//       acc[post.userId] = [post];
//     }
//     return acc;
//   }, {});
//   console.log(albumData);
//   console.log(Object.keys(albumData));
// });

// xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
// xhr.send();

const fetchData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    const albumData = data.reduce((acc, post) => {
      if (acc[post.userId]) {
        acc[post.userId].push(post);
      } else {
        acc[post.userId] = [post];
      }
      return acc;
    }, {});
    console.log(albumData);
    console.log(Object.keys(albumData));
  } catch (error) {
    console.error(error);
  }
};

fetchData();
