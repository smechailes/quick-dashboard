const itemsPerPage = 3; //set the number of items to display per page
let currentPage = 1; //set the default current page to 1
let totalPages; //set the default total number of pages to 1
let searched = 0; //set the default value for the search counter to 0

//Fetch countries data from 'countries.json' file
fetch("countries.json")
  .then((response) => response.json())
  .then((data) => {
    //if data is not in array, then display error
    if (!Array.isArray(data.countries)) {
      throw new Error("Data is not an array");
    }
    //Call the "fetchData" function with the retrived data
    fetchData(data);
    //Add event listeneres to pagination buttons
    document.querySelector("#first-page").addEventListener("click", () => {
      // Set current page to the first page and call 'fetchData' function again
      currentPage = 1;
      fetchData(data);
    });

    document.querySelector("#last-page").addEventListener("click", () => {
      // Set current page to the last page and call 'fetchData' function again
      currentPage = totalPages;
      fetchData(data);
    });

    document.querySelector("#prev-page").addEventListener("click", () => {
      // If current page is greater than 1, decrement current page and call 'fetchData' function again
      if (currentPage > 1) {
        currentPage--;
        fetchData(data);
      }
    });

    document.querySelector("#next-page").addEventListener("click", () => {
      // If current page is less than the total number of pages, increment current page and call 'fetchData' function again
      console.log(currentPage + " no. of current pages");
      console.log(totalPages + " no. of total pages");
      if (currentPage < totalPages) {
        currentPage++;
        fetchData(data);
      }
    });
  })
  .catch((error) => console.error(error));

// Function to render the table data based on the current page and search query
function fetchData(data) {
  console.log(data);
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  // Slice the data to be displayed on the current page
  let dataToRender = data.countries.slice(startIndex, endIndex);
  // Render the table with the sliced data
  renderTable(dataToRender);
  //   if (searched < 1) {
  //     totalPages = Math.ceil(data.countries.length / itemsPerPage);
  //   }
  renderPagination(totalPages);
  // Disable the button on the page of pagination
  if (currentPage === 1) {
    document.querySelector("#first-page").disabled = true;
    document.querySelector("#prev-page").disabled = true;
  } else {
    document.querySelector("#first-page").disabled = false;
    document.querySelector("#prev-page").disabled = false;
  }

  if (currentPage === 4) {
    document.querySelector("#last-page").disabled = true;
    document.querySelector("#next-page").disabled = true;
  } else {
    document.querySelector("#last-page").disabled = false;
    document.querySelector("#next-page").disabled = false;
  }
  // Add event listener to search box to handle search query
  const searchBox = document.querySelector("#search-box");
  searchBox.addEventListener("input", handleSearch);

  // Function to handle search query
  function handleSearch(event) {
    const searchText = event.target.value.toLowerCase();
    let filteredData;
    // Filter the data based on the search query and store the filtered data in a new array
    if (searchText === "") {
      filteredData = fetchData(data);
    } else {
      filteredData = data.countries.filter((country) =>
        country.name.toLowerCase().startsWith(searchText)
      );
      // Render the table with the filtered data
      renderTable(filteredData);
      console.log("filtered data is "+filteredData);
        console.log("filtered Data's length is "+filteredData.length);
      // Reset the current page to 1 and calculate the total number of pages based on the filtered data
      currentPage = 1;
      totalPages = Math.ceil(filteredData.length / itemsPerPage);
      console.log("total pages in filtered data is "+totalPages);
      // Update the page information text with the current page and total number of pages
      renderPagination(totalPages);
    }
  }
  // Function to render the table with the given data
  function renderTable(dataToRender) {
    // totalPages = Math.ceil(dataToRender.length / itemsPerPage);
    let tableRows = "";
    dataToRender.forEach((country) => {
      tableRows += `<tr>
              <td>${country.name}</td>
              <td>${country.capital}</td>
              <td>${country.population}</td>
              <td>${country.currency}</td>
              <td>${country.language}</td>
            </tr>`;
    });
    document.querySelector("#country-table tbody").innerHTML = tableRows;
  }

  //renders pagination
  function renderPagination(totalPages) {
    if(totalPages !== 1){
        if (searched < 1) {
            console.log("we got here");
            totalPages = Math.ceil(data.countries.length / itemsPerPage);
          }
    }
    console.log("render Pagination ma +"+totalPages);
    document.querySelector(
      "#page-info"
    ).textContent = `Page ${currentPage} of ${totalPages}`;
    // console.log("total pages is "+totalPages);
    if (totalPages === 1) {
      document.querySelector("#last-page").disabled = true;
      document.querySelector("#next-page").disabled = true;
    }
  }
}
// if (searched < 1) {
//   totalPages = Math.ceil(data.countries.length / itemsPerPage);
// }

// document.querySelector("#page-info").textContent = `Page ${currentPage} of ${totalPages}`;

// if(totalPages === 1){
//     document.querySelector("#last-page").disabled = true;
//     document.querySelector("#next-page").disabled = true;
// }
//}

//   The code starts by declaring three variables - itemsPerPage, currentPage, and totalPages. itemsPerPage is set to 3, which means that each page will show 3 items. currentPage and totalPages are both initialized to 1.

// The code then makes a fetch request to retrieve data from a countries.json file. It uses response.json() to parse the JSON data returned by the fetch request. Once the data is parsed, it is passed to the fetchData() function.

// The fetchData() function calculates the startIndex and endIndex based on the current page and the itemsPerPage. It then slices the data.countries array to get the data to render for the current page. The sliced data is then passed to the renderTable() function.

// The renderTable() function loops through the dataToRender array and generates HTML table rows for each item. The generated rows are then inserted into the table body using innerHTML.

// The code also sets up event listeners for the pagination buttons - first-page, last-page, prev-page, and next-page. Clicking on these buttons will update the currentPage variable and call the fetchData() function again to render the updated data.

// The code also sets up an event listener for the search box. Whenever the user types into the search box, the handleSearch() function is called. This function filters the data.countries array based on the search query, and then updates the totalPages variable and calls renderTable() to render the filtered data.

// Lastly, if the search has not been performed yet, totalPages is calculated based on the length of the data.countries array divided by itemsPerPage. The page-info element is also updated with the current page and total pages information.
