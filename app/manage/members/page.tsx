"use client";
import ModalCreateMember from "@/app/components/members/ModalCreate";
import ModalEditMember from "@/app/components/members/ModalEdit";
import { MemberModel } from "@/app/model/MemberModel";
import { getMemberData, searchMemberData } from "@/app/service/member";
import React, { useEffect, useState } from "react";

const Members = () => {
  const [memberData, setmemberData] = useState<MemberModel | null>(null);
  const [search, setsearch] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search != null) {
      const data = await searchMemberData(search);
      setmemberData(data);
    } else {
      await fetchMemberData();
    }
  };


  const fetchMemberData = async () => {
    const data = await getMemberData();

    setmemberData(data);
  };

  useEffect(() => {
    fetchMemberData();
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

        <ModalCreateMember fetchData={fetchMemberData} />
      </div>
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User ID
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Manage
              </th>
            </tr>
          </thead>
          <tbody>
            {memberData?.data?.map((member, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={index}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {member.m_user}
                </th>
                <td className="px-6 py-4">{member.m_name}</td>
                <td className="px-6 py-4">{member.m_pass}</td>
                <td className="px-6 py-4">{member.m_phone}</td>
                <td className="px-6 py-4">
                  <ModalEditMember
                    bid={member.m_user!}
                    data={member}
                    key={member.m_name}
                    fetchData={fetchMemberData}
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

export default Members;
