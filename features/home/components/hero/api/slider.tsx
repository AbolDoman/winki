export const getSliders = async () => {
  return [
    {
      id: 1,
      image: '/images/banner.png',
      url: '/product',
    },
    {
      id: 2,
      image: '/mom 1.png',
      url: '/product',
    },
  ];
  // const result = await Api.get("/website/main-page").then(
  //   (response) => response.data.output.slider
  // );
  // return result;
};
