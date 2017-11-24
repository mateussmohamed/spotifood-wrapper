/* global fetch */

export const wrapperFetch = (url) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer BQB09rCvuKzea1bQDhxLW6QdiYjpNrBBOkylte1tTtcos5O2Fr3J1xuZdeVes1Vu7snJKPoxQDsU4dpcxh9K7ff-G9KTULKdQWIalY_fN03rhfqjW0PeteUTtiRmU2GOAZIteUdaffK1YNeSi5g7SmOpRA'
  };

  const options = { headers };

  return fetch(url, options);
};

export const toJSON = data => data.json();
