import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function PartSearch({ partsData }) {
  const [search, setSearch] = useState("");
  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [saveProducts, setSaveProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState(
    JSON.parse(localStorage.getItem("spectrum_products")) || []
  );

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const newFilteredItems = parts.filter((item) =>
      item.Description.includes(search)
    );
    setFilteredParts(newFilteredItems);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    setSearch(searchValue);
  };

  const deleteProduct = (part) => {
    const newSaveProducts = [...savedProducts];
    const index = newSaveProducts.indexOf(part);
    if (index > -1) {
      newSaveProducts.splice(index, 1);
      setSavedProducts(newSaveProducts);
      toast.success("Part removed from your list");
    }
  };

  return (
    <>
      <Toaster />

      <div className="max-w-7xl mx-auto">
        <div className="mb-3 grid grid-cols-3 sm:grid-cols-3 gap-4">
          <div className="hidden sm:block">
            <p className="text-white mt-5 text-left">Showing parts:</p>
          </div>
          <div className="xl:w-96 mx-auto w-full mb-4 mt-4">
            <input
              type="search"
              className="form-control relative inline min-w-0 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search a Part Number or Part Description"
              aria-label="Search"
              onChange={handleSearch}
              aria-describedby="button-addon2"
            ></input>
          </div>
          <div className="mt-5 ml-auto">
            <label htmlFor="my-modal" className="">
              <span className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 inline"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </span>
              <div className="-ml-1 badge badge-lg p-2 bg-yellow-600 text-white">
                {savedProducts ? savedProducts.length : 0}
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto max-w-7xl relative mx-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="py-3 px-6">
                Save
              </th>
              <th scope="col" className="py-3 px-6">
                Part Number
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Short Description
              </th>
              <th scope="col" className="py-3 px-6">
                OEM
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Availability
              </th>
            </tr>
          </thead>
          <tbody>
            {search
              ? filteredParts.map((part, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-200"
                  >
                    <td className="py-3 px-6">
                      {savedProducts.find(
                        (item) => item.PartNumber === part.PartNumber
                      ) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-6 h-6 text-green-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <button
                          className=""
                          onClick={() => {
                            {
                              savedProducts.find(
                                (item) => item.PartNumber === part.PartNumber
                              )
                                ? toast.error("Part already saved to your list")
                                : localStorage.setItem(
                                    "spectrum_products",
                                    JSON.stringify([...savedProducts, part])
                                  );
                              setSavedProducts([...savedProducts, part]);
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-6">{part.PartNumber}</td>
                    <td className="py-3 px-6">{part.Description}</td>
                    <td className="py-3 px-6">{part.ShortDescription}</td>
                    <td className="py-3 px-6">{part.OEM}</td>
                    <td className="py-3 px-6 text-center">
                      <a
                        href={`/part/${part.PartNumber}`}
                        className="focus:outline-none text-blue-900 bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                      >
                        <button className=" hidden sm:inline">
                          Contact for Availability
                        </button>
                        <button className=" sm:hidden">Contact</button>
                      </a>
                    </td>
                  </tr>
                ))
              : filteredParts.map((part, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-200"
                  >
                    <td className="py-3 px-6">
                      {savedProducts.find(
                        (item) => item.PartNumber === part.PartNumber
                      ) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-6 h-6 text-green-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <button
                          className=""
                          onClick={() => {
                            {
                              savedProducts.find(
                                (item) => item.PartNumber === part.PartNumber
                              )
                                ? toast.error("Part already saved to your list")
                                : localStorage.setItem(
                                    "spectrum_products",
                                    JSON.stringify([...savedProducts, part])
                                  );
                              setSavedProducts([...savedProducts, part]);
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-6">{part.PartNumber}</td>
                    <td className="py-3 px-6">{part.Description}</td>
                    <td className="py-3 px-6">{part.ShortDescription}</td>
                    <td className="py-3 px-6">{part.OEM}</td>
                    <td className="py-3 px-6 text-center">
                      <a
                        href={`/part/${part.PartNumber}`}
                        className="focus:outline-none text-blue-900 bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                      >
                        <button className=" hidden sm:inline">
                          Contact for Availability
                        </button>
                        <button className=" sm:hidden">Contact</button>
                      </a>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-2xl bg-gray-50 text-gray-900">
          <h3 className="font-bold text-xl mb-4">Your Saved Product List:</h3>
          {savedProducts.length > 0 ? (
            <ul>
              {savedProducts.map((product) => (
                <li key={product.Description} className="border-b pb-2">
                  <button
                    className="inline"
                    onClick={() => deleteProduct(product)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 inline m-2 text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                  <p className="text-gray-700 inline-block">
                    {product.PartNumber} - <strong>{product.Description}</strong>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No products saved yet.</p>
          )}
          <div className="modal-action">
            <a href="/catalog/quote">
              <button className="btn bg-blue-700 text-white">
                Get a Quote
              </button>
            </a>
            <label htmlFor="my-modal" className="btn text-white">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default PartSearch;
