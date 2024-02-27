"use client";
import ModalCreate from "@/app/components/books/ModalCreate";
import ModalEdit from "@/app/components/books/ModalEdit";
import { BookData } from "@/app/model/BookModel";
import { getBookData,searchBookData } from "@/app/service/book";
import React, { useEffect, useState } from "react";

const Books = () => {
  const [bookData, setbookData] = useState<BookData | null>(null);
  const [search, setsearch] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search != null) {
      const data = await searchBookData(search);
      setbookData(data);
    } else {
      await fetchDataBook();
    }
  };


  const fetchDataBook = async () => {
    const data = await getBookData();

    setbookData(data);
  };

  useEffect(() => {
    fetchDataBook();
  }, []);

  return (
    <>
      <div className="w-full flex justify-end p-3">
      <form className="me-3 grid grid-cols-3" onSubmit={handleSubmit}>
          <input
            type="text"
            value={search!}
            onChange={handleChange}
            id="first_name"
            className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            
          />

          <button
            data-modal-target="default-modal"
            data-modal-toggle="default-modal"
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
            type="submit"
          >
            Search
          </button>
      </form>

        <ModalCreate fetchData={fetchDataBook} />
      </div>
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Book ID
              </th>
              <th scope="col" className="px-6 py-3">
                Book Name
              </th>
              <th scope="col" className="px-6 py-3">
                Book Writer
              </th>
              <th scope="col" className="px-6 py-3">
                Book Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Manage
              </th>
            </tr>
          </thead>
          <tbody>
            {bookData?.data?.map((book, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={index}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {book.b_id}
                </th>
                <td className="px-6 py-4">{book.b_name}</td>
                <td className="px-6 py-4">{book.b_writer}</td>
                <td className="px-6 py-4">{book.b_category}</td>
                <td className="px-6 py-4">{book.b_price}</td>
                <td className="px-6 py-4">
                  <ModalEdit
                    bid={book.b_id!}
                    data={book}
                    key={book.b_id}
                    fetchData={fetchDataBook}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Books;
