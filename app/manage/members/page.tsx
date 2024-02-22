"use client";
import ModalCreateMember from "@/app/components/members/ModalCreate";
import ModalEditMember from "@/app/components/members/ModalEdit";
import { MemberModel } from "@/app/model/MemberModel";
import { getMemberData } from "@/app/service/member";
import React, { useEffect, useState } from "react";

const Members = () => {
  const [memberData, setmemberData] = useState<MemberModel | null>(null);

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
