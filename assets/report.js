const itemsPerPage = 3;
let currentPage = 1;
let totalPages = 1;
let searched=0;
//Fetch countries
fetch('countries.json')
  .then(response => response.json())
  .then(data => {
    // if (!Array.isArray(data.countries)) {
    //     throw new Error("Data is not an array");
    //   }
    fetchData(data);

  document.querySelector("#first-page").addEventListener("click", () => {
    currentPage = 1;
    fetchData(data);
  });
  
  document.querySelector("#last-page").addEventListener("click", () => {
    currentPage = totalPages;
    fetchData(data);
  });
  
  document.querySelector("#prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchData(data);
    }
  });
  
  document.querySelector("#next-page").addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      fetchData(data);
    }
  });

})
.catch(error => console.error(error));

function fetchData(data) {
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let dataToRender = data.countries.slice(startIndex, endIndex);
    renderTable(dataToRender);
  
    // Disable the "first & last page" button on the first & last page of pagination
    document.querySelector("#first-page").disabled = (currentPage === 1);
    document.querySelector("#last-page").disabled= (currentPage ===4);
  
    // Handle search
    const searchBox = document.querySelector("#search-box");
    searchBox.addEventListener("input", handleSearch);
  
    function handleSearch(event) {
      const searchText = event.target.value.toLowerCase();
      const filteredData = data.countries.filter(country => country.name.toLowerCase().startsWith(searchText));
      renderTable(filteredData);
      currentPage = 1;
      totalPages = Math.ceil(filteredData.length / itemsPerPage);
      document.querySelector("#page-info").textContent = `Page ${currentPage} of ${totalPages}`;
    }
  
    function renderTable(dataToRender) {
      let tableRows = "";
      dataToRender.forEach(country => {
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
  
    if (searched < 1) {
      totalPages = Math.ceil(data.countries.length / itemsPerPage);
    }
  
    document.querySelector("#page-info").textContent = `Page ${currentPage} of ${totalPages}`;
  }
  