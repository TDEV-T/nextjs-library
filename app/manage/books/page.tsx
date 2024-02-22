"use client";
import ModalCreate from "@/app/components/books/ModalCreate";
import ModalEdit from "@/app/components/books/ModalEdit";
import { BookData } from "@/app/model/BookModel";
import { getBookData } from "@/app/service/book";
import React, { useEffect, useState } from "react";

const Books = () => {
  const [bookData, setbookData] = useState<BookData | null>(null);

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
