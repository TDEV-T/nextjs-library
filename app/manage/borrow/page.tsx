"use client";
import ModalCreate from "@/app/components/books/ModalCreate";
import ModalEdit from "@/app/components/books/ModalEdit";
import ModalCreateBorrow from "@/app/components/borrows/ModalCreate";
import { BorrowModel } from "@/app/model/BorrowModel";
import { getBookData } from "@/app/service/book";
import React, { useEffect, useState } from "react";

const Borrow = () => {
  const [borrowData, setborrowData] = useState<BorrowModel | null>(null);

  const fetchBorrowData = async () => {
    const data = await getBookData();

    setborrowData(data);
  };

  useEffect(() => {
    fetchBorrowData();
  }, []);

  return (
    <>
      <div>
      
      </div>
      <div className="w-full flex justify-end p-3">
        <ModalCreateBorrow fetchData={fetchBorrowData} />
      </div>
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Borrow Date
              </th>
              <th scope="col" className="px-6 py-3">
                Return Date
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Book
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
            {borrowData?.data?.map((borrow, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={index}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {borrow.b_id}
                </th>
                <td className="px-6 py-4">
                  {new Date(borrow.br_date_br!).toLocaleDateString("th-TH") ??
                    ""}
                </td>
                <td className="px-6 py-4">
                  {new Date(borrow.br_date_rt!).toLocaleDateString("th-TH") ??
                    ""}
                </td>
                <td className="px-6 py-4">{borrow.user?.m_name}</td>
                <td className="px-6 py-4">{borrow.book?.b_name}</td>
                <td className="px-6 py-4">
                  <ModalEdit
                    bid={borrow.b_id!}
                    data={borrow}
                    key={borrow.b_id}
                    fetchData={fetchBorrowData}
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

export default Borrow;
