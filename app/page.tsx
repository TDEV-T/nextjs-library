"use client";
import ModalCreate from "@/app/components/books/ModalCreate";
import ModalEdit from "@/app/components/books/ModalEdit";
import ModalCreateBorrow from "@/app/components/borrows/ModalCreate";
import { BorrowModel } from "@/app/model/BorrowModel";
import React, { useEffect, useState } from "react";
import { getBorrowData } from "./service/borrow";
import ModalEditBorrow from "./components/borrows/ModalEdit";

const Borrow = () => {
  const [borrowData, setborrowData] = useState<BorrowModel | null>(null);

  const fetchBorrowData = async () => {
    const data = await getBorrowData();
    console.log(data);
    setborrowData(data);
  };

  useEffect(() => {
    fetchBorrowData();
  }, []);

  return (
    <>
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
                Fine
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
                  {new Date(borrow.br_date_br!).toLocaleDateString("th-TH") ??
                    ""}
                </th>
                <td className="px-6 py-4">
                  {borrow.br_date_rt != null ? new Date(borrow.br_date_rt!).toLocaleDateString("th-TH") : 
                    "Not Return"}
                </td>

                <td className="px-6 py-4">{borrow.user?.m_name}</td>
                <td className="px-6 py-4">{borrow.book?.b_name}</td>
                <td className="px-6 py-4">{borrow.br_fine}</td>
                <td className="px-6 py-4">
                  <ModalEditBorrow
                    bid={borrow.br_date_br!}
                    data={borrow}
                    key={borrow.br_date_br}
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
